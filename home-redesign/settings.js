// ============================================================================
// SETTINGS.JS - Centralized Configuration for JustKaarlo.com
// ============================================================================

const SITE_CONFIG = {
    site: {
        title: "JustKaarlo",
        domain: "justkaarlo.com",
        author: "JustKaarlo",
        defaultLanguage: "en",
    },

    github: {
        enabled: true,
        owner: "JustKaarlo",
        repo: "JustKaarlo.com",
        branch: "main",
        apiBaseUrl: "https://api.github.com",
        token: null
    },

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

    recentlyUpdated: {
        enabled: true,
        title: "Latest",
        maxItems: 6,
        autoRefresh: true,
        refreshInterval: 600000,
        cacheKey: "recentlyUpdatedCommits"
    },

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

    logoCard: {
        selector: ".logo-card",
        image: "https://www.justkaarlo.com/res/src/header-cards/header-home.svg",
        enableMouseTracking: true,
        rotationSensitivity: 150,
        hoverScale: 0.98,
        normalScale: 1,
        filter: "brightness(1.2)"
    },

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

    performance: {
        enableLazyLoading: true,
        enableImageOptimization: true,
        cacheStrategy: "aggressive",
        prefetchLinks: true
    }
};

// ============================================================================
// GITHUB COMMITS MANAGER
// ============================================================================

