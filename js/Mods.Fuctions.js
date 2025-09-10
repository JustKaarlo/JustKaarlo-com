const nav = document.querySelector('.nav-container');

// Navigation functionality
(function () {
    const nav = document.querySelector('.nav-container');
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
})();

// Section navigation functionality
(function () {
    const sectionNavBtns = document.querySelectorAll('.section-nav-btn');
    const content = document.querySelector('.content');
    const twBg = document.getElementById('bg-tw');
    const erBg = document.getElementById('bg-er');

    sectionNavBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const targetSection = btn.getAttribute('data-section');

            // Remove active class from all buttons
            sectionNavBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Handle section transitions
            if (targetSection === 'elden-section') {
                content.classList.add('show-elden');
                erBg.style.opacity = '1';
                twBg.style.opacity = '0';
                initializeParticles(erColors);
            } else {
                content.classList.remove('show-elden');
                erBg.style.opacity = '0';
                twBg.style.opacity = '1';
                initializeParticles(twColors);
            }
        });
    });
})();

const twColors = ['#ffaa00', '#ff6a00', '#8a8a8a'];
const erColors = ['#9ab97d', '#6c8f5a', '#a1ffe1'];

function pauseParticles() {
    if (window.pJSDom && pJSDom[0] && pJSDom[0].pJS) {
        pJSDom[0].pJS.particles.move.enable = false;
        pJSDom[0].pJS.fn.particlesRefresh();
    }
}
function resumeParticles() {
    if (window.pJSDom && pJSDom[0] && pJSDom[0].pJS) {
        pJSDom[0].pJS.particles.move.enable = true;
        pJSDom[0].pJS.fn.particlesRefresh();
    }
}

function initializeParticles(colors) {
    if (window.pJSDom && pJSDom[0]) {
        pJSDom[0].pJS.particles.color.value = colors;
        pJSDom[0].pJS.fn.particlesRefresh();
    } else {
        particlesJS('particles-js', {
            particles: {
                number: { value: 90, density: { enable: true, value_area: 700 } },
                color: { value: colors },
                shape: { type: 'circle' },
                opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1.2, opacity_min: 0.2, sync: false } },
                size: { value: 4, random: true, anim: { enable: true, speed: 4, size_min: 1, sync: false } },
                line_linked: { enable: false },
                move: { enable: true, speed: 0.35, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
            retina_detect: true
        });
    }
}
initializeParticles(twColors);

function formatBytes(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Bytes";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(1)) + " " + sizes[i];
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h, s, l };
}
function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}
function adjustLightness({ r, g, b }, delta = 0.15) {
    const { h, s, l } = rgbToHsl(r, g, b);
    const nl = Math.max(0, Math.min(1, l + delta));
    return hslToRgb(h, s, nl);
}
function rgbaStr({ r, g, b }, a) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function getAverageColorFromImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            try {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d", { willReadFrequently: true });
                const w = 24, h = 24;
                canvas.width = w; canvas.height = h;
                ctx.drawImage(img, 0, 0, w, h);
                const { data } = ctx.getImageData(0, 0, w, h);
                let r = 0, g = 0, b = 0, count = 0;
                for (let i = 0; i < data.length; i += 8) {
                    const a = data[i + 3];
                    if (a < 64) continue;
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                    count++;
                }
                if (!count) return reject("no_pixels");
                resolve({ r: Math.round(r / count), g: Math.round(g / count), b: Math.round(b / count) });
            } catch (e) { reject(e); }
        };
        img.onerror = () => reject("load_error");
        img.src = src;
    });
}

function applyGradientToItemFromSrc(li, src, fallbackKey, folderGradientFallback = {}) {
    getAverageColorFromImage(src).then(base => {
        const light = adjustLightness(base, +0.18);
        const dark = adjustLightness(base, -0.18);
        li.style.backgroundImage = `linear-gradient(135deg, ${rgbaStr(light, 0.18)} 0%, ${rgbaStr(dark, 0.35)} 100%)`;
        li.style.border = `1px solid ${rgbaStr(dark, 0.22)}`;
        li.style.backdropFilter = 'blur(1px)';
    }).catch(() => {
        if (fallbackKey && folderGradientFallback[fallbackKey]) {
            li.style.backgroundImage = folderGradientFallback[fallbackKey];
            li.style.border = `1px solid rgba(255,255,255,0.06)`;
        } else {
            li.style.backgroundImage = `linear-gradient(135deg, rgba(120,120,120,0.12), rgba(60,60,60,0.24))`;
            li.style.border = `1px solid rgba(255,255,255,0.05)`;
        }
    });
}

