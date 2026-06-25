// grid-overlay.js

document.addEventListener("DOMContentLoaded", () => {
    // Exact defaults matching the rsnl.gg tactical gaming theme
    const defaults = {
        // Grid Options
        bgColor: '#060606',                  // Dark charcoal background
        gridSize: '20px',                    // Matrix layout spacing
        gridColor: 'rgba(255, 183, 0, 0.12)', // Subtle yellow/amber tactical dots

        // Spark Options
        particleCount: 140,                  // Fine particle density
        shape: 'circle',                     // 'circle', 'square', or 'line'
        minSize: 0.4,                        // Microscopic ember size min
        maxSize: 1.6,                        // Microscopic ember size max
        minSpeedX: -0.15,                    // Organic slight horizontal sway
        maxSpeedX: 0.15,
        minSpeedY: -0.4,                     // Floating slowly upward
        maxSpeedY: -0.05,
        minFadeSpeed: 0.005,                 // Gentle, fluid twinkle rate
        maxFadeSpeed: 0.015,
        particleColorRGB: '240, 240, 240',   // High-fidelity white/gray sparks
        twinkle: true                        // Smooth fade engine toggle
    };

    // Merges all options cleanly under the requested window.gridConfig variable
    const config = Object.assign({}, defaults, window.gridConfig || {});

    // 1. Dynamic CSS Injection from gridConfig
    document.body.style.backgroundColor = config.bgColor;

    const gridDiv = document.createElement('div');
    gridDiv.classList.add('spark-grid-overlay');
    gridDiv.style.backgroundImage = `radial-gradient(circle, ${config.gridColor} 1px, transparent 1px)`;
    gridDiv.style.backgroundSize = `${config.gridSize} ${config.gridSize}`;
    document.body.prepend(gridDiv);

    // 2. Canvas Setup
    const canvas = document.createElement('canvas');
    canvas.id = 'spark-grid-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];

    class Particle {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * canvas.width;
            this.y = initial ? Math.random() * canvas.height : (config.minSpeedY > 0 ? -10 : canvas.height + 10);
            this.size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
            this.speedX = Math.random() * (config.maxSpeedX - config.minSpeedX) + config.minSpeedX;
            this.speedY = Math.random() * (config.maxSpeedY - config.minSpeedY) + config.minSpeedY;
            
            this.opacity = config.twinkle ? Math.random() : (Math.random() * 0.5 + 0.2);
            this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
            this.fadeSpeed = Math.random() * (config.maxFadeSpeed - config.minFadeSpeed) + config.minFadeSpeed;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (config.twinkle) {
                this.opacity += this.fadeDirection * this.fadeSpeed;
                if (this.opacity >= 1) this.fadeDirection = -1;
                if (this.opacity <= 0) this.fadeDirection = 1;
            }

            if (this.y < -20 || this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = `rgba(${config.particleColorRGB}, ${Math.max(0, this.opacity)})`;
            ctx.strokeStyle = `rgba(${config.particleColorRGB}, ${Math.max(0, this.opacity)})`;
            
            ctx.beginPath();
            if (config.shape === 'square') {
                ctx.fillRect(this.x, this.y, this.size, this.size);
            } else if (config.shape === 'line') {
                ctx.lineWidth = this.size;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - (this.speedX * 5), this.y - (this.speedY * 5));
                ctx.stroke();
            } else {
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function init() {
        for (let i = 0; i < config.particleCount; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    init();
    animate();
});