class GitHubCommitsManager {
    constructor(config) {
        this.config = config.github;
        this.recentlyUpdatedConfig = config.recentlyUpdated;
        this.apiBaseUrl = config.github.apiBaseUrl;
        this.commits = [];
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
            console.error("Error fetching commits:", error);
            return [];
        }
    }

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

    getStatusBadge(status) {
        const badges = {
            'added': { color: '#4ade80', label: 'Added' },
            'removed': { color: '#f87171', label: 'Removed' },
            'modified': { color: '#60a5fa', label: 'Modified' },
            'renamed': { color: '#fbbf24', label: 'Renamed' }
        };
        return badges[status] || { color: '#9ca3af', label: 'Changed' };
    }

    onUpdate(callback) {
        this.updateCallback = callback;
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

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

function generateRecentlyUpdatedSection(commits, commitsManager) {
    const container = document.getElementById("recently-updated-buttons");

    if (!container) return;

    if (commits.length === 0) {
        container.innerHTML = `
            <div class="recently-updated-card" style="text-align: center; color: var(--text-2); opacity: 0.7; padding: 20px;">
                <p style="margin: 0;">No commits found. Check your GitHub repository.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = commits
        .map((commit) => {
            const commitData = commit.commit;
            const shortSha = commit.sha.substring(0, 7);
            const author = commitData.author?.name || 'Unknown';
            const date = commitsManager.formatDate(commitData.author?.date);
            const message = commitData.message.split('\n')[0];
            const commitUrl = commit.html_url;

            return `
                <div class="recently-updated-card">
                    <div class="updated-card-header">
                        <div class="updated-card-info">
                            <div class="updated-card-name">${escapeHtml(message)}</div>
                            <div class="updated-card-meta">
                                <span><strong>By:</strong> ${escapeHtml(author)}</span> • 
                                <span><strong>SHA:</strong> ${shortSha}</span>
                            </div>
                            <div class="updated-card-time">Updated: ${date}</div>
                        </div>
                        <div class="updated-card-actions">
                            <button class="updated-card-btn changelog-btn" data-commit-sha="${commit.sha}" title="View Changelog">
                                📝 Changelog
                            </button>
                            <a href="${commitUrl}" class="updated-card-btn" target="_blank" rel="noopener noreferrer" title="View on GitHub">
                                🔗 GitHub
                            </a>
                        </div>
                    </div>
                    <div class="file-tree" id="tree-${shortSha}"></div>
                </div>
            `;
        })
        .join("");

    // Add click handlers to changelog buttons
    document.querySelectorAll('.changelog-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const commitSha = btn.dataset.commitSha;
            
            btn.textContent = '⏳ Loading...';
            btn.disabled = true;

            const commitDetails = await commitsManager.getCommitDetails(commitSha);
            if (commitDetails) {
                showChangelogModal(commitDetails, commitsManager);
            }

            btn.textContent = '📝 Changelog';
            btn.disabled = false;
        });
    });

    // Populate file trees
    commits.forEach(commit => {
        const shortSha = commit.sha.substring(0, 7);
        const treeContainer = document.getElementById(`tree-${shortSha}`);
        if (treeContainer && commit.files) {
            populateFileTree(treeContainer, commit.files, commitsManager);
        }
    });
}

function populateFileTree(container, files, commitsManager) {
    const filesHTML = files.map(file => {
        const icon = commitsManager.getFileIcon(file.filename);
        const status = commitsManager.getStatusBadge(file.status);
        const changes = file.changes || 0;
        const fileName = file.filename.split('/').pop();
        const filePath = file.filename;

        return `
            <div class="file-tree-item">
                <span class="file-tree-icon">${icon}</span>
                <span class="file-tree-name">${escapeHtml(fileName)}</span>
                <span class="file-tree-changes" title="Total changes (additions + deletions)">${changes}</span>
                <span class="file-tree-status status-${file.status}">${status.label}</span>
            </div>
        `;
    }).join('');

    container.innerHTML = filesHTML;
}

function showChangelogModal(commitData, commitsManager) {
    const modal = document.getElementById('changelog-modal');
    if (!modal) {
        console.error('Modal not found');
        return;
    }

    const commitMessage = commitData.commit.message;
    const author = commitData.commit.author?.name || 'Unknown';
    const date = commitsManager.formatDate(commitData.commit.author?.date);
    const shortSha = commitData.sha.substring(0, 7);
    const files = commitData.files || [];

    // Filter HTML pages
    const htmlPages = files.filter(f => f.filename.endsWith('.html'));
    
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
            const lines = file.patch.split('\n').slice(0, 8).join('\n');
            patchPreview = `<div class="changelog-file-patch"><pre>${escapeHtml(lines)}</pre></div>`;
        }

        return `
            <div class="changelog-file-item">
                <div class="changelog-file-header">
                    <span class="changelog-file-icon">${icon}</span>
                    <span class="changelog-file-name">${escapeHtml(file.filename)}</span>
                    <span class="changelog-file-status" style="background-color: ${status.color}20; border: 1px solid ${status.color}; color: ${status.color};">
                        ${status.label}
                    </span>
                </div>
                ${file.changes ? `<div class="changelog-file-changes">${changes}</div>` : ''}
                ${patchPreview}
            </div>
        `;
    }).join('');

    // Build pages grid
    const pagesHTML = htmlPages.length > 0 ? htmlPages.map(page => {
        const pagePath = page.filename;
        return `
            <a href="${pagePath}" class="page-btn" title="Visit ${pagePath}">
                🌐 ${pagePath.split('/').pop()}
            </a>
        `;
    }).join('') : '<p style="color: var(--text-2); opacity: 0.7;">No HTML pages modified in this commit.</p>';

    const modalContent = `
        <div class="changelog-header">
            <h2>Changelog</h2>
            <button class="modal-close-btn" onclick="closeChangelogModal()">&times;</button>
        </div>

        <div class="changelog-info">
            <div class="changelog-info-item">
                <strong>Commit:</strong>
                <span>${shortSha}</span>
            </div>
            <div class="changelog-info-item">
                <strong>Author:</strong>
                <span>${escapeHtml(author)}</span>
            </div>
            <div class="changelog-info-item">
                <strong>Date:</strong>
                <span>${date}</span>
            </div>
        </div>

        <div class="changelog-message">${escapeHtml(commitMessage)}</div>

        ${htmlPages.length > 0 ? `
            <div class="changelog-pages">
                <h3>📄 Modified Pages (${htmlPages.length})</h3>
                <div class="pages-grid">
                    ${pagesHTML}
                </div>
            </div>
        ` : ''}

        <div class="changelog-files">
            <h3>📋 All Changes (${files.length} files)</h3>
            <div class="changelog-files-list">
                ${filesHTML}
            </div>
        </div>
    `;

    const contentContainer = document.querySelector('.changelog-modal-content');
    if (contentContainer) {
        contentContainer.innerHTML = modalContent;
    }

    modal.style.display = 'flex';
}

function closeChangelogModal() {
    const modal = document.getElementById('changelog-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

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
    applyTheme(SITE_CONFIG.theme);
    generateNavigation(SITE_CONFIG.navigation);
    generateWorkshopSection(SITE_CONFIG.workshop);

    const commitsManager = new GitHubCommitsManager(SITE_CONFIG);

    commitsManager.onUpdate((commits) => {
        generateRecentlyUpdatedSection(commits, commitsManager);
    });

    commitsManager.fetchLatestCommits();
});

if (typeof module !== "undefined" && module.exports) {
    module.exports = { SITE_CONFIG, GitHubCommitsManager };
}