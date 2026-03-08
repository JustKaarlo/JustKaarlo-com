// ============================================================
//  doc-data.js  — Article Data
//  Replaces: settings.js
//
//  HOW TO ADD A NEW PAGE:
//  1. Add a new const below (e.g. const myGameArticles = [...])
//  2. Register it in DocRegistry at the bottom
//  3. Create a new page from page-template.html
//     (change the 5 variables at the top of the template — done)
// ============================================================


// ------------------------------------------------------------
//  Top-level "hub" links (shown on the main guides/index page)
// ------------------------------------------------------------
const hubArticles = [
    {
        title: 'Farming Simulator 25',
        subtitle: 'Guides & Tutorials',
        icon: 'https://www.justkaarlo.com/res/ico/favicon/fs25-favicon-2.ico',
        link: 'https://www.justkaarlo.com/guides/fs25',
        contentType: 'link'
    },
    {
        title: 'Minecraft',
        subtitle: 'Guides & Resources',
        icon: 'https://www.justkaarlo.com/res/ico/favicon/minecraft-favicon-1.ico',
        link: 'https://www.justkaarlo.com/guides/minecraft',
        contentType: 'link'
    },
    {
        title: 'ArmA3',
        subtitle: 'Guides & Resources',
        icon: 'https://www.justkaarlo.com/res/guides/ui/medium/arma3.png',
        link: 'https://www.justkaarlo.com/guides/arma3',
        contentType: 'link'
    },
];

// ------------------------------------------------------------
//  DocRegistry — maps page IDs to their article arrays
//  Add a new entry here when you create a new page.
// ------------------------------------------------------------
const DocRegistry = {
    menu: menu,

    // Helper — used internally, not needed in page templates
    get(pageId) { return this[pageId] || []; }
};
