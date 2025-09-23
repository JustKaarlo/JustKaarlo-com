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
            "FS25_transportBoxes.zip": "https://www.justkaarlo.com/res/src/fs.ico",
            "FS25_TestDrive.zip": "https://www.justkaarlo.com/res/src/fs.ico",
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
            "FS25_transportBoxes.zip",
            "FS25_TestDrive.zip"
        ],
        excludeDownloadFiles: [],
        customDownloadLinks: {},
        customWebsiteLinks: {
            "1NQJdjAjXB8c5We33KuXdPltBGM6qQgpT": "https://www.kingmods.net/en/profile/fs-miner",
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "https://www.kingmods.net/en/fs25/new-mods",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs": "https://www.kingmods.net/en/fs25/categories/maps",
            "FS25_rootCropStorage.zip": "https://www.kingmods.net/en/fs25/mods/59999/root-crop-storage",
            "FS25_EnhancedAnimalSystem.zip": "https://www.kingmods.net/en/fs25/mods/70701/enhanced-animal-system",
            "FS25_transportBoxes.zip": "https://www.kingmods.net/en/fs25/mods/70732/transport-boxes-for-vegetables",
            "FS25_TestDrive.zip": "https://www.kingmods.net/en/fs25/mods/68946/test-drive",
        },
        tooltipData: {
            "FS25_rootCropStorage.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/root-crop-storage-fs25-xag1c.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/root-crop-storage-fs25-SlsuP.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/root-crop-storage-fs25-fU882.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/root-crop-storage-fs25-C9NTN.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/root-crop-storage-fs25-n7vKG.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/root-crop-storage-fs25-sz9hQ.jpg"
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
            "FS25_transportBoxes.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/transport-boxes-for-vegetables-fs25-MQdQj.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/transport-boxes-for-vegetables-fs25-CTDf5.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/transport-boxes-for-vegetables-fs25-0Ke9A.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/transport-boxes-for-vegetables-fs25-pVqlr.jpg",
                ],
                description: "Transport Boxes in Full Metal Model or with Wooden Planks. Essential helpers to store your vegetables at your Farm."
            },
        },
        showDownloadButtonAtRoot: true
    });

    attachDocPreview(fsContainer);
})()