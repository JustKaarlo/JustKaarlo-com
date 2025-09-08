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

            downloadBtn.onclick = () => {
                // Overlay container
                const overlay = document.createElement("div");
                overlay.style.position = "fixed";
                overlay.style.top = 0;
                overlay.style.left = 0;
                overlay.style.width = "100%";
                overlay.style.height = "100%";
                overlay.style.background = "rgba(30, 30, 30, 0.95)";
                overlay.style.display = "flex";
                overlay.style.alignItems = "center";
                overlay.style.justifyContent = "center";
                overlay.style.zIndex = "9999";
                overlay.style.opacity = "0";
                overlay.style.transition = "opacity 0.3s ease";

                // Inner card
                const card = document.createElement("div");
                card.style.background = "#1e1e1e";
                card.style.padding = "30px 40px";
                card.style.borderRadius = "12px";
                card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.6)";
                card.style.textAlign = "center";
                card.style.color = "#eee";
                card.style.fontFamily = "Arial, sans-serif";

                // Spinner
                const spinner = document.createElement("div");
                spinner.style.margin = "0 auto 20px auto";
                spinner.style.width = "50px";
                spinner.style.height = "50px";
                spinner.style.border = "6px solid rgba(255,255,255,0.2)";
                spinner.style.borderTop = "6px solid #fff";
                spinner.style.borderRadius = "50%";
                spinner.style.animation = "spin 1s linear infinite";

                // Keyframes for spinner
                const style = document.createElement("style");
                style.textContent = `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                `;
                document.head.appendChild(style);

                // Text
                const text = document.createElement("div");
                text.innerText = "Preparing your download...";
                text.style.fontSize = "1.2em";
                text.style.letterSpacing = "0.5px";

                // Build card
                card.appendChild(spinner);
                card.appendChild(text);
                overlay.appendChild(card);
                document.body.appendChild(overlay);

                // Fade in overlay
                requestAnimationFrame(() => {
                    overlay.style.opacity = "1";
                });

                // Trigger download
                const url = `http://app.justkaarlo.com/download/${file.id}`;
                const link = document.createElement("a");
                link.href = url;
                link.download = "";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setTimeout(() => {
                    overlay.style.opacity = "0";
                    setTimeout(() => overlay.remove(), 300);
                }, 15000);
            };

            // downloadBtn.onclick = () => {
            //     const customLink = customDownloadLinks[file.id] || customDownloadLinks[file.name];
            //     if (customLink) {
            //         window.open(customLink, "_blank");
            //     } else {
            //         window.open(`http://app.justkaarlo.com/download/${file.id}`, "_blank");
            //         // const dl = getDownloadUrl(file, apiKey);
            //         // window.open(dl, "_blank");
            //     }
            // };

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