// ============================================================================
// SETTINGS.JS - Centralized Configuration for JustKaarlo.com
// ============================================================================
// This file contains all customizable settings for the website.
// Modify values here to instantly update your site without editing HTML/CSS.

const SITE_CONFIG = {
    // ========================================================================
    // GENERAL SITE SETTINGS
    // ========================================================================
    site: {
        title: "JustKaarlo",
        domain: "justkaarlo.com",
        author: "JustKaarlo",
        defaultLanguage: "en",
        siteRoot: "/" // Root directory for scanning files
    },

    // ========================================================================
    // MAIN NAVIGATION SETTINGS (NOT FOR TOP NAV - FOR CONTENT SECTION)
    // ========================================================================
    navigation: {
        items: [
            {
                label: "Mods",
                href: "../mods",
                icon: "../res/ico/mods.svg",
                tooltip: "Browse Mods"
            },
            {
                label: "Guides",
                href: "../guides",
                icon: "../res/ico/guides.svg",
                tooltip: "View Guides"
            }
        ]
    },

    // ========================================================================
    // WORKSHOP/PROFILE SETTINGS (Steam)
    // ========================================================================
    workshop: {
        enabled: true,
        platform: "Steam",
        username: "@JustKaarlo",
        avatar: "https://www.justkaarlo.com/res/src/steam-avatar.png",
        avatarAlt: "Steam Avatar",
        actions: [
            {
                label: "Profile",
                href: "https://steamcommunity.com/id/justkaarlo/",
                icon: "../res/ico/profile.svg",
                tooltip: "View Steam Profile"
            },
            {
                label: "Workshop",
                href: "https://steamcommunity.com/id/justkaarlo/myworkshopfiles/",
                icon: "../res/ico/steam.svg",
                tooltip: "View Workshop Files"
            }
        ]
    },

    // ========================================================================
    // RECENTLY UPDATED SECTION SETTINGS - AUTO-SCANS ALL FILES
    // ========================================================================
    recentlyUpdated: {
        enabled: true,
        title: "Latest",
        subtitle: "Pages That Was Recently Updated",
        maxItems: 2, // Maximum number of recently updated items to display
        autoRefresh: true,
        refreshInterval: 10000, // 10 minutes in milliseconds (600000ms)
        cacheKey: "RecentlyUpdatedPages",
        
        // Files and folders to scan for updates
        monitoredLocations: [
            "/guides/",
            "/mods/",
            "/home-redesign/"
        ],
        
        // File extensions to monitor
        monitoredExtensions: [
            ".html",
            ".css",
            ".js"
        ],
        
        // Folders to exclude from scanning
        excludeFolders: [],
        
        // Update check method
        updateCheckMethod: "last-modified" // "file-hash" or "last-modified"
    },

    // ========================================================================
    // PARTICLE ANIMATION SETTINGS
    // ========================================================================
    particles: {
        enabled: true,
        canvasId: "particle-canvas",
        count: 25,
        size: { min: 1, max: 3 },
        velocity: { x: 0.13, y: 0.13 },
        opacity: 0.3,
        color: "120,120,120",
        animationSpeed: "requestAnimationFrame"
    },

    // ========================================================================
    // LOGO CARD SETTINGS
    // ========================================================================
    logoCard: {
        selector: ".logo-card",
        image: "https://www.justkaarlo.com/res/src/header-cards/header-home.svg",
        enableMouseTracking: true,
        rotationSensitivity: 150,
        hoverScale: 0.98,
        normalScale: 1,
        filter: "brightness(1.2)"
    },

    // ========================================================================
    // THEME & COLOR SETTINGS
    // ========================================================================
    theme: {
        mode: "dark",
        colors: {
            bg1: "#0e0f12",
            bg2: "#15171c",
            text1: "#e6e7eb",
            text2: "#b4b8c3",
            accent: "#6aa9ff",
            accent2: "#9e7bff",
            glassBackground: "rgba(255, 255, 255, 0.06)",
            glassBorder: "rgba(255, 255, 255, 0.18)",
            glassInner: "rgba(255, 255, 255, 0.35)"
        },
        borderRadius: {
            lg: "18px",
            md: "14px",
            sm: "10px"
        },
        shadows: {
            shadow1: "0 8px 30px rgba(0, 0, 0, 0.45)",
            shadow2: "0 16px 60px rgba(0, 0, 0, 0.55)"
        },
        transitions: {
            fast: "140ms cubic-bezier(.2, .8, .2, 1)",
            slow: "600ms cubic-bezier(.2, .8, .2, 1)"
        }
    },

    // ========================================================================
    // PERFORMANCE SETTINGS
    // ========================================================================
    performance: {
        enableLazyLoading: true,
        enableImageOptimization: true,
        cacheStrategy: "aggressive",
        prefetchLinks: true
    }
};

