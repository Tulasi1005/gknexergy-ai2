import fs from "fs";
import path from "path";

console.log("=== GK NEXERGY TECHNICAL SEO & INDEXING AUDIT ===");

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
    totalTests++;
    if (condition) {
        console.log(`[PASS] ${message}`);
        passedTests++;
    } else {
        console.error(`[FAIL] ${message}`);
    }
}

// 1. Verify robots.txt
const robotsPath = path.resolve("public/robots.txt");
assert(fs.existsSync(robotsPath), "public/robots.txt exists");
const robotsContent = fs.readFileSync(robotsPath, "utf8");
assert(robotsContent.includes("User-agent: *"), "robots.txt allows all crawlers");
assert(robotsContent.includes("Allow: /"), "robots.txt sets Allow: /");
assert(robotsContent.includes("Sitemap: https://gknexergy.com/sitemap.xml"), "robots.txt references sitemap.xml");

// 2. Verify sitemap.xml
const sitemapPath = path.resolve("public/sitemap.xml");
assert(fs.existsSync(sitemapPath), "public/sitemap.xml exists");
const sitemapContent = fs.readFileSync(sitemapPath, "utf8");
assert(sitemapContent.includes("xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\""), "sitemap.xml valid namespace");
assert(sitemapContent.includes("https://gknexergy.com/"), "sitemap includes root URL");
assert(sitemapContent.includes("https://gknexergy.com/home"), "sitemap includes /home");
assert(sitemapContent.includes("https://gknexergy.com/solutions/ai-automation"), "sitemap includes AI automation");
assert(sitemapContent.includes("https://gknexergy.com/pricing"), "sitemap includes /pricing");
assert(sitemapContent.includes("https://gknexergy.com/contact"), "sitemap includes /contact");

// 3. Verify index.html baseline SEO & Search Console readiness
const indexPath = path.resolve("index.html");
const indexContent = fs.readFileSync(indexPath, "utf8");
assert(indexContent.includes("<meta name=\"robots\" content=\"index, follow"), "index.html has index, follow robots directive");
assert(indexContent.includes("<link rel=\"canonical\" href=\"https://gknexergy.com/\""), "index.html has default canonical link");
assert(indexContent.includes("google-site-verification"), "index.html prepared for Google Search Console verification");
assert(indexContent.includes("application/ld+json"), "index.html contains baseline JSON-LD schema");
assert(indexContent.includes("@type\": \"Organization"), "index.html baseline Organization schema");

// 4. Verify SEO Component
const seoPath = path.resolve("src/components/SEO.jsx");
const seoContent = fs.readFileSync(seoPath, "utf8");
assert(seoContent.includes("document.title = title"), "SEO component updates document.title");
assert(seoContent.includes("canonical"), "SEO component calculates and injects canonical URL");
assert(seoContent.includes("gk-dynamic-jsonld"), "SEO component injects dynamic JSON-LD schema script");
assert(seoContent.includes("BreadcrumbList"), "SEO component automatically generates BreadcrumbList schema");

// 5. Verify Target Keywords Coverage
const targetKeywords = [
    "AI Solutions for Businesses",
    "AI Automation Services",
    "Custom Software Development",
    "Digital Transformation Services",
    "Business Process Automation",
    "IT Consulting Services",
    "Enterprise Software Solutions",
    "Data Analytics Solutions",
    "Web and Mobile App Development",
    "Technology Solutions in India",
    "Software Development Company in Hyderabad"
];

for (const kw of targetKeywords) {
    const kwInSeo = seoContent.includes(kw) || indexContent.includes(kw);
    assert(kwInSeo, `Target keyword integrated: "${kw}"`);
}

console.log(`\nAUDIT RESULT: ${passedTests}/${totalTests} tests passed (${Math.round((passedTests/totalTests)*100)}%)`);

