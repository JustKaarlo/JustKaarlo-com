// Guide System Module
const GuideSystem = {
    currentGuides: [],
    
    // Initialize the guide system with a specific array of guides
    init(guidesArray) {
        this.currentGuides = guidesArray;
    },
    
    // Open a guide based on its index
    openGuide(guideIndex) {
        const guide = this.currentGuides[guideIndex];
        if (!guide) return;

        // Handle different content types
        if (guide.contentType === 'image' && guide.image) {
            // Show modal with image preview
            this.showImageModal(guide);
        } else if (guide.contentType === 'description' && guide.description) {
            // Show modal with formatted description
            this.showDescriptionModal(guide);
        } else if (guide.contentType === 'link' && guide.link) {
            // Open link directly
            window.location.href = guide.link;
        } else if (guide.link) {
            // Fallback: if no contentType specified but link exists
            window.location.href = guide.link;
        }
    },
    
    // Show modal with guide image
    showImageModal(guide) {
        const modal = document.getElementById('guideModal');
        const modalTitle = document.getElementById('modalTitle');
        const guideImage = document.getElementById('guideImage');
        const guideDescription = document.getElementById('guideDescription');
        const guideLink = document.getElementById('guideLink');

        modalTitle.textContent = guide.title;
        
        // Show image, hide description
        guideImage.src = guide.image;
        guideImage.style.display = 'block';
        guideDescription.style.display = 'none';

        // Show or hide the external link button
        if (guide.link && guideLink) {
            guideLink.href = guide.link;
            guideLink.style.display = 'inline-flex';
        } else if (guideLink) {
            guideLink.style.display = 'none';
        }

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
    },
    
    // Show modal with formatted description
    showDescriptionModal(guide) {
        const modal = document.getElementById('guideModal');
        const modalTitle = document.getElementById('modalTitle');
        const guideImage = document.getElementById('guideImage');
        const guideDescription = document.getElementById('guideDescription');
        const guideLink = document.getElementById('guideLink');

        modalTitle.textContent = guide.title;
        
        // Show description, hide image
        guideDescription.innerHTML = guide.description;
        guideDescription.style.display = 'block';
        guideImage.style.display = 'none';

        // Initialize dropdowns after content is loaded
        this.initializeDropdowns();

        // Show or hide the external link button
        if (guide.link && guideLink) {
            guideLink.href = guide.link;
            guideLink.style.display = 'inline-flex';
        } else if (guideLink) {
            guideLink.style.display = 'none';
        }

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
    },
    
    // Close the modal
    closeModal() {
        const modal = document.getElementById('guideModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');

        // Clear content after animation
        setTimeout(() => {
            const guideImage = document.getElementById('guideImage');
            const guideDescription = document.getElementById('guideDescription');
            if (guideImage) guideImage.src = '';
            if (guideDescription) guideDescription.innerHTML = '';
        }, 300);
    },
    
    // Generate guide buttons dynamically
    generateButtons(containerId, guidesArray) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Initialize with the provided guides array
        this.init(guidesArray);
        
        container.innerHTML = '';
        
        guidesArray.forEach((guide, index) => {
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
            
            button.addEventListener('click', () => this.openGuide(index));
            container.appendChild(button);
        });
        
        this.apply3DTiltEffect();
    },
    
    // Apply 3D tilt effect to guide buttons
    apply3DTiltEffect() {
        document.querySelectorAll('.guide-button').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const midX = rect.width / 2;
                const midY = rect.height / 2;
                const rotateX = ((y - midY) / midY) * 5;
                const rotateY = ((x - midX) / midX) * 5;
                button.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    },
    
    // Initialize dropdown functionality
    initializeDropdowns() {
        const dropdowns = document.querySelectorAll('.guide-description .dropdown');
        
        dropdowns.forEach(dropdown => {
            const header = dropdown.querySelector('.dropdown-header');
            
            if (header) {
                // Remove any existing click listeners
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);
                
                // Add click listener
                newHeader.addEventListener('click', () => {
                    dropdown.classList.toggle('active');
                });
            }
        });
    }
};

// Navigation System
const NavigationSystem = {
    init() {
        const nav = document.querySelector('.nav-container');
        if (nav) {
            let lastScrollTop = 0;
            let scrollTimeout;

            nav.classList.remove('hidden');

            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);

                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

                if (currentScroll < 200) {
                    nav.classList.remove('hidden');
                } else {
                    nav.classList.add('hidden');
                }

                lastScrollTop = currentScroll;
            }, { passive: true });

            document.addEventListener('mousemove', (e) => {
                if (e.clientY < 100) {
                    nav.classList.remove('hidden');
                } else if (window.pageYOffset > 200) {
                    nav.classList.add('hidden');
                }
            }, { passive: true });
        }
    }
};

// Global functions for HTML onclick attributes
function openGuide(index) {
    GuideSystem.openGuide(index);
}

function closeGuide() {
    GuideSystem.closeModal();
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    NavigationSystem.init();
    
    // Set up modal close events
    const modal = document.getElementById('guideModal');
    if (modal) {
        // Close modal on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                GuideSystem.closeModal();
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            GuideSystem.closeModal();
        }
    });
});

// Page-specific initialization function
function initializeGuidePage(containerId, guidesArray) {
    document.addEventListener('DOMContentLoaded', () => {
        GuideSystem.generateButtons(containerId, guidesArray);
    });
}