// Color schemes for different games
const twColors = ['#ffaa00', '#ff6a00', '#8a8a8a'];
const erColors = ['#9ab97d', '#6c8f5a', '#a1ffe1'];
const fsColors = ['#ffaa00', '#ff6a00', '#8a8a8a'];

// Initialize particles based on current page
function initializeParticles(colors) {
    if (window.pJSDom && pJSDom[0]) {
        pJSDom[0].pJS.particles.color.value = colors;
        pJSDom[0].pJS.fn.particlesRefresh();
    } else {
        particlesJS('particles-js', {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 700 } },
                color: { value: colors },
                shape: { type: 'circle' },
                opacity: { value: 0.4, random: true, anim: { enable: true, speed: 0.3, opacity_min: 0.2, sync: false } },
                size: { value: 4, random: true, anim: { enable: true, speed: 4, size_min: 1, sync: false } },
                line_linked: { enable: false },
                move: { enable: true, speed: 0.15, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
            retina_detect: true
        });
    }
}

// Initialize particles based on current page
function initParticlesForCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('totalwar')) {
        initializeParticles(twColors);
    } else if (path.includes('eldenring')) {
        initializeParticles(erColors);
    } else if (path.includes('fs25')) {
        initializeParticles(fsColors);
    } else {
        initializeParticles(twColors); // default
    }
}

// Initialize particles when page loads
initParticlesForCurrentPage();

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

// Utility functions
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

