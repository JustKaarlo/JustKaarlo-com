// Configuration
const DEFAULT_OWNER = "JustKaarlo";
const DEFAULT_REPO = "JustKaarlo-Google-Site";
const DEFAULT_BRANCH = "Home";
const AUTH_TOKEN = ""; // Add your GitHub token here for private repos

// DOM Elements
const ownerEl = document.getElementById("owner");
const repoEl = document.getElementById("repo");
const branchEl = document.getElementById("branch");
const loadBtn = document.getElementById("loadBtn");
const statusEl = document.getElementById("status");
const treeEl = document.getElementById("fileList");

// Initialize default values
ownerEl.value = DEFAULT_OWNER;
repoEl.value = DEFAULT_REPO;
branchEl.value = DEFAULT_BRANCH;

// Event listeners
loadBtn.addEventListener("click", () => {
    const owner = ownerEl.value.trim();
    const repo = repoEl.value.trim();
    const branch = branchEl.value.trim();
    loadRepository(owner, repo, branch);
});

// Auto-load on page load if defaults are set
window.addEventListener("DOMContentLoaded", () => {
    if (DEFAULT_OWNER && DEFAULT_REPO && DEFAULT_BRANCH) {
        loadRepository(DEFAULT_OWNER, DEFAULT_REPO, DEFAULT_BRANCH);
    }
});

// Utility functions from original code
const formatBytes = (() => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    return (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
    };
})();

const colorCache = new Map();

function rgbToHsl(r, g, b) {
    const key = `${r},${g},${b}`;
    if (colorCache.has(key)) return colorCache.get(key);

    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    const result = { h, s, l };
    colorCache.set(key, result);
    return result;
}

function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
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
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function adjustLightness({ r, g, b }, delta = 0.15) {
    const { h, s, l } = rgbToHsl(r, g, b);
    const nl = Math.max(0, Math.min(1, l + delta));
    return hslToRgb(h, s, nl);
}

function getAverageColorFromImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            try {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d", { willReadFrequently: true });
                canvas.width = canvas.height = 24;
                ctx.drawImage(img, 0, 0, 24, 24);
                const { data } = ctx.getImageData(0, 0, 24, 24);
                let r = 0, g = 0, b = 0, count = 0;

                for (let i = 0; i < data.length; i += 8) {
                    if (data[i + 3] < 64) continue;
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                    count++;
                }
                if (!count) return reject("no_pixels");
                resolve({
                    r: Math.round(r / count),
                    g: Math.round(g / count),
                    b: Math.round(b / count)
                });
            } catch (e) {
                reject(e);
            }
        };
        img.onerror = () => reject("load_error");
        img.src = src;
    });
}

function applyGradientToItemFromSrc(li, src) {
    getAverageColorFromImage(src).then(base => {
        const light = adjustLightness(base, +0.18);
        const dark = adjustLightness(base, -0.18);
        li.style.backgroundImage = `linear-gradient(135deg, rgba(${light.r},${light.g},${light.b},0.18) 0%, rgba(${dark.r},${dark.g},${dark.b},0.35) 100%)`;
        li.style.border = `1px solid rgba(${dark.r},${dark.g},${dark.b},0.22)`;
    }).catch(() => {
        li.style.backgroundImage = `linear-gradient(135deg, rgba(120,120,120,0.12), rgba(60,60,60,0.24))`;
        li.style.border = `1px solid rgba(255,255,255,0.05)`;
    });
}

