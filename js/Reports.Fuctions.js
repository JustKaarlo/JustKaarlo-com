const logoCard = document.querySelector('.logo-card');

logoCard.addEventListener('mousemove', (e) => {
    const rect = logoCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 150;
    const rotateY = (x - centerX) / 150;

    logoCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.98)`;
});

logoCard.addEventListener('mouseleave', () => {
    logoCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
});

const canvas = document.getElementById('particle-canvas');
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
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.13;
        this.vy = (Math.random() - 0.5) * 0.13;
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
        ctx.fillStyle = 'rgba(120,120,120,0.3)';
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 25; i++) {
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

const modal = document.getElementById('modal');
const iframe = document.getElementById('modal-frame');
const overlay = document.getElementById('overlay');
function openModal(src) {
    overlay.style.display = 'block';
    modal.style.display = 'block';
    iframe.onload = () => {
        const maxH = window.innerHeight * 0.99;
        let h;
        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            h = Math.min(doc.documentElement.scrollHeight, maxH);
            doc.documentElement.style.scrollbarWidth = 'none';
            doc.documentElement.style.msOverflowStyle = 'none';
            doc.body.style.scrollbarWidth = 'none';
            doc.body.style.msOverflowStyle = 'none';
            const styleTag = doc.createElement('style');
            styleTag.textContent = `html::-webkit-scrollbar, body::-webkit-scrollbar {width:0; height:0; background: transparent;}`;
            doc.head.appendChild(styleTag);
        } catch {
            h = maxH;
        }
        modal.style.height = h + 'px';
    };
    iframe.src = src;
}

function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    iframe.src = '';
    modal.style.height = '';
}

window.addEventListener('DOMContentLoaded', () => {
    const hashMap = {
        '#arrest-report':           'https://www.justkaarlo.com/report/Arrest-Report.html',
        '#citation-report':         'https://www.justkaarlo.com/report/Citation-Report.html',
        '#coroner-report':          'https://www.justkaarlo.com/report/Coroner-Report.html',
        '#medical-report':          'https://www.justkaarlo.com/report/Medical-Report.html',
        '#fire-incident':           'https://www.justkaarlo.com/report/Fire-Incident-Report.html',
        '#tow-report':              'https://www.justkaarlo.com/report/Towing-Report.html',
        '#prison-transport':        'https://www.justkaarlo.com/report/Prison-Transport.html'
    };

    const url = hashMap[window.location.hash];
    if (url) {
        openModal(url);
    }
});

const shareBtn = document.getElementById('shareBtn');
const sharePopup = document.getElementById('sharePopup');
const shareSelect = document.getElementById('shareSelect');
const copyLinkBtn = document.getElementById('copyLinkBtn');

shareBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (sharePopup.style.display === 'block') {
        sharePopup.style.display = 'block';
        sharePopup.classList.add('open');
        // sharePopup.style.display = 'none';
        // sharePopup.classList.remove('open');
    } else {
        sharePopup.style.display = 'block';
        sharePopup.classList.add('open');
    }
});

copyLinkBtn.addEventListener('click', () => {
    const link = shareSelect.value;
    const tmp = document.createElement('textarea');
    tmp.value = link;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);

    copyLinkBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyLinkBtn.textContent = 'Copy Link';
        sharePopup.style.display = 'none';
    }, 2000);
});

document.addEventListener('click', e => {
    if (!sharePopup.contains(e.target) && e.target !== shareBtn) {
        sharePopup.style.display = 'none';
        sharePopup.classList.remove('open');
    }
});