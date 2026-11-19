import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const allFiles = walk('./src').concat(['./index.html']);

const report = {
    emptyHeadings: [],
    emptyButtons: [],
    missingImageAlts: [],
    potentialContrastIssues: [],
    typosAndAwkwardText: [],
    unclosedTagsOrBrokenJsx: [],
    inconsistentContactInfo: []
};

// Check Contact Info Consistency
const phoneRegex = /\+?91[\s-]?[0-9]{5}[\s-]?[0-9]{5}|\+?[0-9]{10,12}/g;
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const collectedEmails = new Set();
const collectedPhones = new Set();

allFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');

    // Collect emails & phones
    const emails = content.match(emailRegex) || [];
    emails.forEach(e => {
        if (!e.endsWith('.png') && !e.endsWith('.jpg') && !e.includes('example.com')) {
            collectedEmails.add(`${e} (in ${path.basename(filePath)})`);
        }
    });

    const phones = content.match(phoneRegex) || [];
    phones.forEach(p => collectedPhones.add(`${p} (in ${path.basename(filePath)})`));

    // JSX specific audits
    if (filePath.endsWith('.jsx')) {
        // Multi-line <img check
        const imgTags = content.match(/<img[^>]*>/gs) || [];
        imgTags.forEach(tag => {
            if (!tag.includes('alt=') && !tag.includes('alt =')) {
                report.missingImageAlts.push({ file: filePath, snippet: tag.replace(/\s+/g, ' ').substring(0, 100) });
            }
        });

        // Empty headings
        const emptyH = content.match(/<h[1-6][^>]*>\s*<\/h[1-6]>/g) || [];
        emptyH.forEach(h => report.emptyHeadings.push({ file: filePath, snippet: h }));

        // Empty buttons without aria-label or children
        const btnTags = content.match(/<button[^>]*>\s*<\/button>/gs) || [];
        btnTags.forEach(btn => {
            if (!btn.includes('aria-label') && !btn.includes('title')) {
                report.emptyButtons.push({ file: filePath, snippet: btn.replace(/\s+/g, ' ') });
            }
        });
    }

    // CSS and color contrast checks
    if (filePath.endsWith('.css') || filePath.endsWith('.jsx')) {
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
            const lineNum = idx + 1;
            // Suspicious low contrast color pairings
            // e.g., light gray text on light background or dark text on dark bg
            if (line.includes('text-slate-300') && line.includes('bg-white')) {
                report.potentialContrastIssues.push({ file: filePath, line: lineNum, reason: 'Light gray text on white bg', text: line.trim() });
            }
            if (line.includes('text-slate-700') && line.includes('bg-slate-900')) {
                report.potentialContrastIssues.push({ file: filePath, line: lineNum, reason: 'Dark text on dark bg', text: line.trim() });
            }
            if (line.includes('color: #ffffff') && line.includes('background-color: #ffffff')) {
                report.potentialContrastIssues.push({ file: filePath, line: lineNum, reason: 'White text on white background', text: line.trim() });
            }
            if (line.includes('color: #000000') && line.includes('background-color: #000000')) {
                report.potentialContrastIssues.push({ file: filePath, line: lineNum, reason: 'Black text on black background', text: line.trim() });
            }

            // Check for obvious spelling/grammar typos in user-visible text
            const commonTypos = [
                /\bteh\b/i, /\brecieve\b/i, /\bseperate\b/i, /\buntill\b/i, /\boccurance\b/i,
                /\baccommodate\b/i, /\bdefinately\b/i, /\bgoverment\b/i, /\benviroment\b/i
            ];
            for (const t of commonTypos) {
                if (t.test(line) && !line.includes('//') && !line.includes('/*')) {
                    report.typosAndAwkwardText.push({ file: filePath, line: lineNum, typo: t.toString(), text: line.trim() });
                }
            }
        });
    }
});

console.log('=== DEEP AUDIT REPORT ===');
console.log('Missing Image ALTs (multi-line aware):', report.missingImageAlts.length);
report.missingImageAlts.forEach(m => console.log(' ', m.file, '->', m.snippet));

console.log('\nEmpty Headings:', report.emptyHeadings.length);
report.emptyHeadings.forEach(h => console.log(' ', h.file, '->', h.snippet));

console.log('\nEmpty Buttons (No aria-label/title):', report.emptyButtons.length);
report.emptyButtons.forEach(b => console.log(' ', b.file, '->', b.snippet));

console.log('\nPotential Contrast Issues:', report.potentialContrastIssues.length);
report.potentialContrastIssues.forEach(c => console.log(' ', c.file, `line ${c.line}: [${c.reason}] ->`, c.text));

console.log('\nTypo Detections:', report.typosAndAwkwardText.length);
report.typosAndAwkwardText.forEach(t => console.log(' ', t.file, `line ${t.line}: [${t.typo}] ->`, t.text));

console.log('\nCollected Emails Across Codebase:');
collectedEmails.forEach(e => console.log(' ', e));

console.log('\nCollected Phone Numbers Across Codebase:');
collectedPhones.forEach(p => console.log(' ', p));

