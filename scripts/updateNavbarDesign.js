import fs from 'fs';

// 1. Update App.css for Navbar
let appCss = fs.readFileSync('src/App.css', 'utf8');

// Replace header solid styles with premium glassmorphism
const headerStart = '#main-navbar-header,';
const headerEnd = '.nav-backdrop {';

const idx1 = appCss.indexOf(headerStart);
const idx2 = appCss.indexOf(headerEnd);

if (idx1 !== -1 && idx2 !== -1) {
    const newHeaderCss = `#main-navbar-header,
[data-testid="main-navbar"],
header[data-testid="main-navbar"],
header.glass-header {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    z-index: 9999 !important;
    background: rgba(255, 255, 255, 0.92) !important;
    background-color: rgba(255, 255, 255, 0.92) !important;
    opacity: 1 !important;
    backdrop-filter: blur(16px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
    color: #0f172a !important;
    border-bottom: 1px solid rgba(226, 232, 240, 0.85) !important;
    box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.03) !important;
}

.dark #main-navbar-header,
.dark [data-testid="main-navbar"],
.dark header[data-testid="main-navbar"],
.dark header.glass-header {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    z-index: 9999 !important;
    background: rgba(8, 14, 26, 0.92) !important;
    background-color: rgba(8, 14, 26, 0.92) !important;
    opacity: 1 !important;
    backdrop-filter: blur(16px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
    color: #ffffff !important;
    border-bottom: 1px solid rgba(56, 189, 248, 0.18) !important;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.65), 0 0 20px 0 rgba(37, 99, 235, 0.12) !important;
}

`;
    appCss = appCss.slice(0, idx1) + newHeaderCss + appCss.slice(idx2);
    console.log('Updated header glassmorphism in App.css');
}

// Replace mega-nav-bar and mega-nav-item with modern pill tabs
const megaNavStart = '.mega-nav-bar {';
const megaNavEnd = '/* Mega-dropdown grid: 4 columns */';

const idx3 = appCss.indexOf(megaNavStart);
const idx4 = appCss.indexOf(megaNavEnd);

if (idx3 !== -1 && idx4 !== -1) {
    const newMegaNavCss = `.mega-nav-bar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0.65rem 0.85rem;
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
    border-bottom: 1px solid transparent;
    background-color: rgba(248, 250, 252, 0.75);
    scrollbar-width: none;
}

@media (min-width: 768px) {
    .mega-nav-bar {
        justify-content: center;
        gap: 0.75rem;
        padding: 0.75rem 1.25rem;
    }
}

@media (min-width: 1024px) {
    .mega-nav-bar {
        gap: 1rem;
        padding: 0.85rem 1.75rem;
    }
}

.mega-nav-bar::-webkit-scrollbar {
    display: none;
}

.mega-nav-bar.has-active-dropdown {
    border-bottom-color: rgba(226, 232, 240, 0.9);
}

.dark .mega-nav-bar {
    background-color: rgba(6, 13, 27, 0.85);
}

.dark .mega-nav-bar.has-active-dropdown {
    border-bottom-color: rgba(56, 189, 248, 0.18);
}

.mega-nav-item {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 0.915rem;
    font-weight: 700;
    white-space: nowrap;
    text-decoration: none;
    color: #475569;
    background: transparent;
    border: 1px solid transparent;
    padding: 0.38rem 0.8rem;
    border-radius: 9999px;
    transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
}

.dark .mega-nav-item {
    color: #94a3b8;
}

.mega-nav-item:hover {
    color: #1d4ed8 !important;
    background-color: rgba(37, 99, 235, 0.08);
    border-color: rgba(37, 99, 235, 0.15);
    transform: translateY(-1px);
}

.dark .mega-nav-item:hover {
    color: #38bdf8 !important;
    background-color: rgba(56, 189, 248, 0.12);
    border-color: rgba(56, 189, 248, 0.25);
    transform: translateY(-1px);
}

.mega-nav-item.active {
    color: #1d4ed8 !important;
    background: rgba(37, 99, 235, 0.1) !important;
    border-color: rgba(37, 99, 235, 0.25) !important;
    font-weight: 800 !important;
    box-shadow: 0 1px 4px rgba(37, 99, 235, 0.12);
}

.dark .mega-nav-item.active {
    color: #38bdf8 !important;
    background: rgba(56, 189, 248, 0.15) !important;
    border-color: rgba(56, 189, 248, 0.35) !important;
    font-weight: 800 !important;
    box-shadow: 0 0 12px rgba(56, 189, 248, 0.2);
}

.mega-nav-chevron {
    width: 0.85rem;
    height: 0.85rem;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.mega-nav-item.active .mega-nav-chevron {
    transform: rotate(180deg);
}

`;
    appCss = appCss.slice(0, idx3) + newMegaNavCss + appCss.slice(idx4);
    console.log('Updated mega nav tabs in App.css');
}

fs.writeFileSync('src/App.css', appCss, 'utf8');
console.log('App.css successfully updated with refined navbar design!');

