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
    },

    // ========================================================================
    // GITHUB SETTINGS - FOR RECENT COMMITS
    // ========================================================================
    github: {
        enabled: true,
        owner: "JustKaarlo", // GitHub username or organization
        repo: "JustKaarlo.com", // Repository name
        branch: "main", // Default branch
        apiBaseUrl: "https://api.github.com",
        token: null // Leave null for public repos, add token if needed for private
    },

    // ========================================================================
    // MAIN NAVIGATION SETTINGS
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
    // RECENTLY UPDATED SECTION SETTINGS - FROM GITHUB COMMITS
    // ========================================================================
    recentlyUpdated: {
        enabled: true,
        title: "Latest",
        subtitle: "Pages That Was Recently Updated",
        maxItems: 5,
        autoRefresh: true,
        refreshInterval: 600000, // 10 minutes
        cacheKey: "recentlyUpdatedCommits"
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
// GITHUB COMMITS MANAGER - FETCHES LATEST COMMITS AND FILE CHANGES
// ============================================================================

class GitHubCommitsManager {
    constructor(config) {
        this.config = config.github;
        this.recentlyUpdatedConfig = config.recentlyUpdated;
        this.apiBaseUrl = config.github.apiBaseUrl;
        this.commits = [];
        this.selectedCommit = null;
        this.updateCallback = null;
        this.init();
    }

    init() {
        if (!this.config.enabled) return;
        this.fetchLatestCommits();

        if (this.recentlyUpdatedConfig.autoRefresh) {
            setInterval(() => this.fetchLatestCommits(), this.recentlyUpdatedConfig.refreshInterval);
        }
    }

    /**
     * Fetch latest commits from GitHub
     */
    async fetchLatestCommits() {
        try {
            const url = `${this.apiBaseUrl}/repos/${this.config.owner}/${this.config.repo}/commits?per_page=${this.recentlyUpdatedConfig.maxItems}`;
            
            const headers = {};
            if (this.config.token) {
                headers['Authorization'] = `token ${this.config.token}`;
            }

            const response = await fetch(url, { headers });

            if (!response.ok) {
                console.error(`GitHub API error: ${response.status}`);
                return;
            }

            const data = await response.json();
            this.commits = data;

            if (this.updateCallback) {
                this.updateCallback(this.commits);
            }

            return this.commits;
        } catch (error) {
            console.error("Error fetching commits from GitHub:", error);
            return [];
        }
    }

    /**
     * Get detailed information about a specific commit including file changes
     */
    async getCommitDetails(commitSha) {
        try {
            const url = `${this.apiBaseUrl}/repos/${this.config.owner}/${this.config.repo}/commits/${commitSha}`;
            
            const headers = {};
            if (this.config.token) {
                headers['Authorization'] = `token ${this.config.token}`;
            }

            const response = await fetch(url, { headers });

            if (!response.ok) {
                console.error(`GitHub API error: ${response.status}`);
                return null;
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching commit details:", error);
            return null;
        }
    }

    /**
     * Format date for display
     */
    formatDate(dateString) {
        const date = new Date(dateString);
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

    /**
     * Extract file extension for styling
     */
    getFileIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const iconMap = {
            'html': '🌐',
            'css': '🎨',
            'js': '⚙️',
            'json': '📋',
            'md': '📝',
            'png': '🖼️',
            'jpg': '🖼️',
            'gif': '🖼️',
            'svg': '🎭',
            'txt': '📄',
            'php': '🐘'
        };
        return iconMap[ext] || '📄';
    }

    /**
     * Get status badge style
     */
    getStatusBadge(status) {
        const badges = {
            'added': { color: '#4ade80', label: 'Added' },
            'removed': { color: '#f87171', label: 'Removed' },
            'modified': { color: '#60a5fa', label: 'Modified' },
            'renamed': { color: '#fbbf24', label: 'Renamed' }
        };
        return badges[status] || { color: '#9ca3af', label: 'Changed' };
    }

    /**
     * Register update callback
     */
    onUpdate(callback) {
        this.updateCallback = callback;
    }

    /**
     * Set selected commit for details view
     */
    selectCommit(commitSha) {
        this.selectedCommit = commitSha;
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
 * Generate recently updated section from GitHub commits
 */
function generateRecentlyUpdatedSection(commits, commitsManager) {
    const container = document.getElementById("recently-updated-buttons");

    if (!container) return;

    if (commits.length === 0) {
        container.innerHTML = `
            <div style="width: 100%; text-align: center; color: var(--text-2); opacity: 0.7; padding: 20px;">
                <p style="margin: 0;">No commits found. Check your GitHub repository.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = commits
        .map((commit, index) => {
            const commitData = commit.commit;
            const shortSha = commit.sha.substring(0, 7);
            const author = commitData.author?.name || 'Unknown';
            const date = commitsManager.formatDate(commitData.author?.date);
            const message = commitData.message.split('\n')[0];
            const commitUrl = commit.html_url;

            return `
                <div class="recently-updated-card">
                    <div class="updated-card-info">
                        <div class="updated-card-name">${escapeHtml(message)}</div>
                        <div class="updated-card-path">
                            <strong>By:</strong> ${escapeHtml(author)} • 
                            <strong>Commit:</strong> ${shortSha}
                        </div>
                        <div class="updated-card-time">Updated: ${date}</div>
                    </div>
                    <div class="updated-card-actions">
                        <button class="updated-card-btn details-btn" data-commit-sha="${commit.sha}">
                            View Details
                        </button>
                        <a href="${commitUrl}" class="updated-card-btn" target="_blank" rel="noopener noreferrer">
                            On GitHub
                        </a>
                    </div>
                </div>
            `;
        })
        .join("");

    // Add click handlers to details buttons
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const commitSha = btn.dataset.commitSha;
            
            btn.textContent = 'Loading...';
            btn.disabled = true;

            const commitDetails = await commitsManager.getCommitDetails(commitSha);
            if (commitDetails) {
                showCommitDetailsModal(commitDetails, commitsManager);
            }

            btn.textContent = 'View Details';
            btn.disabled = false;
        });
    });
}

/**
 * Show detailed commit changes in a modal
 */
function showCommitDetailsModal(commitData, commitsManager) {
    const modal = document.getElementById('commit-details-modal');
    if (!modal) {
        console.error('Modal not found');
        return;
    }

    const commitMessage = commitData.commit.message;
    const author = commitData.commit.author?.name || 'Unknown';
    const date = commitsManager.formatDate(commitData.commit.author?.date);
    const shortSha = commitData.sha.substring(0, 7);
    const files = commitData.files || [];

    // Calculate stats
    const stats = {
        added: files.filter(f => f.status === 'added').length,
        removed: files.filter(f => f.status === 'removed').length,
        modified: files.filter(f => f.status === 'modified').length,
        renamed: files.filter(f => f.status === 'renamed').length
    };

    // Build files HTML
    const filesHTML = files.map(file => {
        const icon = commitsManager.getFileIcon(file.filename);
        const status = commitsManager.getStatusBadge(file.status);
        const changes = file.changes ? `+${file.additions} -${file.deletions}` : '';

        let patchPreview = '';
        if (file.patch) {
            const lines = file.patch.split('\n').slice(0, 10).join('\n');
            patchPreview = `<div class="commit-file-patch"><pre>${escapeHtml(lines)}</pre></div>`;
        }

        return `
            <div class="commit-file-item">
                <div class="commit-file-header">
                    <span class="commit-file-icon">${icon}</span>
                    <span class="commit-file-name">${escapeHtml(file.filename)}</span>
                    <span class="commit-file-status" style="background-color: ${status.color}20; border: 1px solid ${status.color}; color: ${status.color};">
                        ${status.label}
                    </span>
                </div>
                ${file.changes ? `<div class="commit-file-changes">${changes}</div>` : ''}
                ${patchPreview}
            </div>
        `;
    }).join('');

    const modalContent = `
        <div class="commit-modal-header">
            <h2>Commit Details</h2>
            <button class="modal-close-btn" onclick="closeCommitDetailsModal()">&times;</button>
        </div>

        <div class="commit-modal-info">
            <div class="commit-info-item">
                <strong>Message:</strong>
                <p class="commit-message-text">${escapeHtml(commitMessage)}</p>
            </div>

            <div class="commit-info-item">
                <strong>Author:</strong> ${escapeHtml(author)}
            </div>

            <div class="commit-info-item">
                <strong>Commit:</strong> ${shortSha}
            </div>

            <div class="commit-info-item">
                <strong>Date:</strong> ${date}
            </div>
        </div>

        <div class="commit-stats">
            ${stats.added > 0 ? `<div class="stat-item added"><span>${stats.added}</span> Added</div>` : ''}
            ${stats.modified > 0 ? `<div class="stat-item modified"><span>${stats.modified}</span> Modified</div>` : ''}
            ${stats.removed > 0 ? `<div class="stat-item removed"><span>${stats.removed}</span> Removed</div>` : ''}
            ${stats.renamed > 0 ? `<div class="stat-item renamed"><span>${stats.renamed}</span> Renamed</div>` : ''}
        </div>

        <div class="commit-files">
            <h3>Changed Files (${files.length})</h3>
            <div class="commit-files-list">
                ${filesHTML}
            </div>
        </div>
    `;

    const contentContainer = document.querySelector('.commit-modal-content');
    if (contentContainer) {
        contentContainer.innerHTML = modalContent;
    }

    modal.style.display = 'flex';
}

/**
 * Close the commit details modal
 */
function closeCommitDetailsModal() {
    const modal = document.getElementById('commit-details-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
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

    // Initialize GitHub Commits Manager
    const commitsManager = new GitHubCommitsManager(SITE_CONFIG);

    // Set callback to update UI
    commitsManager.onUpdate((commits) => {
        generateRecentlyUpdatedSection(commits, commitsManager);
    });

    // Initial fetch
    commitsManager.fetchLatestCommits();
});

if (typeof module !== "undefined" && module.exports) {
    module.exports = { SITE_CONFIG, GitHubCommitsManager };
}