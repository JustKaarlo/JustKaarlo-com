const canvas = document.getElementById(SITE_CONFIG.particles.canvasId);
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);

class Particle {
    constructor() {
        this.init();
    }
    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * SITE_CONFIG.particles.size.max + SITE_CONFIG.particles.size.min;
        this.vx = (Math.random() - 0.5) * SITE_CONFIG.particles.velocity.x;
        this.vy = (Math.random() - 0.5) * SITE_CONFIG.particles.velocity.y;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.init();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${SITE_CONFIG.particles.color},${SITE_CONFIG.particles.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < SITE_CONFIG.particles.count; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

resize();
initParticles();
animateParticles();

// Logo Card Mouse Tracking
const logoCardConfig = SITE_CONFIG.logoCard;
const logoCard = document.querySelector(logoCardConfig.selector);

if (logoCard && logoCardConfig.enableMouseTracking) {
    logoCard.addEventListener('mousemove', (e) => {
        const rect = logoCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / logoCardConfig.rotationSensitivity;
        const rotateY = (x - centerX) / logoCardConfig.rotationSensitivity;

        logoCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${logoCardConfig.hoverScale})`;
    });

    logoCard.addEventListener('mouseleave', () => {
        logoCard.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(${logoCardConfig.normalScale})`;
    });
}

// Modal close on background click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('commit-details-modal');
    if (e.target === modal) {
        closeCommitDetailsModal();
    }
});

// Keyboard escape to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCommitDetailsModal();
    }
});