// ============================================================================
// AUTOMATIC RECENTLY UPDATED DETECTION SYSTEM WITH FULL SITE SCANNING
// ============================================================================

class RecentlyUpdatedManager {
    constructor(config) {
        this.config = config.recentlyUpdated;
        this.siteRoot = config.site.siteRoot;
        this.allFiles = {};
        this.checksums = {};
        this.updateCallback = null;
        this.init();
    }

    init() {
        if (!this.config.enabled) return;

        this.loadChecksumsFromCache();
        this.scanSiteForFiles();
        this.checkForUpdates();

        if (this.config.autoRefresh) {
            setInterval(() => this.checkForUpdates(), this.config.refreshInterval);
        }
    }

    /**
     * Load cached checksums from localStorage
     */
    loadChecksumsFromCache() {
        const cached = localStorage.getItem(this.config.cacheKey);
        if (cached) {
            try {
                this.checksums = JSON.parse(cached);
            } catch (e) {
                console.error("Error parsing cached checksums:", e);
            }
        }
    }

    /**
     * Save checksums to localStorage
     */
    saveChecksumsToCache() {
        try {
            localStorage.setItem(this.config.cacheKey, JSON.stringify(this.checksums));
        } catch (e) {
            console.error("Error saving checksums to cache:", e);
        }
    }

    /**
     * Scan the site for all files (common pages and directories)
     */
    scanSiteForFiles() {
        const commonFiles = [
            "/index.html",
            "/home.html",

            "/guides/grayzone.html",
            "/guides/arma3.html",
            "/guides/fs25.html",

            "/mods/elden-ring.html",
            "/mods/fs25.html",

            "/home-redesign/home.html",
            "/home-redesign/settings.js"
        ];

        this.allFiles = {};
        commonFiles.forEach(file => {
            this.allFiles[file] = {
                path: file,
                name: this.extractPageName(file)
            };
        });
    }

    /**
     * Extract a display-friendly name from file path
     */
    extractPageName(filePath) {
        const parts = filePath.split('/').filter(p => p);
        const fileName = parts[parts.length - 1];
        
        if (fileName === 'index.html' || fileName === 'home.html') {
            if (parts.length === 1) return 'Home';
            return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        }
        
        return fileName.replace('.html', '').charAt(0).toUpperCase() + fileName.replace('.html', '').slice(1);
    }

    /**
     * Generate SHA-256 hash of content
     */
    async generateHash(content) {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(content);
            const hashBuffer = await crypto.subtle.digest("SHA-256", data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        } catch (error) {
            console.error("Error generating hash:", error);
            return null;
        }
    }

