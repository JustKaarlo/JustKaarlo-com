(function initializeFS25FileList() {
    const apiKey = "__API_KEY__";
    const fsRootFolderId = "1EqzEAoB3zUuDiAfA81DNmqQh97mH8ISR";
    const fsContainer = document.getElementById("fs-fileList");
    
    if (!fsContainer) {
        console.error("FS25 file list container not found");
        return;
    }

    listFilesInFolder({
        folderId: fsRootFolderId,
        container: fsContainer,
        apiKey,
        customIcons: {
            "Ground Textures Pack.zip": "../res/src/fs25-textures.png",
        },
        customFolderIcons: {
            "1NQJdjAjXB8c5We33KuXdPltBGM6qQgpT": "https://cdn.buymeacoffee.com/uploads/membership_level/2024/06/x3t3ecJIeddW9EwyTs8ZbPV3KsmZTicsiIbWq4l8.png@800w_0e.webp",
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "../res/src/fs25-logo-small.png",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs": "../res/src/fs25-maps.png",
        },
        highlightFiles: [],
        colorizeFiles: [],
        excludePartsFolders: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs"
        ],
        folderGradientFallback: {},
        downloadButtonFiles: [],
        excludeDownloadFiles: [],
        customDownloadLinks: {},
        customWebsiteLinks: {
            "Ground Textures Pack.zip": "https://www.kingmods.net/en/fs25/mods/66301/ground-textures-pack",
            "1NQJdjAjXB8c5We33KuXdPltBGM6qQgpT": "https://www.kingmods.net/en/profile/fs-miner",
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "https://www.kingmods.net/en/fs25/new-mods",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs": "https://www.kingmods.net/en/fs25/categories/maps",
        },
        tooltipData: {
            "Ground Textures Pack.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/ground-textures-pack-fs25-H3ztP.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ground-textures-pack-fs25-BLZAj.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ground-textures-pack-fs25-JSmbB.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ground-textures-pack-fs25-kfz2u.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ground-textures-pack-fs25-ZeJ0V.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ground-textures-pack-fs25-LfwI8.jpg"
                ],
                description: "Here's a pack of field textures for soil processing, created from my own photos for realistic detail."
            },
        },
        showDownloadButtonAtRoot: true
    });

    attachDocPreview(fsContainer);
})()