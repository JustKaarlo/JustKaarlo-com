//  HOW TO ADD A NEW PAGE:
//  1. Add a new const below (e.g. const myGameArticles = [...])
//  2. Register it in DocRegistry at the bottom
//  3. Create a new page from page-template.html
//     s(change the 5 variables at the top of the template — done)


// ------------------------------------------------------------
//  Top-level "hub" links (shown on the main guides/index page)
// ------------------------------------------------------------
const menu = [
    {
        title: 'THIS IS JUST A TEST',
        subtitle: 'First steps guide',
        icon: 'https://...icon.png',
        contentType: 'description',
        description: `<p>Hello world!</p>`
    },
    // Section divider:
    { type: 'section', title: 'Advanced' },
    {
        title: 'Tips & Tricks',
        subtitle: 'Pro moves',
        icon: 'https://...icon.png',
        contentType: 'link',
        link: 'https://...'
    }
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
