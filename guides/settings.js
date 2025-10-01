// Guide Configuration
const guides = [
    {
        title: 'Sow & Harvest Potatoes',
        subtitle: 'With Precision Farming',
        icon: 'https://www.justkaarlo.com/res/src/guides/potato.png',
        image: 'https://www.justkaarlo.com/res/src/guides/Fs25-Potatoes-Guide.png',
        link: 'https://www.farming-simulator.com/newsArticle.php?&news_id=301'
    },
];

// Function to generate guide buttons dynamically
function generateGuideButtons() {
    const container = document.getElementById('guidesGrid');
    if (!container) return;
    
    container.innerHTML = ''; // Clear existing content
    
    guides.forEach((guide, index) => {
        const button = document.createElement('button');
        button.className = 'guide-button';
        button.setAttribute('data-index', index);
        
        button.innerHTML = `
            <img class="guide-icon" src="${guide.icon}" alt="">
            <div class="guide-text">
                <span class="guide-title">${guide.title}</span>
                <span class="guide-subtitle">${guide.subtitle}</span>
            </div>
        `;
        
        button.addEventListener('click', () => openGuide(index));
        container.appendChild(button);
    });
    
    // Re-apply 3D tilt effect to newly created buttons
    apply3DTiltEffect();
}