// Main guides page configuration
const guides = [
    {
        title: 'Farming Simulator 2025',
        subtitle: 'Guides & Tutorials',
        icon: 'https://www.justkaarlo.com/res/ico/favicon/fs25-favicon-2.ico',
        link: 'https://www.justkaarlo.com/guides/fs25.html',
        imagePreview: false
    },
];

const fsGuides = [
    {
        title: 'Sow & Harvest Potatoes',
        subtitle: 'With Precision Farming',
        icon: 'https://www.justkaarlo.com/res/src/guides/potato.png',
        image: 'https://www.justkaarlo.com/res/src/guides/Fs25-Potatoes-Guide.png',
        link: 'https://www.farming-simulator.com/newsArticle.php?&news_id=301',
        imagePreview: true
    },
];

// Example structure for future guide pages (uncomment when needed)
/*
const eldenRingGuides = [
    {
        title: 'Margit Boss Fight',
        subtitle: 'Strategy Guide',
        icon: 'https://example.com/margit-icon.png',
        image: 'https://example.com/margit-guide.png',
        link: 'https://example.com/margit-external',
        imagePreview: true
    },
    {
        title: 'Wiki Resources',
        subtitle: 'External Links',
        icon: 'https://example.com/wiki-icon.png',
        link: 'https://eldenring.wiki.fextralife.com',
        imagePreview: false
    }
];
*/

// Configuration object for easy management
const GuideConfigs = {
    main: guides,
    fs25: fsGuides,
    // eldenRing: eldenRingGuides,
    
    // Helper method to get guides by page name
    getGuides(pageName) {
        return this[pageName] || [];
    }
};