function isDriveDoc(mimeType) {
    return mimeType && mimeType.startsWith('application/vnd.google-apps');
}

function getDownloadUrl(file, apiKey) {
    if (file.webContentLink) return file.webContentLink;
    return `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${apiKey}`;
}

function shouldShowDownloadButtonForFile({ file, folderId, path, includeList }) {
    if (!includeList || includeList.length === 0) return false;
    const keyByPath = path ? `${path}${file.name}` : file.name;
    const keyById = `${folderId}/${file.name}`;

    return includeList.includes(file.name)
        || includeList.includes(file.id)
        || includeList.includes(keyByPath)
        || includeList.includes(keyById);
}

function isExcludedDownloadFile({ file, folderId, path, excludeList }) {
    if (!excludeList || excludeList.length === 0) return false;

    const keyByPath = path ? `${path}${file.name}` : file.name;
    const keyById = `${folderId}/${file.name}`;

    return excludeList.includes(file.name)
        || excludeList.includes(file.id)
        || excludeList.includes(keyByPath)
        || excludeList.includes(keyById);
}

// Enhanced Download Manager Class with Server Startup Detection
class DownloadManager {
    constructor() {
        this.activeDownloads = new Map();
        this.toastContainer = this.createToastContainer();
        this.serverBaseUrl = 'https://app.justkaarlo.com';
        this.serverReady = false;
        this.lastServerCheck = 0;
        this.serverCheckInterval = 5 * 60 * 1000; // Check server readiness every 5 minutes
    }

    // Generate unique download ID
    generateDownloadId() {
        return 'dl_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'download-toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(container);
        return container;
    }

