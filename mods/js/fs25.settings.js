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
        customIcons: {},
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
            "1NQJdjAjXB8c5We33KuXdPltBGM6qQgpT": "https://www.kingmods.net/en/profile/fs-miner",
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "https://www.kingmods.net/en/fs25/new-mods",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs": "https://www.kingmods.net/en/fs25/categories/maps",
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
        },
        showDownloadButtonAtRoot: true
    });

    attachDocPreview(fsContainer);
})()