    /**
     * Fetch a file and generate its checksum
     */
    async getFileChecksum(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) return null;
            const content = await response.text();
            return await this.generateHash(content);
        } catch (error) {
            console.warn(`Error fetching ${filePath}:`, error);
            return null;
        }
    }

    /**
     * Check all monitored files for updates
     */
    async checkForUpdates() {
        const updatedPages = [];

        for (const [filePath, fileData] of Object.entries(this.allFiles)) {
            const newChecksum = await this.getFileChecksum(filePath);

            if (!newChecksum) continue;

            const oldChecksum = this.checksums[filePath];

            // If checksum changed or is new, file was updated
            if (oldChecksum !== newChecksum) {
                updatedPages.push({
                    path: filePath,
                    name: fileData.name,
                    displayName: fileData.name,
                    lastUpdated: new Date(),
                    checksum: newChecksum
                });

                this.checksums[filePath] = newChecksum;
            }
        }

        // Save updated checksums
        this.saveChecksumsToCache();

        // Trigger callback if pages were updated
        if (updatedPages.length > 0 && this.updateCallback) {
            this.updateCallback(updatedPages);
        }

        return updatedPages;
    }

    /**
     * Get the most recently updated files
     */
    async getRecentlyUpdatedPages() {
        const recent = Object.entries(this.checksums)
            .map(([path, checksum]) => {
                const fileData = this.allFiles[path];
                return {
                    path: path,
                    name: fileData?.name || path,
                    displayName: fileData?.name || path,
                    checksum,
                    lastUpdated: new Date()
                };
            })
            .sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0))
            .slice(0, this.config.maxItems);

        return recent;
    }

    /**
     * Register a callback for when updates are detected
     */
    onUpdate(callback) {
        this.updateCallback = callback;
    }

    /**
     * Format date for display
     */
    formatDate(date) {
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return "Just now";
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        
        return date.toLocaleDateString();
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Apply theme to CSS variables
 */
function applyTheme(themeConfig) {
    const root = document.documentElement;
    const colors = themeConfig.colors;
    const radius = themeConfig.borderRadius;
    const shadows = themeConfig.shadows;
    const transitions = themeConfig.transitions;

    root.style.setProperty("--bg-1", colors.bg1);
    root.style.setProperty("--bg-2", colors.bg2);
    root.style.setProperty("--text-1", colors.text1);
    root.style.setProperty("--text-2", colors.text2);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--accent-2", colors.accent2);
    root.style.setProperty("--glass-bg", colors.glassBackground);
    root.style.setProperty("--glass-border", colors.glassBorder);
    root.style.setProperty("--glass-inner", colors.glassInner);

    root.style.setProperty("--radius-lg", radius.lg);
    root.style.setProperty("--radius-md", radius.md);
    root.style.setProperty("--radius-sm", radius.sm);

    root.style.setProperty("--shadow-1", shadows.shadow1);
    root.style.setProperty("--shadow-2", shadows.shadow2);

    root.style.setProperty("--transition-fast", transitions.fast);
    root.style.setProperty("--transition-slow", transitions.slow);
}

/**
 * Generate main navigation HTML
 */
function generateNavigation(navConfig) {
    const navContainer = document.getElementById("main-nav-buttons");
    if (!navContainer) return;

    navContainer.innerHTML = navConfig.items
        .map(item => `
            <a href="${item.href}" class="btn btn-lg btn-secondary glass" title="${item.tooltip}">
                ${item.icon ? `<img src="${item.icon}" alt="${item.label}" class="nav-icon" style="width: 20px; height: 20px;">` : ''}
                <span>${item.label}</span>
            </a>
        `)
        .join("");
}

/**
 * Generate workshop section
 */
function generateWorkshopSection(workshopConfig) {
    if (!workshopConfig.enabled) return;

    const workshopContent = document.querySelector(".workshop-content");
    if (!workshopContent) return;

    const actionsHTML = workshopConfig.actions
        .map(action => `
            <a href="${action.href}" class="workshop-btn has-tooltip" title="${action.tooltip}">
                <img src="${action.icon}" alt="${action.label}" class="btn-icon">
                <div class="card-tooltip">${action.label}</div>
            </a>
        `)
        .join("");

    workshopContent.innerHTML = `
        <div class="steam-avatar">
            <img src="${workshopConfig.avatar}" alt="${workshopConfig.avatarAlt}" class="steam-avatar-image">
            <div class="steam-avatar-border"></div>
        </div>
        <div class="workshop-text">
            <div class="workshop-title">${workshopConfig.username}</div>
            <div class="workshop-subtitle">${workshopConfig.platform}</div>
        </div>
        <div class="workshop-actions">
            ${actionsHTML}
        </div>
    `;
}

/**
 * Generate recently updated section with full details and button
 */
function generateRecentlyUpdatedSection(pages, updatedManager) {
    const container = document.getElementById("recently-updated-buttons");

    if (!container) return;

    if (pages.length === 0) {
        container.innerHTML = `
            <div style="width: 100%; text-align: center; color: var(--text-2); opacity: 0.7; padding: 20px;">
                <p style="margin: 0;">No recently updated pages yet. Check back soon!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = pages
        .map(page => `
            <div class="recently-updated-card">
                <div class="updated-card-info">
                    <div class="updated-card-name">${page.displayName || page.name}</div>
                    <div class="updated-card-path">${page.path}</div>
                    <div class="updated-card-time">Updated: ${updatedManager.formatDate(page.lastUpdated)}</div>
                </div>
                <div class="updated-card-actions">
                    <a href="${page.path}" class="updated-card-btn">View Page</a>
                </div>
            </div>
        `)
        .join("");
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Apply theme
    applyTheme(SITE_CONFIG.theme);

    // Generate navigation
    generateNavigation(SITE_CONFIG.navigation);

    // Generate workshop section
    generateWorkshopSection(SITE_CONFIG.workshop);

    // Initialize Recently Updated Manager
    const updatedManager = new RecentlyUpdatedManager(SITE_CONFIG);

    // Set callback to update UI
    updatedManager.onUpdate(async () => {
        const recentPages = await updatedManager.getRecentlyUpdatedPages();
        generateRecentlyUpdatedSection(recentPages, updatedManager);
    });

    // Initial render
    updatedManager.getRecentlyUpdatedPages().then(pages => {
        generateRecentlyUpdatedSection(pages, updatedManager);
    });
});

if (typeof module !== "undefined" && module.exports) {
    module.exports = { SITE_CONFIG, RecentlyUpdatedManager, applyTheme };
}