    // Create server startup loading modal
    createStartupModal() {
        const modal = document.createElement('div');
        modal.id = 'server-startup-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 20000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            color: white;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            max-width: 400px;
            margin: 20px;
        `;

        const spinner = document.createElement('div');
        spinner.style.cssText = `
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255, 255, 255, 0.2);
            border-top: 3px solid #4CAF50;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px auto;
        `;

        const title = document.createElement('h3');
        title.textContent = 'Starting Server...';
        title.style.cssText = `
            margin: 0 0 10px 0;
            font-family: Arial, sans-serif;
            font-size: 18px;
            font-weight: 600;
        `;

        const message = document.createElement('p');
        message.textContent = 'The download server is starting up. This may take a few moments.';
        message.style.cssText = `
            margin: 0;
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.4;
        `;

        content.appendChild(spinner);
        content.appendChild(title);
        content.appendChild(message);
        modal.appendChild(content);

        return modal;
    }

    showStartupModal() {
        // Remove existing modal if any
        this.hideStartupModal();
        
        const modal = this.createStartupModal();
        document.body.appendChild(modal);
        
        // Fade in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        return modal;
    }

    hideStartupModal() {
        const modal = document.getElementById('server-startup-modal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.remove();
                }
            }, 300);
        }
    }

    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `download-toast toast-${type}`;
        
        const backgroundColor = type === 'success' ? '#4CAF50' : 
                              type === 'error' ? '#f44336' : '#2196F3';
        
        toast.style.cssText = `
            background: ${backgroundColor};
            color: white;
            padding: 12px 20px;
            margin-bottom: 10px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            pointer-events: auto;
            animation: slideIn 0.3s ease-out;
            font-family: Arial, sans-serif;
            font-size: 14px;
            max-width: 350px;
            word-wrap: break-word;
            cursor: pointer;
        `;

        toast.textContent = message;
        toast.title = 'Click to dismiss';
        toast.onclick = () => this.removeToast(toast);

        this.toastContainer.appendChild(toast);

        if (duration > 0) {
            setTimeout(() => {
                if (toast.parentNode) {
                    this.removeToast(toast);
                }
            }, duration);
        }

        return toast;
    }

    removeToast(toast) {
        if (toast && toast.parentNode) {
            toast.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }

    // Check if server is ready and wake it up if needed
    async checkServerReadiness() {
        const now = Date.now();
        
        // If we checked recently and server was ready, assume it's still ready
        if (this.serverReady && (now - this.lastServerCheck) < this.serverCheckInterval) {
            return true;
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const response = await fetch(`${this.serverBaseUrl}/health`, {
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                this.serverReady = true;
                this.lastServerCheck = now;
                return true;
            } else {
                throw new Error(`Health check failed: ${response.status}`);
            }
        } catch (error) {
            console.warn('Server health check failed:', error.message);
            this.serverReady = false;
            return false;
        }
    }

    // Wake up server with loading toast
    async wakeUpServer() {
        const toast = this.showStartupToast();
        
        try {
            console.log('Checking server status...');
            
            // First, try a quick health check
            const isReady = await this.checkServerReadiness();
            
            if (isReady) {
                console.log('Server is already ready');
                this.hideStartupToast();
                return true;
            }

            console.log('Server needs to start up, waiting...');
            
            // Server needs to start up, wait longer
            const maxAttempts = 6; // Try for up to 30 seconds
            const retryDelay = 5000; // 5 seconds between attempts
            
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                console.log(`Startup attempt ${attempt}/${maxAttempts}`);
                
                await new Promise(resolve => setTimeout(resolve, retryDelay));
                
                const ready = await this.checkServerReadiness();
                if (ready) {
                    console.log('Server is now ready!');
                    this.hideStartupToast();
                    return true;
                }
            }
            
            // Server didn't start within expected time
            console.warn('Server startup timeout');
            this.hideStartupToast();
            this.showToast('Server is taking longer than expected to start. Please try again.', 'error', 5000);
            return false;
            
        } catch (error) {
            console.error('Error during server startup:', error);
            this.hideStartupToast();
            this.showToast('Unable to connect to download server. Please try again.', 'error', 5000);
            return false;
        }
    }

    // Poll server for download status
    async pollDownloadStatus(downloadId) {
        const maxPollTime = 60000; // 60 seconds
        const pollInterval = 2000; // 2 seconds
        const startTime = Date.now();
        let downloadStarted = false;

        const poll = async () => {
            try {
                const response = await fetch(`${this.serverBaseUrl}/download-status/${downloadId}`);
                const statusData = await response.json();

                console.log('Download status:', statusData);

                switch (statusData.status) {
                    case 'downloading':
                        if (!downloadStarted) {
                            downloadStarted = true;
                            this.showToast('Download Started', 'success', 3000);
                        }
                        break;

                    case 'cancelled':
                        this.showToast('Download Cancelled', 'error', 3000);
                        return;

                    case 'error':
                        this.showToast('Download Failed', 'error', 3000);
                        return;

                    case 'starting':
                    case 'preparing':
                        break;

                    case 'completed':
                        return;

                    case 'not_found':
                        if (Date.now() - startTime > 10000) {
                            return;
                        }
                        break;
                }

                if (Date.now() - startTime < maxPollTime) {
                    setTimeout(poll, pollInterval);
                }

            } catch (error) {
                console.error('Error polling download status:', error);
            }
        };

        setTimeout(poll, 1000);
    }

    // Main download method with optional server startup check
    download(fileId, filename, customLink = null) {
        const downloadId = this.generateDownloadId();
        const url = customLink || `${this.serverBaseUrl}/download/${fileId}?downloadId=${downloadId}`;

        // Do server check in background without blocking download
        this.checkServerInBackground();

        return this.downloadWithStatusTracking(url, filename, downloadId);
    }

    // Background server check that shows loading toast if needed
    async checkServerInBackground() {
        // Always show loading toast initially if we haven't checked recently
        const now = Date.now();
        const shouldShowLoading = !this.serverReady || (now - this.lastServerCheck) > this.serverCheckInterval;
        
        if (shouldShowLoading) {
            console.log('Showing startup toast as precaution...');
            const toast = this.showStartupToast();
            
            try {
                // Quick check first
                const isReady = await this.checkServerReadiness();
                
                if (isReady) {
                    console.log('Server responded quickly, hiding toast');
                    setTimeout(() => this.hideStartupToast(), 1000); // Hide after 1 second
                    return;
                }
                
                // Server not ready, wait longer
                console.log('Server needs startup time...');
                const maxAttempts = 6;
                const retryDelay = 5000;
                
                for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                    
                    const ready = await this.checkServerReadiness();
                    if (ready) {
                        console.log('Server is now ready!');
                        this.hideStartupToast();
                        return;
                    }
                }
                
                // Hide toast after timeout
                this.hideStartupToast();
                
            } catch (error) {
                console.error('Server check failed:', error);
                // Hide toast on error after a reasonable time
                setTimeout(() => this.hideStartupToast(), 3000);
            }
        }
    }

    // Enhanced download with server status tracking
    downloadWithStatusTracking(url, filename, downloadId) {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        document.body.appendChild(iframe);

        this.pollDownloadStatus(downloadId);

        const cleanup = () => {
            try {
                if (iframe.parentNode) {
                    document.body.removeChild(iframe);
                }
            } catch (e) {
                console.log('Cleanup completed');
            }
        };

        setTimeout(cleanup, 30000);

        return {
            downloadId: downloadId,
            cancel: cleanup
        };
    }
}

// Initialize global download manager
const downloadManager = new DownloadManager();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .download-toast {
        transition: all 0.3s ease;
    }
    
    .download-toast:hover {
        transform: translateX(-5px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.4);
    }
`;
document.head.appendChild(style);

async function listFilesInFolder({
    folderId,
    container,
    path = "",
    apiKey,
    customIcons = {},
    customFolderIcons = {},
    highlightFiles = [],
    colorizeFiles = [],
    folderGradientFallback = {},
    showDownloadButtonAtRoot = true,
    excludePartsFolders = [],
    downloadButtonFiles = [],
    excludeDownloadFiles = [],
    customDownloadLinks = {}
}) {
    container.innerHTML = "";

    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&key=${apiKey}&fields=files(id,name,mimeType,webViewLink,webContentLink,iconLink,size)`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.files || data.files.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No files found.";
        container.appendChild(li);
        return;
    }

    const files = data.files.filter(f => f.mimeType !== "application/vnd.google-apps.folder");
    const folders = data.files.filter(f => f.mimeType === "application/vnd.google-apps.folder");

    files.sort((a, b) => {
        const aTop = highlightFiles.includes(a.name);
        const bTop = highlightFiles.includes(b.name);
        if (aTop && !bTop) return -1;
        if (bTop && !aTop) return 1;
        return a.name.localeCompare(b.name, undefined, { numeric: true });
    });
    folders.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    // Files
    for (const file of files) {
        const li = document.createElement("li");
        if (highlightFiles.includes(file.name)) li.classList.add("highlighted");

        const link = document.createElement("a");
        link.href = file.webViewLink;
        link.target = "_blank";

        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const midX = rect.width / 2;
            const midY = rect.height / 2;
            const rotateX = ((y - midY) / midY) * 2;
            const rotateY = ((x - midX) / midX) * 2;
            link.style.transform = `translateX(1.5px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0px) rotateX(0deg) rotateY(0deg) scale(1)';
        });

        const icon = document.createElement("img");
        const iconKey = `${folderId}/${file.name}`;
        icon.src = customIcons[iconKey] || customIcons[file.name] || file.iconLink;
        icon.alt = "";

        if (colorizeFiles.includes(file.name)) {
            applyGradientToItemFromSrc(li, icon.src);
        }

        link.appendChild(icon);
        link.appendChild(document.createTextNode(file.name));

        const fileEntry = document.createElement("div");
        fileEntry.className = "file-entry";
        fileEntry.appendChild(link);

        if (file.size) {
            const sizeTag = document.createElement("span");
            sizeTag.className = "file-size-tag";
            sizeTag.textContent = formatBytes(parseInt(file.size, 10));
            fileEntry.appendChild(sizeTag);
        }

        const includeButton = shouldShowDownloadButtonForFile({
            file,
            folderId,
            path,
            includeList: downloadButtonFiles
        });

        const excludeButton = isExcludedDownloadFile({
            file,
            folderId,
            path,
            excludeList: excludeDownloadFiles
        });

        if (!isDriveDoc(file.mimeType) && (includeButton || (!path && showDownloadButtonAtRoot)) && !excludeButton) {
            const downloadBtn = document.createElement("button");
            downloadBtn.className = "folder-open-button";

            const tooltip = document.createElement("span");
            tooltip.className = "custom-tooltip";
            tooltip.textContent = "Download";
            downloadBtn.appendChild(tooltip);

            const btnIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            btnIcon.setAttribute("width", "16");
            btnIcon.setAttribute("height", "16");
            btnIcon.setAttribute("viewBox", "0 0 24 24");
            btnIcon.setAttribute("fill", "none");

            const trayPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            trayPath.setAttribute("d", "M5 20h14a1 1 0 0 0 1-1v-3h-2v2H6v-2H4v3a1 1 0 0 0 1 1z");
            trayPath.setAttribute("fill", "rgba(255, 255, 255, 0.15)");

            const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            arrowPath.setAttribute("d", "M12 3v10.17l3.59-3.58L17 11l-5 5-5-5 1.41-1.41L11 13.17V3h2z");
            arrowPath.setAttribute("fill", "rgba(255, 255, 255, 0.35)");
            arrowPath.setAttribute("class", "arrow-part");

            btnIcon.appendChild(trayPath);
            btnIcon.appendChild(arrowPath);
            downloadBtn.appendChild(btnIcon);

            downloadBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();

                const customLink = customDownloadLinks[file.id] || customDownloadLinks[file.name];
                downloadManager.download(file.id, file.name, customLink);
            };

            fileEntry.appendChild(downloadBtn);
        }

        li.appendChild(fileEntry);
        container.appendChild(li);
    }

    for (const folder of folders) {
        const li = document.createElement("li");

        const folderLink = document.createElement("div");
        folderLink.className = "folder-entry";
        folderLink.style.cursor = "pointer";

        const leftWrapper = document.createElement("div");
        leftWrapper.style.display = "flex";
        leftWrapper.style.alignItems = "center";

        const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        arrow.setAttribute("viewBox", "0 0 24 24");
        arrow.setAttribute("class", "folder-arrow");
        arrow.innerHTML = `<path d="M9 5l7 7-7 7"/>`;

        const icon = document.createElement("img");
        icon.crossOrigin = "anonymous";
        const iconSrc = customFolderIcons[folder.id] || folder.iconLink;
        icon.src = iconSrc;
        icon.alt = "";

        const nameSpan = document.createElement("span");
        nameSpan.className = "folder-name";
        nameSpan.textContent = folder.name;

        const rightWrapper = document.createElement("div");
        rightWrapper.style.display = "flex";
        rightWrapper.style.alignItems = "center";
        rightWrapper.style.gap = "1px";

        const sizeTag = document.createElement("span");
        sizeTag.className = "file-size-tag";
        sizeTag.textContent = "...";

        const excludeParts = excludePartsFolders.includes(folder.id) || excludePartsFolders.includes(folder.name);
        let countTag = null;
        if (!excludeParts) {
            countTag = document.createElement("span");
            countTag.className = "file-count-tag";
            countTag.textContent = "";
        }

        const folderBtn = document.createElement("button");
        const folderExcluded =
            excludeDownloadFiles.includes(folder.id) ||
            excludeDownloadFiles.includes(folder.name);

        if (!folderExcluded) {
            rightWrapper.appendChild(folderBtn);
        }
        folderBtn.className = "folder-open-button";
        const tooltip = document.createElement("span");
        tooltip.className = "custom-tooltip";
        tooltip.textContent = "Download";
        folderBtn.appendChild(tooltip);
        folderBtn.onclick = (e) => {
            e.stopPropagation();
            const customLink = customDownloadLinks[folder.id] || customDownloadLinks[folder.name];
            if (customLink) {
                window.open(customLink, "_blank");
            } else {
                window.open(`https://drive.google.com/drive/folders/${folder.id}`, "_blank");
            }
        };

        const btnIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        btnIcon.setAttribute("width", "16");
        btnIcon.setAttribute("height", "16");
        btnIcon.setAttribute("viewBox", "0 0 24 24");
        btnIcon.setAttribute("fill", "none");

        const trayPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        trayPath.setAttribute("d", "M5 20h14a1 1 0 0 0 1-1v-3h-2v2H6v-2H4v3a1 1 0 0 0 1 1z");
        trayPath.setAttribute("fill", "rgba(255, 255, 255, 0.15)");

        const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        arrowPath.setAttribute("d", "M12 3v10.17l3.59-3.58L17 11l-5 5-5-5 1.41-1.41L11 13.17V3h2z");
        arrowPath.setAttribute("fill", "rgba(255, 255, 255, 0.35)");
        arrowPath.setAttribute("class", "arrow-part");

        btnIcon.appendChild(trayPath);
        btnIcon.appendChild(arrowPath);
        folderBtn.appendChild(btnIcon);

        leftWrapper.appendChild(arrow);
        leftWrapper.appendChild(icon);
        leftWrapper.appendChild(nameSpan);

        rightWrapper.appendChild(sizeTag);
        if (countTag) rightWrapper.appendChild(countTag);
        if (!excludeDownloadFiles.includes(folder.id) &&
            !excludeDownloadFiles.includes(folder.name)) {
            rightWrapper.appendChild(folderBtn);
        }

        folderLink.appendChild(leftWrapper);
        folderLink.appendChild(rightWrapper);
        li.appendChild(folderLink);

        applyGradientToItemFromSrc(li, iconSrc, folder.id, folderGradientFallback);

        const subList = document.createElement("ul");
        subList.className = "file-list";
        subList.style.marginLeft = "20px";
        subList.style.height = "auto";
        subList.style.maxHeight = "480px";
        subList.style.display = "none";
        li.appendChild(subList);

        folderLink.addEventListener("click", async () => {
            if (subList.childElementCount === 0) {
                await listFilesInFolder({
                    folderId: folder.id,
                    container: subList,
                    path: `${path}${folder.name}/`,
                    apiKey,
                    customIcons,
                    customFolderIcons,
                    highlightFiles,
                    colorizeFiles,
                    folderGradientFallback,
                    showDownloadButtonAtRoot: false,
                    excludePartsFolders,
                    downloadButtonFiles,
                    excludeDownloadFiles,
                    customDownloadLinks
                });
            }
            const isOpen = subList.style.display === "block";
            subList.style.display = isOpen ? "none" : "block";
            arrow.classList.toggle("open", !isOpen);
            li.classList.toggle("folder-open", !isOpen);
        });

        nameSpan.addEventListener('mousemove', (e) => {
            const rect = nameSpan.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const midX = rect.width / 2;
            const midY = rect.height / 2;
            const rotateX = ((y - midY) / midY) * 2;
            const rotateY = ((x - midX) / midX) * 2;
            nameSpan.style.transform = `translateX(1.5px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        nameSpan.addEventListener('mouseleave', () => {
            nameSpan.style.transform = 'translateX(0px) rotateX(0deg) rotateY(0deg) scale(1)';
        });

        fetch(`https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents+and+trashed=false&fields=files(size,mimeType)&key=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                if (!data.files) return;
                const fileItems = data.files.filter(f => f.mimeType !== "application/vnd.google-apps.folder");
                const fileCount = fileItems.length;
                const totalSize = fileItems
                    .filter(f => f.size)
                    .reduce((sum, f) => sum + parseInt(f.size, 10), 0);

                sizeTag.textContent = formatBytes(totalSize);
                if (countTag) {
                    countTag.textContent = `${fileCount} Part${fileCount !== 1 ? "s" : ""}`;
                }
            });

        container.appendChild(li);
    }
}

// Modal functionality
const modal = document.getElementById("docModal");
const closeBtn = document.getElementById("closeModal");

function openModal(embedUrl) {
    document.getElementById("docFrame").src = embedUrl;
    modal.style.display = "flex";
    document.body.classList.add('modal-open');
}

function closeModal() {
    modal.style.display = "none";
    document.getElementById("docFrame").src = "";
    document.body.classList.remove('modal-open');
}

function attachDocPreview(listElement) {
    if (!listElement) return;
    listElement.addEventListener("click", function (e) {
        const target = e.target;
        let link = target.tagName === "A" ? target : target.closest("a");
        if (!link) return;

        const url = link.href;
        if (url.includes("docs.google.com/document")) {
            e.preventDefault();
            const fileIdMatch = url.match(/[-\w]{25,}/);
            const fileId = fileIdMatch ? fileIdMatch[0] : null;
            if (fileId) {
                const embedUrl = `https://docs.google.com/document/d/${fileId}/preview`;
                openModal(embedUrl);
            } else {
                alert("Could not determine Google Doc ID.");
            }
        }
    });
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function (e) {
    if (e.target === this) {
        closeModal();
    }
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "flex") {
        closeModal();
    }
});