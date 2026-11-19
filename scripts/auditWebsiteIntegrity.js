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

const files = walk('./src').concat(['./index.html']);
console.log('Total files scanned:', files.length);

const placeholderRegexes = [
    { name: 'lorem ipsum', regex: /lorem\s+ipsum/i },
    { name: 'dummy text', regex: /\bdummy\b/i },
    { name: 'foo / bar', regex: /\b(foo|bar|baz)\b/i },
    { name: 'TODO / FIXME', regex: /\b(TODO|FIXME|XXX)\b/ },
    { name: 'asdf / test string', regex: /\b(asdf|qwerty|test123)\b/i },
    { name: 'example.com', regex: /example\.com/i },
    { name: 'broken template interpolation', regex: /\$\{\s*(undefined|null|NaN)\s*\}/i }
];

const foundIssues = {
    placeholders: [],
    hardcodedBlackWithoutDark: [],
    hardcodedWhiteWithoutDark: [],
    missingImageAlts: [],
    brokenLinksOrEmptyHref: [],
    contrastWarnings: []
};

files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
        const lineNum = idx + 1;
        const trimmed = line.trim();

        // 1. Placeholders
        for (const p of placeholderRegexes) {
            if (p.regex.test(trimmed)) {
                // Ignore comments explaining something or regex definitions
                if (!trimmed.startsWith('//') && !trimmed.startsWith('*') && !trimmed.includes('test(')) {
                    foundIssues.placeholders.push({ file: f, line: lineNum, match: p.name, text: trimmed.substring(0, 120) });
                }
            }
        }

        // 2. JSX-specific checks
        if (f.endsWith('.jsx')) {
            // Missing image alts
            if (trimmed.includes('<img') && !trimmed.includes('alt=') && !trimmed.includes('alt =')) {
                foundIssues.missingImageAlts.push({ file: f, line: lineNum, text: trimmed.substring(0, 100) });
            }

            // Broken or empty href
            if (trimmed.includes('href="#"') || trimmed.includes("href='#'") || trimmed.includes('to="#"') || trimmed.includes("to='#'")) {
                foundIssues.brokenLinksOrEmptyHref.push({ file: f, line: lineNum, text: trimmed.substring(0, 100) });
            }

            // Inappropriate black text in dark mode
            if (trimmed.includes('className=')) {
                // Check if text-black or text-slate-900 or text-gray-900 is used on an element that doesn't define dark:text-
                // Note: check if dark: is in the same line or element
                const hasDarkText = trimmed.includes('dark:text-') || trimmed.includes('dark:');
                if ((trimmed.includes('text-slate-900') || trimmed.includes('text-gray-900') || trimmed.includes('text-black')) && !hasDarkText) {
                    // Might be hardcoded dark text without dark mode support
                    foundIssues.hardcodedBlackWithoutDark.push({ file: f, line: lineNum, text: trimmed.substring(0, 120) });
                }

                // Check if bg-white is used without dark:bg-
                const hasDarkBg = trimmed.includes('dark:bg-') || trimmed.includes('dark:');
                if ((trimmed.includes('bg-white') || trimmed.includes('bg-slate-50')) && !hasDarkBg) {
                    foundIssues.hardcodedWhiteWithoutDark.push({ file: f, line: lineNum, text: trimmed.substring(0, 120) });
                }
            }
        }

        // 3. CSS checks
        if (f.endsWith('.css')) {
            if (trimmed.includes('color: #000') || trimmed.includes('color: #111') || trimmed.includes('color: black')) {
                // check if inside dark rule
                foundIssues.contrastWarnings.push({ file: f, line: lineNum, text: trimmed });
            }
        }
    });
});

console.log('=== AUDIT RESULTS ===');
console.log('Placeholders found:', foundIssues.placeholders.length);
foundIssues.placeholders.forEach(p => console.log(`  [${p.file}:${p.line}] (${p.match}) -> ${p.text}`));

console.log('\nBroken / Dead Links (#):', foundIssues.brokenLinksOrEmptyHref.length);
foundIssues.brokenLinksOrEmptyHref.forEach(b => console.log(`  [${b.file}:${b.line}] -> ${b.text}`));

console.log('\nMissing Image ALTs:', foundIssues.missingImageAlts.length);
foundIssues.missingImageAlts.forEach(m => console.log(`  [${m.file}:${m.line}] -> ${m.text}`));

console.log('\nHardcoded Black Text without dark: variant:', foundIssues.hardcodedBlackWithoutDark.length);
foundIssues.hardcodedBlackWithoutDark.slice(0, 10).forEach(h => console.log(`  [${h.file}:${h.line}] -> ${h.text}`));

console.log('\nHardcoded White BG without dark: variant:', foundIssues.hardcodedWhiteWithoutDark.length);
foundIssues.hardcodedWhiteWithoutDark.slice(0, 10).forEach(h => console.log(`  [${h.file}:${h.line}] -> ${h.text}`));

console.log('\nCSS Contrast Warnings:', foundIssues.contrastWarnings.length);
foundIssues.contrastWarnings.forEach(c => console.log(`  [${c.file}:${c.line}] -> ${c.text}`));