function add3DHoverEffect(element) {
    let animationId;
    
    element.addEventListener('mousemove', (e) => {
        if (animationId) return;
        
        animationId = requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const midX = rect.width / 2;
            const midY = rect.height / 2;

            const rotateX = ((y - midY) / midY) * 2;
            const rotateY = ((x - midX) / midX) * 2;

            element.style.transform = `translateX(1.5px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            animationId = null;
        });
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateX(0px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
}

// Repository loading functionality
async function loadRepository(owner, repo, branch) {
    if (!owner || !repo || !branch) {
        setStatus("Please enter owner, repository, and branch.");
        return;
    }

    setStatus(`Fetching repository tree <span class="spinner"></span>`);
    treeEl.innerHTML = "";

    try {
        const headers = { "Accept": "application/vnd.github+json" };
        if (AUTH_TOKEN) {
            headers.Authorization = `Bearer ${AUTH_TOKEN}`;
        }

        // Get branch reference
        const refRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${encodeURIComponent(branch)}`, { headers });
        if (!refRes.ok) {
            throw await apiError(refRes, "Failed to resolve branch");
        }
        
        const refData = await refRes.json();
        const commitSha = refData.object?.sha || refData.sha || null;
        
        if (!commitSha) {
            throw new Error("Could not resolve branch commit SHA.");
        }

        // Get repository tree
        const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${commitSha}?recursive=1`, { headers });
        if (!treeRes.ok) {
            throw await apiError(treeRes, "Failed to fetch repository tree");
        }
        
        const treeData = await treeRes.json();
        const nodes = treeData.tree || [];

        // Build tree structure
        const root = { children: new Map() };
        for (const item of nodes) {
            const parts = item.path.split("/");
            insertNode(root, parts, item.type, item.size || 0);
        }

        // Render tree
        const ul = document.createElement("ul");
        ul.className = "tree";
        renderNode(root, ul, { owner, repo, branch });
        treeEl.appendChild(ul);

        setStatus(`Successfully indexed ${nodes.length} items from repository.`);
    } catch (err) {
        setStatus("Error: " + err.message);
        console.error("Repository loading error:", err);
    }
}

function insertNode(node, parts, type, size = 0) {
    if (parts.length === 0) return;
    
    const [head, ...rest] = parts;
    
    if (!node.children.has(head)) {
        node.children.set(head, {
            name: head,
            type: rest.length ? "tree" : type,
            size: rest.length ? 0 : size,
            children: new Map()
        });
    }
    
    if (rest.length) {
        insertNode(node.children.get(head), rest, type, size);
    }
}

function renderNode(node, parent, ctx, basePath = "") {
    // Sort entries: folders first, then files, both alphabetically
    const entries = [...node.children].sort(sortEntries);
    
    for (const [name, child] of entries) {
        const path = basePath ? `${basePath}/${name}` : name;
        
        if (child.type === "tree") {
            const li = document.createElement("li");
            
            const details = document.createElement("details");
            details.className = "folder";
            
            const summary = document.createElement("summary");
            
            const caret = document.createElement("span");
            caret.className = "caret";
            
            const nameSpan = document.createElement("span");
            nameSpan.className = "name";
            nameSpan.textContent = name;
            
            // Add folder icon
            const icon = document.createElement("img");
            icon.src = "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder";
            icon.alt = "";
            icon.style.height = "16px";
            icon.style.marginRight = "6px";
            
            // Count items in folder
            const itemCount = countItemsInFolder(child);
            const countTag = document.createElement("span");
            countTag.className = "file-count-tag";
            countTag.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
            countTag.style.marginLeft = "auto";
            countTag.style.marginRight = "8px";
            
            summary.append(caret, icon, nameSpan, countTag);
            details.appendChild(summary);
            
            const ul = document.createElement("ul");
            ul.className = "tree";
            
            // Lazy load folder contents
            details.addEventListener("toggle", () => {
                if (details.open && ul.children.length === 0) {
                    renderNode(child, ul, ctx, path);
                }
            });
            
            details.appendChild(ul);
            li.appendChild(details);
            parent.appendChild(li);
        } else {
            // Render file
            const li = document.createElement("li");
            li.className = "file";
            
            const caret = document.createElement("span");
            caret.className = "caret";
            
            // File icon based on extension
            const icon = document.createElement("img");
            icon.src = getFileIcon(name);
            icon.alt = "";
            icon.style.height = "16px";
            icon.style.marginRight = "6px";
            
            const nameSpan = document.createElement("span");
            nameSpan.className = "name";
            nameSpan.textContent = name;
            
            const links = document.createElement("span");
            links.className = "links";
            
            // GitHub view link
            const ghLink = document.createElement("a");
            ghLink.href = `https://github.com/${ctx.owner}/${ctx.repo}/blob/${encodeURIComponent(ctx.branch)}/${encodeURIComponent(path)}`;
            ghLink.textContent = "view";
            ghLink.target = "_blank";
            ghLink.rel = "noopener";
            
            // Raw file link
            const rawLink = document.createElement("a");
            rawLink.href = `https://raw.githubusercontent.com/${ctx.owner}/${ctx.repo}/${encodeURIComponent(ctx.branch)}/${encodeURIComponent(path)}`;
            rawLink.textContent = "raw";
            rawLink.target = "_blank";
            rawLink.rel = "noopener";
            
            // File size if available
            if (child.size > 0) {
                const sizeTag = document.createElement("span");
                sizeTag.className = "file-size-tag";
                sizeTag.textContent = formatBytes(child.size);
                sizeTag.style.marginLeft = "auto";
                sizeTag.style.marginRight = "8px";
                links.appendChild(sizeTag);
            }
            
            links.append(ghLink, rawLink);
            
            li.append(caret, icon, nameSpan, links);
            parent.appendChild(li);
        }
    }
}

