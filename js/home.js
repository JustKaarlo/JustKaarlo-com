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

/* GitHub Integration */

// Configuration: Replace these with your GitHub repository details
const GITHUB_OWNER = 'JustKaarlo';
const GITHUB_REPO = 'justkaarlo.com'; // Change this to your desired repo
const GITHUB_API_BASE = 'https://api.github.com';

let currentCommitData = null;

async function fetchLatestCommit() {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=1`);
        if (!response.ok) throw new Error('Failed to fetch commits');
        
        const commits = await response.json();
        if (!commits || commits.length === 0) throw new Error('No commits found');
        
        const commit = commits[0];
        currentCommitData = commit;
        
        // Update the UI
        updateGitHubUI(commit);
        
    } catch (error) {
        console.error('GitHub API Error:', error);
        document.getElementById('github-commit-message').textContent = 'GitHub Error';
        document.getElementById('github-timestamp').textContent = 'Unable to fetch commit data';
    }
}

function updateGitHubUI(commit) {
    const message = commit.commit.message.split('\n')[0]; // Get first line only
    const date = new Date(commit.commit.author.date);
    
    // Format date
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    let timeAgo;
    if (diffMins < 1) timeAgo = 'Just now';
    else if (diffMins < 60) timeAgo = `${diffMins}m ago`;
    else if (diffHours < 24) timeAgo = `${diffHours}h ago`;
    else if (diffDays < 30) timeAgo = `${diffDays}d ago`;
    else timeAgo = date.toLocaleDateString();
    
    document.getElementById('github-commit-message').textContent = message;
    document.getElementById('github-timestamp').textContent = timeAgo;
}

async function fetchCommitChanges(commitSha) {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits/${commitSha}`);
        if (!response.ok) throw new Error('Failed to fetch commit details');
        
        const commitDetails = await response.json();
        return commitDetails.files || [];
        
    } catch (error) {
        console.error('Error fetching commit changes:', error);
        return [];
    }
}

function getStatusLabel(status) {
    const labels = {
        'added': 'Added',
        'removed': 'Removed',
        'modified': 'Modified',
        'renamed': 'Renamed',
        'copied': 'Copied',
        'changed': 'Changed',
        'unchanged': 'Unchanged'
    };
    return labels[status] || status;
}

function getStatusClass(status) {
    const classes = {
        'added': 'status-added',
        'removed': 'status-removed',
        'modified': 'status-modified',
        'renamed': 'status-renamed',
        'copied': 'status-modified',
        'changed': 'status-modified',
        'unchanged': 'status-modified'
    };
    return classes[status] || 'status-modified';
}

function renderFileTree(files) {
    const fileTree = document.getElementById('github-file-tree');
    
    if (!files || files.length === 0) {
        fileTree.innerHTML = '<div class="github-error">No files changed in this commit</div>';
        return;
    }
    
    fileTree.innerHTML = '';
    
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'github-file-item';
        
        const status = getStatusLabel(file.status);
        const statusClass = getStatusClass(file.status);
        
        let content = `
            <span class="github-file-item-name">${file.filename}</span>
            <span class="github-file-item-status ${statusClass}">${status}</span>
        `;
        
        // Show previous filename if renamed
        if (file.status === 'renamed' && file.previous_filename) {
            content += `<div class="github-file-old-name">← ${file.previous_filename}</div>`;
        }
        
        // Show addition/deletion stats
        if (file.additions > 0 || file.deletions > 0) {
            content += `<div class="github-file-old-name">+${file.additions} −${file.deletions}</div>`;
        }
        
        fileItem.innerHTML = content;
        fileTree.appendChild(fileItem);
    });
}

// Modal functionality
const githubModal = document.getElementById('github-modal');
const githubOpenBtn = document.getElementById('github-open-modal');
const githubCloseBtn = document.getElementById('github-close-modal');

githubOpenBtn.addEventListener('click', async () => {
    if (!currentCommitData) return;
    
    // Show modal
    githubModal.classList.add('active');
    
    // Fetch and display file tree
    document.getElementById('github-file-tree').innerHTML = '<div class="github-loading">Loading file changes...</div>';
    const files = await fetchCommitChanges(currentCommitData.sha);
    renderFileTree(files);
});

githubCloseBtn.addEventListener('click', () => {
    githubModal.classList.remove('active');
});

// Close modal when clicking outside
githubModal.addEventListener('click', (e) => {
    if (e.target === githubModal) {
        githubModal.classList.remove('active');
    }
});

// Fetch latest commit on page load
window.addEventListener('load', fetchLatestCommit);

// Optional: Refresh every 5 minutes
setInterval(fetchLatestCommit, 5 * 60 * 1000);