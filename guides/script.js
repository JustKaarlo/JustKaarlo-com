// Initialize particles with FS colors
particlesJS('particles-js', {
    particles: {
        number: { value: 40, density: { enable: true, value_area: 700 } },
        color: { value: ['#ffaa00', '#ff6a00', '#8a8a8a'] },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true, anim: { enable: true, speed: 0.3, opacity_min: 0.2, sync: false } },
        size: { value: 4, random: true, anim: { enable: true, speed: 4, size_min: 1, sync: false } },
        line_linked: { enable: false },
        move: { enable: true, speed: 0.15, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
    retina_detect: true
});

// Navigation visibility on scroll
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

// Modal functionality
function openGuide(guideIndex) {
    const guide = guides[guideIndex];
    if (!guide) return;
    
    const modal = document.getElementById('guideModal');
    const modalTitle = document.getElementById('modalTitle');
    const guideImage = document.getElementById('guideImage');
    const guideLink = document.getElementById('guideLink');

    modalTitle.textContent = guide.title;
    guideImage.src = guide.image;
    
    // Handle optional link
    if (guide.link && guideLink) {
        guideLink.href = guide.link;
        guideLink.style.display = 'inline-flex';
    } else if (guideLink) {
        guideLink.style.display = 'none';
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
}

function closeGuide() {
    const modal = document.getElementById('guideModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');

    // Clear image after animation
    setTimeout(() => {
        document.getElementById('guideImage').src = '';
    }, 300);
}

// Close modal on outside click
document.getElementById('guideModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeGuide();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeGuide();
    }
});

// Function to apply 3D tilt effect to guide buttons
function apply3DTiltEffect() {
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
}

// Initialize guide buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    generateGuideButtons();
});