function countItemsInFolder(folderNode) {
    let count = 0;
    for (const [, child] of folderNode.children) {
        if (child.type === "tree") {
            count += countItemsInFolder(child);
        } else {
            count++;
        }
    }
    return count;
}

function getFileIcon(filename) {
    const ext = filename.split('.').pop()?.toLowerCase();
    
    const iconMap = {
        'html': 'https://cdn-icons-png.flaticon.com/256/11133/11133898.png',
        'css': 'https://cdn-icons-png.flaticon.com/256/732/732190.png',
        'js': 'https://cdn-icons-png.flaticon.com/256/5968/5968292.png',
        'json': 'https://cdn-icons-png.flaticon.com/256/136/136525.png',
        'md': 'https://cdn-icons-png.flaticon.com/256/11516/11516361.png',
        'txt': 'https://cdn-icons-png.flaticon.com/256/136/136538.png',
        'png': 'https://cdn-icons-png.flaticon.com/256/136/136523.png',
        'jpg': 'https://cdn-icons-png.flaticon.com/256/136/136523.png',
        'jpeg': 'https://cdn-icons-png.flaticon.com/256/136/136523.png',
        'gif': 'https://cdn-icons-png.flaticon.com/256/136/136523.png',
        'svg': 'https://cdn-icons-png.flaticon.com/256/136/136523.png',
        'pdf': 'https://cdn-icons-png.flaticon.com/256/136/136522.png',
        'zip': 'https://cdn-icons-png.flaticon.com/256/136/136544.png',
        'py': 'https://cdn-icons-png.flaticon.com/256/5968/5968350.png',
        'java': 'https://cdn-icons-png.flaticon.com/256/5968/5968282.png',
        'cpp': 'https://cdn-icons-png.flaticon.com/256/6132/6132222.png',
        'c': 'https://cdn-icons-png.flaticon.com/256/6132/6132222.png'
    };
    
    return iconMap[ext] || 'https://cdn-icons-png.flaticon.com/256/136/136538.png';
}

function sortEntries([aName, a], [bName, b]) {
    // Folders first, then files
    if (a.type !== b.type) {
        return a.type === "tree" ? -1 : 1;
    }
    // Then alphabetically
    return aName.localeCompare(bName, undefined, { numeric: true });
}

async function apiError(res, prefix) {
    let msg = `${prefix}. HTTP ${res.status}`;
    try {
        const json = await res.json();
        if (json.message) {
            msg += " · " + json.message;
        }
    } catch {
        // Ignore JSON parsing errors
    }
    return new Error(msg);
}

function setStatus(html) {
    statusEl.innerHTML = html;
}