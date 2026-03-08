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
        const tocButton = document.getElementById('tocButton');
        const tocPanel = document.getElementById('tocPanel');

        modalTitle.textContent = guide.title;
        
        // Show description, hide image
        guideDescription.innerHTML = guide.description;
        guideDescription.style.display = 'block';
        guideImage.style.display = 'none';

        // Initialize dropdowns after content is loaded
        this.initializeDropdowns();

        // Handle TOC button visibility and generation
        if (guide.showTOC === true) {
            tocButton.style.display = 'inline-flex';
            this.generateTOC();
        } else {
            tocButton.style.display = 'none';
            if (tocPanel) {
                tocPanel.classList.remove('show');
            }
        }

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
        const tocPanel = document.getElementById('tocPanel');
        
        modal.classList.remove('show');
        if (tocPanel) {
            tocPanel.classList.remove('show');
        }
        
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');

        // Clear content after animation
        setTimeout(() => {
            const guideImage = document.getElementById('guideImage');
            const guideDescription = document.getElementById('guideDescription');
            const tocContent = document.getElementById('tocContent');
            if (guideImage) guideImage.src = '';
            if (guideDescription) guideDescription.innerHTML = '';
            if (tocContent) tocContent.innerHTML = '';
        }, 300);
    },
    
    // Generate guide buttons dynamically
    generateButtons(containerId, guidesArray) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Initialize with the provided guides array
        this.init(guidesArray);
        
        container.innerHTML = '';
        
        guidesArray.forEach((item, index) => {
            // Handle section headers
            if (item.type === 'section') {
                const section = document.createElement('div');
                section.className = 'guide-section';
                section.innerHTML = `
                    <h3 class="section-title">${item.title}</h3>
                    ${item.subtitle ? `<p class="section-subtitle">${item.subtitle}</p>` : ''}
                `;
                container.appendChild(section);
                return;
            }
            
            // Handle guide buttons
            const button = document.createElement('button');
            button.className = 'guide-button';
            button.setAttribute('data-index', index);
            
            // Build badge HTML if exists
            let badgeHTML = '';
            if (item.badge) {
                const badgePosition = item.badge.position || 'right';
                const badgeClass = badgePosition === 'icon-tag' ? 'guide-badge-icon-tag' : 'guide-badge-right';
                
                // Check if badge icon is a URL or emoji/text
                const isImageBadge = item.badge.icon.startsWith('http://') || 
                                    item.badge.icon.startsWith('https://') || 
                                    item.badge.icon.startsWith('/');
                
                const badgeContent = isImageBadge 
                    ? `<img src="${item.badge.icon}" alt="${item.badge.tooltip || ''}">` 
                    : item.badge.icon;
                
                badgeHTML = `
                    <div class="${badgeClass}">
                        ${badgeContent}
                        ${item.badge.tooltip ? `<span class="badge-tooltip">${item.badge.tooltip}</span>` : ''}
                    </div>
                `;
            }
            
            button.innerHTML = `
                <div class="guide-icon-wrapper">
                    <img class="guide-icon" src="${item.icon}" alt="">
                    ${item.badge && item.badge.position === 'icon-tag' ? badgeHTML : ''}
                </div>
                <div class="guide-text">
                    <span class="guide-title">${item.title}</span>
                    <span class="guide-subtitle">${item.subtitle}</span>
                </div>
                ${item.badge && item.badge.position !== 'icon-tag' ? badgeHTML : ''}
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
    },
    
    // Generate table of contents from headers
    generateTOC() {
        const guideDescription = document.getElementById('guideDescription');
        const tocContent = document.getElementById('tocContent');
        
        if (!guideDescription || !tocContent) return;
        
        // Find all headers (h1, h2, h3)
        const headers = guideDescription.querySelectorAll('h1, h2, h3', 'h4', 'h5', 'h6');
        
        if (headers.length === 0) {
            tocContent.innerHTML = '<p style="color: #999; padding: 10px;">No sections found</p>';
            return;
        }
        
        // Clear existing TOC
        tocContent.innerHTML = '';
        
        // Generate TOC items
        headers.forEach((header, index) => {
            // Add ID to header for scrolling
            const headerId = `toc-section-${index}`;
            header.id = headerId;
            
            // Create TOC item
            const tocItem = document.createElement('a');
            tocItem.href = `#${headerId}`;
            tocItem.className = `toc-item toc-${header.tagName.toLowerCase()}`;
            tocItem.textContent = header.textContent;
            
            // Scroll to section on click
            tocItem.addEventListener('click', (e) => {
                e.preventDefault();
                const guideDescription = document.getElementById('guideDescription');
                const targetElement = document.getElementById(headerId);
                
                if (targetElement && guideDescription) {
                    // Calculate position relative to the description container
                    const targetRect = targetElement.getBoundingClientRect();
                    const containerRect = guideDescription.getBoundingClientRect();
                    const scrollOffset = targetRect.top - containerRect.top + guideDescription.scrollTop - 20;
                    
                    guideDescription.scrollTo({
                        top: scrollOffset,
                        behavior: 'smooth'
                    });
                    
                    // Optional: close TOC panel after clicking on mobile
                    if (window.innerWidth <= 768) {
                        const tocPanel = document.getElementById('tocPanel');
                        if (tocPanel) {
                            tocPanel.classList.remove('show');
                        }
                    }
                }
            });
            
            tocContent.appendChild(tocItem);
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

function toggleTOC() {
    const tocPanel = document.getElementById('tocPanel');
    if (tocPanel) {
        tocPanel.classList.toggle('show');
    }
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
        
        // Check for deep link hash on page load
        const hash = window.location.hash.substring(1); // Remove the # symbol
        if (hash) {
            // Find guide by matching the hash with guide title (converted to URL-friendly format)
            const guideIndex = guidesArray.findIndex(guide => {
                const guideSlug = guide.title.toLowerCase()
                    .replace(/[^\w\s-]/g, '') // Remove special characters
                    .replace(/\s+/g, '-') // Replace spaces with hyphens
                    .replace(/--+/g, '-'); // Replace multiple hyphens with single
                return guideSlug === hash;
            });
            
            if (guideIndex !== -1) {
                // Small delay to ensure DOM is fully loaded
                setTimeout(() => {
                    GuideSystem.openGuide(guideIndex);
                }, 100);
            }
        }
    });
}