function shouldShowDownloadButtonForFile({ file, folderId, path, downloadButtonFiles, showDownloadButtonForAllFiles, showDownloadButtonAtRoot }) {
    const keyByPath = path ? `${path}${file.name}` : file.name;
    const keyById = `${folderId}/${file.name}`;
    
    const isInList = downloadButtonFiles && (
        downloadButtonFiles.includes(file.name) ||
        downloadButtonFiles.includes(file.id) ||
        downloadButtonFiles.includes(keyByPath) ||
        downloadButtonFiles.includes(keyById)
    );
    
    // If we have a global setting for all files
    if (showDownloadButtonForAllFiles !== undefined) {
        if (showDownloadButtonForAllFiles) {
            // Show for all files EXCEPT those in the list (exclusion mode)
            return !isInList;
        } else {
            // Show ONLY for files in the list (inclusion mode)
            return isInList;
        }
    }
    
    // Legacy behavior: show at root level unless specified otherwise
    if (!path && showDownloadButtonAtRoot) {
        return !isInList; // At root, show all except excluded
    }
    
    // For subfolders, only show if specifically included
    return isInList;
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

function getCustomWebsiteLink({ file, folderId, path, customWebsiteLinks }) {
    if (!customWebsiteLinks) return null;
    
    const keyByPath = path ? `${path}${file.name}` : file.name;
    const keyById = `${folderId}/${file.name}`;
    
    return customWebsiteLinks[file.name] 
        || customWebsiteLinks[file.id] 
        || customWebsiteLinks[keyByPath] 
        || customWebsiteLinks[keyById];
}

function getTooltipData({ file, folderId, path, tooltipData }) {
    if (!tooltipData) return null;
    
    const keyByPath = path ? `${path}${file.name}` : file.name;
    const keyById = `${folderId}/${file.name}`;
    
    return tooltipData[file.name] 
        || tooltipData[file.id] 
        || tooltipData[keyByPath] 
        || tooltipData[keyById];
}

function getCustomDisplayName({ file, folderId, path, customDisplayNames }) {
    if (!customDisplayNames) return file.name;
    
    const keyByPath = path ? `${path}${file.name}` : file.name;
    const keyById = `${folderId}/${file.name}`;
    
    return customDisplayNames[file.name] 
        || customDisplayNames[file.id] 
        || customDisplayNames[keyByPath] 
        || customDisplayNames[keyById]
        || file.name;
}

function getCustomTags({ file, folderId, path, customTags }) {
    if (!customTags) return [];
    
    const keyByPath = path ? `${path}${file.name}` : file.name;
    const keyById = `${folderId}/${file.name}`;
    
    const tags = customTags[file.name] 
        || customTags[file.id] 
        || customTags[keyByPath] 
        || customTags[keyById];
    
    // Ensure tags is always an array
    if (!tags) return [];
    return Array.isArray(tags) ? tags : [tags];
}

function shouldHideSizeTag({ file, folderId, path, hideSizeTagFiles }) {
    if (!hideSizeTagFiles || hideSizeTagFiles.length === 0) return false;
    
    const keyByPath = path ? `${path}${file.name}` : file.name;
    const keyById = `${folderId}/${file.name}`;
    
    return hideSizeTagFiles.includes(file.name)
        || hideSizeTagFiles.includes(file.id)
        || hideSizeTagFiles.includes(keyByPath)
        || hideSizeTagFiles.includes(keyById);
}

function createCustomTag(tagConfig) {
    const tag = document.createElement("span");
    tag.className = "custom-tag";
    tag.textContent = tagConfig.text || tagConfig;
    
    if (tagConfig.color) {
        // Convert hex to rgba with transparency
        const hex = tagConfig.color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Use custom background opacity or default to 0.35
        const bgOpacity = tagConfig.opacity !== undefined ? tagConfig.opacity : 0.35;
        tag.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${bgOpacity})`;
        
        // Determine base text color based on original color brightness
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        const baseTextColor = brightness > 155 ? '0, 0, 0' : '255, 255, 255';
        
        // Use custom text opacity or default to 1.0 (fully opaque)
        const textOpacity = tagConfig.textOpacity !== undefined ? tagConfig.textOpacity : 1.0;
        tag.style.color = `rgba(${baseTextColor}, ${textOpacity})`;
    }
    
    return tag;
}

// Enhanced Tooltip System - Fixed Version
let currentTooltipElement = null;
let tooltipShowTimeout = null;
let tooltipHideTimeout = null;

function createEnhancedTooltip(data) {
    const tooltip = document.createElement('div');
    tooltip.className = 'enhanced-tooltip';
    
    if (data.image || data.images) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'tooltip-image-container';
        
        const images = data.images || [data.image];
        
        if (images.length === 1) {
            // Single image
            const img = document.createElement('img');
            img.src = images[0];
            img.alt = '';
            img.className = 'tooltip-image';
            imageContainer.appendChild(img);
        } else {
            // Multiple images - create slideshow
            images.forEach((imageSrc, index) => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = '';
                img.className = `tooltip-image ${index === 0 ? 'active' : ''}`;
                imageContainer.appendChild(img);
            });
            
            // Add navigation dots
            if (images.length > 1) {
                const dotsContainer = document.createElement('div');
                dotsContainer.className = 'tooltip-dots';
                
                images.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.className = `tooltip-dot ${index === 0 ? 'active' : ''}`;
                    dotsContainer.appendChild(dot);
                });
                
                imageContainer.appendChild(dotsContainer);
                
                // Auto-advance slideshow
                let currentImageIndex = 0;
                const slideInterval = setInterval(() => {
                    const currentImg = imageContainer.querySelector('.tooltip-image.active');
                    const currentDot = imageContainer.querySelector('.tooltip-dot.active');
                    
                    if (currentImg && currentDot) {
                        currentImg.classList.remove('active');
                        currentDot.classList.remove('active');
                        
                        currentImageIndex = (currentImageIndex + 1) % images.length;
                        
                        const nextImg = imageContainer.children[currentImageIndex];
                        const nextDot = dotsContainer.children[currentImageIndex];
                        
                        nextImg.classList.add('active');
                        nextDot.classList.add('active');
                    }
                }, 2500); // Change image every 2.5 seconds
                
                // Store interval to clear it later
                tooltip.slideInterval = slideInterval;
            }
        }
        
        tooltip.appendChild(imageContainer);
    }
    
    if (data.description) {
        const desc = document.createElement('div');
        desc.className = 'tooltip-description';
        desc.textContent = data.description;
        tooltip.appendChild(desc);
    }
    
    return tooltip;
}

function hideEnhancedTooltip(immediate = false) {
    // Clear any pending show timeout
    if (tooltipShowTimeout) {
        clearTimeout(tooltipShowTimeout);
        tooltipShowTimeout = null;
    }
    
    // Clear any pending hide timeout
    if (tooltipHideTimeout) {
        clearTimeout(tooltipHideTimeout);
        tooltipHideTimeout = null;
    }
    
    const existingTooltip = document.getElementById('active-enhanced-tooltip');
    if (existingTooltip) {
        // Clear slideshow interval if it exists
        if (existingTooltip.slideInterval) {
            clearInterval(existingTooltip.slideInterval);
            existingTooltip.slideInterval = null;
        }
        
        if (immediate) {
            // Remove immediately without animation
            existingTooltip.remove();
        } else {
            // Animate out
            existingTooltip.classList.remove('visible');
            tooltipHideTimeout = setTimeout(() => {
                if (existingTooltip.parentNode) {
                    existingTooltip.remove();
                }
                tooltipHideTimeout = null;
            }, 200);
        }
    }
    
    currentTooltipElement = null;
}

function showEnhancedTooltip(element, tooltipData) {
    // If this is the same element, don't do anything
    if (currentTooltipElement === element) {
        return;
    }
    
    // Immediately hide any existing tooltip
    hideEnhancedTooltip(true);
    
    // Clear any pending timeouts
    if (tooltipShowTimeout) {
        clearTimeout(tooltipShowTimeout);
    }
    
    // Set current element
    currentTooltipElement = element;
    
    // Debounce the tooltip showing
    tooltipShowTimeout = setTimeout(() => {
        // Double-check that we're still supposed to show this tooltip
        if (currentTooltipElement !== element) {
            return;
        }
        
        const tooltip = createEnhancedTooltip(tooltipData);
        tooltip.id = 'active-enhanced-tooltip';
        document.body.appendChild(tooltip);
        
        const updatePosition = (e) => {
            if (!tooltip.parentNode) return; // Tooltip was removed
            
            const rect = element.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            let left = e.clientX + 10;
            let top = e.clientY + 10;
            
            // Adjust position to keep tooltip in viewport
            if (left + tooltipRect.width > window.innerWidth) {
                left = e.clientX - tooltipRect.width - 10;
            }
            if (top + tooltipRect.height > window.innerHeight) {
                top = e.clientY - tooltipRect.height - 10;
            }
            
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        };
        
        // Position the tooltip
        const rect = element.getBoundingClientRect();
        updatePosition({ 
            clientX: rect.left + rect.width / 2, 
            clientY: rect.top + rect.height / 2 
        });
        
        // Show tooltip with animation
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.classList.add('visible');
            }
        }, 50);
        
        tooltipShowTimeout = null;
    }, 150); // 150ms delay before showing
}

function handleTooltipMouseEnter(element, tooltipData) {
    showEnhancedTooltip(element, tooltipData);
}

function handleTooltipMouseLeave(element) {
    // Only hide if we're leaving the element that triggered the current tooltip
    if (currentTooltipElement === element) {
        hideEnhancedTooltip();
    }
}

// Download Manager Class
class DownloadManager {
    constructor() {
        this.activeDownloads = new Map();
        this.toastContainer = this.createToastContainer();
        this.serverBaseUrl = 'https://app.justkaarlo.com';
    }

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

    async pollDownloadStatus(downloadId) {
        const maxPollTime = 60000;
        const pollInterval = 2000;
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

    download(fileId, filename, customLink = null) {
        const downloadId = this.generateDownloadId();
        const url = customLink || `${this.serverBaseUrl}/download/${fileId}?downloadId=${downloadId}`;
        return this.downloadWithStatusTracking(url, filename, downloadId);
    }

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

// Main file listing function
async function listFilesInFolder(options) {
    const {
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
        showDownloadButtonForAllFiles = undefined,
        excludePartsFolders = [],
        downloadButtonFiles = [],
        excludeDownloadFiles = [],
        customDownloadLinks = {},
        customWebsiteLinks = {},
        tooltipData = {},
        customDisplayNames = {},
        customTags = {},
        hideSizeTagFiles = [],
        hideSizeTagFolders = [],
        hideAllSizeTags = false
    } = options;

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

        // Add enhanced tooltip functionality with fixed event handling
        const fileTooltipData = getTooltipData({ file, folderId, path, tooltipData });
        if (fileTooltipData) {
            link.addEventListener('mouseenter', () => {
                handleTooltipMouseEnter(link, fileTooltipData);
            });
            link.addEventListener('mouseleave', () => {
                handleTooltipMouseLeave(link);
            });
        } else {
            // Only apply transform if no tooltip
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
        }

        const icon = document.createElement("img");
        const iconKey = `${folderId}/${file.name}`;
        icon.src = customIcons[iconKey] || customIcons[file.name] || file.iconLink;
        icon.alt = "";

        if (colorizeFiles.includes(file.name)) {
            applyGradientToItemFromSrc(li, icon.src);
        }

        link.appendChild(icon);
        
        // Use custom display name if available
        const displayName = getCustomDisplayName({ file, folderId, path, customDisplayNames });
        link.appendChild(document.createTextNode(displayName));

        const fileEntry = document.createElement("div");
        fileEntry.className = "file-entry";
        fileEntry.appendChild(link);

        // Tags and size container
        const tagsContainer = document.createElement("div");
        tagsContainer.className = "tags-container";
        tagsContainer.style.cssText = "display: flex; align-items: center; gap: 6px; margin-left: auto;";

        // Add custom tags
        const fileTags = getCustomTags({ file, folderId, path, customTags });
        fileTags.forEach(tagConfig => {
            const customTag = createCustomTag(tagConfig);
            tagsContainer.appendChild(customTag);
        });

        // Add size tag (unless hidden)
        const shouldHideSize = hideAllSizeTags || shouldHideSizeTag({ file, folderId, path, hideSizeTagFiles });
        if (file.size && !shouldHideSize) {
            const sizeTag = document.createElement("span");
            sizeTag.className = "file-size-tag";
            sizeTag.textContent = formatBytes(parseInt(file.size, 10));
            tagsContainer.appendChild(sizeTag);
        }

        // Button container for multiple buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";

        const includeButton = shouldShowDownloadButtonForFile({
            file,
            folderId,
            path,
            downloadButtonFiles,
            showDownloadButtonForAllFiles,
            showDownloadButtonAtRoot
        });

        const excludeButton = isExcludedDownloadFile({
            file,
            folderId,
            path,
            excludeList: excludeDownloadFiles
        });

        // Download button
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

            buttonContainer.appendChild(downloadBtn);
        }

        // Custom website button
        const customWebsiteLink = getCustomWebsiteLink({ file, folderId, path, customWebsiteLinks });
        if (customWebsiteLink) {
            const websiteBtn = document.createElement("button");
            websiteBtn.className = "folder-open-button website-button";

            const tooltip = document.createElement("span");
            tooltip.className = "custom-tooltip";
            tooltip.textContent = "Visit Website";
            websiteBtn.appendChild(tooltip);

            const btnIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            btnIcon.setAttribute("width", "16");
            btnIcon.setAttribute("height", "16");
            btnIcon.setAttribute("viewBox", "0 0 24 24");
            btnIcon.setAttribute("fill", "none");

            // External link icon - cleaner design
            const linkPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            linkPath.setAttribute("d", "M7 17L17 7M17 7H7M17 7V17");
            linkPath.setAttribute("stroke", "rgba(160, 160, 160, 0.7)");
            linkPath.setAttribute("stroke-width", "2");
            linkPath.setAttribute("stroke-linecap", "round");
            linkPath.setAttribute("stroke-linejoin", "round");
            linkPath.setAttribute("fill", "none");

            btnIcon.appendChild(linkPath);
            websiteBtn.appendChild(btnIcon);

            websiteBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(customWebsiteLink, "_blank");
            };

            buttonContainer.appendChild(websiteBtn);
        }

        if (tagsContainer.children.length > 0) {
            fileEntry.appendChild(tagsContainer);
        }

        if (buttonContainer.children.length > 0) {
            fileEntry.appendChild(buttonContainer);
        }

        li.appendChild(fileEntry);
        container.appendChild(li);
    }

    // Folders
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
        
        // Use custom display name for folders too
        const folderDisplayName = getCustomDisplayName({ file: folder, folderId, path, customDisplayNames });
        nameSpan.textContent = folderDisplayName;

        // Add enhanced tooltip functionality for folders with fixed event handling
        const folderTooltipData = getTooltipData({ file: folder, folderId, path, tooltipData });
        if (folderTooltipData) {
            nameSpan.addEventListener('mouseenter', () => {
                handleTooltipMouseEnter(nameSpan, folderTooltipData);
            });
            nameSpan.addEventListener('mouseleave', () => {
                handleTooltipMouseLeave(nameSpan);
            });
        } else {
            // Only apply transform if no tooltip
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
        }

        const rightWrapper = document.createElement("div");
        rightWrapper.style.display = "flex";
        rightWrapper.style.alignItems = "center";
        rightWrapper.style.gap = "6px";

        // Folder tags and info container
        const folderTagsContainer = document.createElement("div");
        folderTagsContainer.style.cssText = "display: flex; align-items: center; gap: 6px;";

        // Add custom tags for folders
        const folderTags = getCustomTags({ file: folder, folderId, path, customTags });
        folderTags.forEach(tagConfig => {
            const customTag = createCustomTag(tagConfig);
            folderTagsContainer.appendChild(customTag);
        });

        const sizeTag = document.createElement("span");
        sizeTag.className = "file-size-tag";
        sizeTag.textContent = "...";
        
        // Check if we should hide size tag for this folder
        const shouldHideFolderSize = hideAllSizeTags || shouldHideSizeTag({ 
            file: folder, 
            folderId, 
            path, 
            hideSizeTagFiles: hideSizeTagFolders 
        });
        
        if (!shouldHideFolderSize) {
            folderTagsContainer.appendChild(sizeTag);
        }

        const excludeParts = excludePartsFolders.includes(folder.id) || excludePartsFolders.includes(folder.name);
        let countTag = null;
        if (!excludeParts) {
            countTag = document.createElement("span");
            countTag.className = "file-count-tag";
            countTag.textContent = "";
            folderTagsContainer.appendChild(countTag);
        }

        // Button container for folder buttons
        const folderButtonContainer = document.createElement("div");
        folderButtonContainer.className = "button-container";

        const folderExcluded = excludeDownloadFiles.includes(folder.id) || excludeDownloadFiles.includes(folder.name);

        // Folder download button
        if (!folderExcluded) {
            const folderBtn = document.createElement("button");
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

            folderButtonContainer.appendChild(folderBtn);
        }

        // Custom website button for folders
        const folderCustomWebsiteLink = getCustomWebsiteLink({ file: folder, folderId, path, customWebsiteLinks });
        if (folderCustomWebsiteLink) {
            const websiteBtn = document.createElement("button");
            websiteBtn.className = "folder-open-button website-button";

            const tooltip = document.createElement("span");
            tooltip.className = "custom-tooltip";
            tooltip.textContent = "Visit Website";
            websiteBtn.appendChild(tooltip);

            const btnIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            btnIcon.setAttribute("width", "16");
            btnIcon.setAttribute("height", "16");
            btnIcon.setAttribute("viewBox", "0 0 24 24");
            btnIcon.setAttribute("fill", "none");

            // External link icon - cleaner design
            const linkPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            linkPath.setAttribute("d", "M7 17L17 7M17 7H7M17 7V17");
            linkPath.setAttribute("stroke", "rgba(160, 160, 160, 0.7)");
            linkPath.setAttribute("stroke-width", "2");
            linkPath.setAttribute("stroke-linecap", "round");
            linkPath.setAttribute("stroke-linejoin", "round");
            linkPath.setAttribute("fill", "none");

            btnIcon.appendChild(linkPath);
            websiteBtn.appendChild(btnIcon);

            websiteBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(folderCustomWebsiteLink, "_blank");
            };

            folderButtonContainer.appendChild(websiteBtn);
        }

        leftWrapper.appendChild(arrow);
        leftWrapper.appendChild(icon);
        leftWrapper.appendChild(nameSpan);

        rightWrapper.appendChild(folderTagsContainer);
        if (folderButtonContainer.children.length > 0) {
            rightWrapper.appendChild(folderButtonContainer);
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
                    showDownloadButtonForAllFiles,
                    excludePartsFolders,
                    downloadButtonFiles,
                    excludeDownloadFiles,
                    customDownloadLinks,
                    customWebsiteLinks,
                    tooltipData,
                    customDisplayNames,
                    customTags,
                    hideSizeTagFiles,
                    hideSizeTagFolders,
                    hideAllSizeTags
                });
            }
            const isOpen = subList.style.display === "block";
            subList.style.display = isOpen ? "none" : "block";
            arrow.classList.toggle("open", !isOpen);
            li.classList.toggle("folder-open", !isOpen);
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

                // Only update size if size tag isn't hidden
                const shouldHideFolderSize = hideAllSizeTags || shouldHideSizeTag({ 
                    file: folder, 
                    folderId, 
                    path, 
                    hideSizeTagFiles: hideSizeTagFolders 
                });
                
                if (!shouldHideFolderSize) {
                    sizeTag.textContent = formatBytes(totalSize);
                }
                
                if (countTag) {
                    const currentPath = window.location.pathname;
                    if (currentPath.includes('fs25')) {
                        countTag.textContent = `${fileCount} File${fileCount !== 1 ? "s" : ""}`;
                    } else {
                        countTag.textContent = `${fileCount} Part${fileCount !== 1 ? "s" : ""}`;
                    }
                }
            });

        container.appendChild(li);
    }
}

// Modal functionality
const modal = document.getElementById("docModal");
const closeBtn = document.getElementById("closeModal");

function openModal(embedUrl) {
    if (modal && closeBtn) {
        document.getElementById("docFrame").src = embedUrl;
        modal.style.display = "flex";
        document.body.classList.add('modal-open');
    }
}

function closeModal() {
    if (modal && closeBtn) {
        modal.style.display = "none";
        document.getElementById("docFrame").src = "";
        document.body.classList.remove('modal-open');
    }
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

// Event listeners
if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
}

if (modal) {
    modal.addEventListener("click", function (e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.style.display === "flex") {
        closeModal();
    }
});

// Navigation functionality (simplified since each page is separate)
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