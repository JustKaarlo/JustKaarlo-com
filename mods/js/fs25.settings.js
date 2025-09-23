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
            "FS25_rootCropStorage.zip": "https://www.justkaarlo.com/res/src/fs.ico",
            "FS25_EnhancedAnimalSystem.zip": "https://www.justkaarlo.com/res/src/fs.ico",
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
        downloadButtonFiles: [
            "FS25_rootCropStorage.zip",
            "FS25_EnhancedAnimalSystem.zip",
        ],
        excludeDownloadFiles: [],
        customDownloadLinks: {},
        customWebsiteLinks: {
            "1NQJdjAjXB8c5We33KuXdPltBGM6qQgpT": "https://www.kingmods.net/en/profile/fs-miner",
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "https://www.kingmods.net/en/fs25/new-mods",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs": "https://www.kingmods.net/en/fs25/categories/maps",
            "FS25_rootCropStorage.zip": "https://www.farming-simulator.com/mod.php?mod_id=303719&title=fs2025",
            "FS25_EnhancedAnimalSystem.zip": "https://www.kingmods.net/en/fs25/mods/70701/enhanced-animal-system",
        },
        tooltipData: {
            "FS25_rootCropStorage.zip": {
                images: [
                    "https://www.justkaarlo.com/res/fs25-screenshot/screenshot0.jpg",
                    "https://www.justkaarlo.com/res/fs25-screenshot/screenshot1.jpg",
                    "https://www.justkaarlo.com/res/fs25-screenshot/screenshot2.jpg",
                    "https://www.justkaarlo.com/res/fs25-screenshot/screenshot3.jpg",
                    "https://www.justkaarlo.com/res/fs25-screenshot/screenshot4.jpg",
                    "https://www.justkaarlo.com/res/fs25-screenshot/screenshot5.jpg"
                ],
                description: "This building is for storage of Potatoes, Beets, Carrots, Parsnips and Beetroots. This building functions like a Silo or Hayloft, but for root crops."
            },
            "FS25_EnhancedAnimalSystem.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/enhanced-animal-system-fs25-XutyK.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/enhanced-animal-system-fs25-Y3kkp.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/enhanced-animal-system-fs25-z7YH2.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/enhanced-animal-system-fs25-TEV0m.jpg",
                ],
                description: "This mod adjusts the animal system and expands it."
            },
        },
        showDownloadButtonAtRoot: true
    });

    attachDocPreview(fsContainer);
})()