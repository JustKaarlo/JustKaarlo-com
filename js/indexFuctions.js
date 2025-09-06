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

function calculateFolderStats(folder) {
    let fileCount = 0;
    let totalSize = 0;

    function countItems(items) {
        items?.forEach(item => {
            if (item.type === 'file') {
                fileCount++;
                totalSize += item.size || 0;
            } else if (item.type === 'folder' && item.files) {
                countItems(item.files);
            }
        });
    }

    countItems(folder.files);
    return { fileCount, totalSize };
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

function createFileElement(file) {
    const li = document.createElement("li");

    if (file.highlighted) li.classList.add("highlighted");
    if (file.showSizeTag === false) li.classList.add("hide-size-tag");

    const link = document.createElement("a");
    link.href = file.openUrl || "#";
    if (file.openUrl) link.target = "_blank";
    else link.onclick = e => e.preventDefault();

    add3DHoverEffect(link);

    const icon = document.createElement("img");
    icon.src = file.icon || "https://drive-thirdparty.googleusercontent.com/16/type/application/x-msdownload";
    icon.alt = "";
    icon.loading = "lazy";

    link.append(icon, document.createTextNode(file.name));

    const fileEntry = document.createElement("div");
    fileEntry.className = "file-entry";
    fileEntry.appendChild(link);

    if (file.showSizeTag !== false && file.size) {
        const sizeTag = document.createElement("span");
        sizeTag.className = "file-size-tag";
        sizeTag.textContent = formatBytes(file.size);
        fileEntry.appendChild(sizeTag);
    }

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";

    if (file.showOpenButton && file.openUrl) {
        const openBtn = document.createElement("button");
        openBtn.className = "folder-open-button";
        openBtn.onclick = () => window.open(file.openUrl, "_blank");
        openBtn.innerHTML = `
                    <span class="custom-tooltip">View</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z" fill="rgba(255, 255, 255, 0.35)"/>
                    </svg>
                `;
        buttonGroup.appendChild(openBtn);
    }

    if (file.showRawButton && file.rawUrl) {
        const rawBtn = document.createElement("button");
        rawBtn.className = "folder-raw-button";
        rawBtn.onclick = () => window.open(file.rawUrl, "_blank");
        rawBtn.innerHTML = `
                    <span class="custom-tooltip">Raw Data</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm2-8h8v1H8v-1zm0 2h8v1H8v-1zm0 2h5v1H8v-1z" fill="rgba(255, 255, 255, 0.35)"/>
                    </svg>
                `;
        buttonGroup.appendChild(rawBtn);
    }

    if (buttonGroup.children.length > 0) {
        fileEntry.appendChild(buttonGroup);
    }

    li.appendChild(fileEntry);

    if (file.highlighted) {
        requestIdleCallback(() => applyGradientToItemFromSrc(li, icon.src));
    }

    return li;
}

function createFolderElement(folder, depth = 0) {
    const li = document.createElement("li");

    if (folder.highlighted) {
        li.classList.add("highlighted");
    }

    if (folder.showSizeTag === false) {
        li.classList.add("hide-size-tag");
    }
    if (folder.showCountTag === false) {
        li.classList.add("hide-count-tag");
    }

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
    icon.src = folder.icon || "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder";
    icon.alt = "";
    icon.style.height = "20px";
    icon.style.verticalAlign = "middle";
    icon.style.marginRight = "8px";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = folder.name;

    // Add 3D hover effects to folder name
    nameSpan.style.display = 'inline-block';
    nameSpan.style.transformStyle = 'preserve-3d';
    nameSpan.style.transition = 'transform 0.2s ease';

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

    leftWrapper.appendChild(arrow);
    leftWrapper.appendChild(icon);
    leftWrapper.appendChild(nameSpan);

    const rightWrapper = document.createElement("div");
    rightWrapper.style.display = "flex";
    rightWrapper.style.alignItems = "center";
    rightWrapper.style.gap = "1px";

    // Calculate folder stats
    const { fileCount, totalSize } = calculateFolderStats(folder);

    // Add count tag if enabled
    if (folder.showCountTag !== false) {
        const countTag = document.createElement("span");
        countTag.className = "file-count-tag";
        countTag.textContent = `${fileCount} File${fileCount !== 1 ? "s" : ""}`;
        rightWrapper.appendChild(countTag);
    }

    // Add size tag if enabled
    if (folder.showSizeTag !== false) {
        const sizeTag = document.createElement("span");
        sizeTag.className = "file-size-tag";
        sizeTag.textContent = formatBytes(totalSize);
        rightWrapper.appendChild(sizeTag);
    }

    // Add button group for folders
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";

    // Add open button if enabled
    if (folder.showOpenButton && folder.openUrl) {
        const openBtn = document.createElement("button");
        openBtn.className = "folder-open-button";
        openBtn.onclick = (e) => {
            e.stopPropagation();
            window.open(folder.openUrl, "_blank");
        };

        const openTooltip = document.createElement("span");
        openTooltip.className = "custom-tooltip";
        openTooltip.textContent = "View";
        openBtn.appendChild(openTooltip);

        const openIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        openIcon.setAttribute("width", "16");
        openIcon.setAttribute("height", "16");
        openIcon.setAttribute("viewBox", "0 0 24 24");
        openIcon.setAttribute("fill", "none");
        openIcon.classList.add("icon-animated");

        const openPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        openPath.setAttribute("d", "M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z");
        openPath.setAttribute("fill", "rgba(255, 255, 255, 0.35)");
        openPath.setAttribute("class", "open-part");

        openIcon.appendChild(openPath);
        openBtn.appendChild(openIcon);
        buttonGroup.appendChild(openBtn);
    }

    // Add raw button if enabled
    if (folder.showRawButton && folder.rawUrl) {
        const rawBtn = document.createElement("button");
        rawBtn.className = "folder-raw-button";
        rawBtn.onclick = (e) => {
            e.stopPropagation();
            window.open(folder.rawUrl, "_blank");
        };

        const rawTooltip = document.createElement("span");
        rawTooltip.className = "custom-tooltip";
        rawTooltip.textContent = "Raw Data";
        rawBtn.appendChild(rawTooltip);

        const rawIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        rawIcon.setAttribute("width", "16");
        rawIcon.setAttribute("height", "16");
        rawIcon.setAttribute("viewBox", "0 0 24 24");
        rawIcon.setAttribute("fill", "none");
        rawIcon.classList.add("icon-animated");

        const rawPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        rawPath.setAttribute("d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm2-8h8v1H8v-1zm0 2h8v1H8v-1zm0 2h5v1H8v-1z");
        rawPath.setAttribute("fill", "rgba(255, 255, 255, 0.35)");
        rawPath.setAttribute("class", "raw-part");

        rawIcon.appendChild(rawPath);
        rawBtn.appendChild(rawIcon);
        buttonGroup.appendChild(rawBtn);
    }

    if (buttonGroup.children.length > 0) {
        rightWrapper.appendChild(buttonGroup);
    }

    folderLink.appendChild(leftWrapper);
    folderLink.appendChild(rightWrapper);
    li.appendChild(folderLink);

    // Apply gradient based on icon color for highlighted folders
    if (folder.highlighted) {
        applyGradientToItemFromSrc(li, icon.src);
    }

    // Create sub-list for folder contents
    const subList = document.createElement("ul");
    subList.className = "sub-list";
    subList.style.display = "none";
    li.appendChild(subList);

    // Add click handler to toggle folder
    folderLink.addEventListener("click", () => {
        if (subList.childElementCount === 0 && folder.files) {
            // Populate folder contents recursively
            renderItems(folder.files, subList, depth + 1);
        }
        const isOpen = subList.style.display === "block";
        subList.style.display = isOpen ? "none" : "block";
        arrow.classList.toggle("open", !isOpen);
        li.classList.toggle("folder-open", !isOpen);
    });

    return li;
}

function renderItems(items, container, depth = 0) {
    // Separate files and folders
    const files = items.filter(item => item.type === "file");
    const folders = items.filter(item => item.type === "folder");

    // Sort files (highlighted first, then alphabetical)
    files.sort((a, b) => {
        if (a.highlighted && !b.highlighted) return -1;
        if (!a.highlighted && b.highlighted) return 1;
        return a.name.localeCompare(b.name, undefined, { numeric: true });
    });

    // Sort folders (highlighted first, then alphabetical)
    folders.sort((a, b) => {
        if (a.highlighted && !b.highlighted) return -1;
        if (!a.highlighted && b.highlighted) return 1;
        return a.name.localeCompare(b.name, undefined, { numeric: true });
    });

    // Render files first
    files.forEach(file => {
        const fileElement = createFileElement(file, depth);
        container.appendChild(fileElement);
    });

    // Then render folders
    folders.forEach(folder => {
        const folderElement = createFolderElement(folder, depth);
        container.appendChild(folderElement);
    });
}

function renderFileStructure() {
    const container = document.getElementById("fileList");
    container.innerHTML = "";
    renderItems(fileStructure, container, 0);
}

// Initialize the file browser
renderFileStructure();