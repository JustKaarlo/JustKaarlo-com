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
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "../res/src/fs25-logo-small.png",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs": "../res/src/fs25-maps.png",
        },
        highlightFiles: [],
        colorizeFiles: [],
        excludePartsFolders: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs",
        ],
        folderGradientFallback: {},
        showDownloadButtonForAllFiles: true,
        downloadButtonFiles: [],
        excludeDownloadFiles: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs",
        ],
        customDownloadLinks: {},
        customWebsiteLinks: {
            "1NQJdjAjXB8c5We33KuXdPltBGM6qQgpT": "https://www.kingmods.net/en/profile/fs-miner",
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "https://www.kingmods.net/en/fs25/new-mods",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs": "https://www.kingmods.net/en/fs25/categories/maps",
            "FS25_Ropa_BFE.zip": "https://www.kingmods.net/en/fs25/mods/62298/ropa-tiger-6s-big-field-edition",
            "FS25_8450Windrower.zip": "https://www.kingmods.net/en/fs25/mods/69499/8450-windrower-pack",
            "FS25_claasSmallBalePack.zip": "https://fs25.net/claas-small-bale-pack-v1-0/",
            "FS25_DolbiJaviyu.zip": "https://fs25.net/dolbi-javiyu-pack-v1-0/",
            "FS25_balersRound.zip": "https://fs25.net/kuhn-vb-3190-v1-0/",
        },
        tooltipData: {
            "FS25_Ropa_BFE.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/ropa-tiger-6s-big-field-edition-fs25-QcA33.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ropa-tiger-6s-big-field-edition-fs25-FHqX0.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ropa-tiger-6s-big-field-edition-fs25-2R0Uy.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ropa-tiger-6s-big-field-edition-fs25-wZmoj.jpg",
                ],
                description: ""
            },
            "FS25_8450Windrower.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/8450-windrower-pack-fs25-8VAb6.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/8450-windrower-pack-fs25-FJ0NZ.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/8450-windrower-pack-fs25-lhbwi.jpg",
                ],
                description: ""
            },
            "FS25_claasSmallBalePack.zip": {
                images: [
                    "https://files.fs25.net/mods/2025/05/Claas-Small-Bale-Pack-1.02.png",
                    "https://files.fs25.net/mods/2025/05/Claas-Small-Bale-Pack-1.04.png",
                    "https://files.fs25.net/mods/2025/05/Claas-Small-Bale-Pack-1.0.png",
                ],
                description: ""
            },
            "FS25_DolbiJaviyu.zip": {
                images: [
                    "https://files.fs25.net/mods/2025/09/Dolbi-Javiyu-Pack.jpg",
                    "https://files.fs25.net/mods/2025/09/Dolbi-Javiyu-Pack2.jpg",
                    "https://files.fs25.net/mods/2025/05/Claas-Small-Bale-Pack-1.0.png",
                    "https://files.fs25.net/mods/2025/09/Dolbi-Javiyu-Pack3.jpg",
                    "https://files.fs25.net/mods/2025/09/Dolbi-Javiyu-Pack4.jpg",
                ],
                description: ""
            },
            "FS25_balersRound.zip": {
                images: [
                    "https://files.fs25.net/mods/2025/05/Kuhn-VB-3190-v1.0.webp",
                    "https://files.fs25.net/mods/2025/05/Kuhn-VB-3190-v1.02.webp",
                    "https://files.fs25.net/mods/2025/05/Kuhn-VB-3190-v1.03.webp",
                ],
                description: ""
            },
        },
        showDownloadButtonAtRoot: true,
        customDisplayNames: {
            "FS25_Ropa_BFE.zip": "Ropa Tiger 6S Big Field Edition",
            "FS25_8450Windrower.zip": "8450 Windrower Pack",
            "FS25_claasSmallBalePack.zip": "Claas - Small Bale Pack V1.0",
            "FS25_DolbiJaviyu.zip": "Dolbi Javiyu Pack V1.0",
            "FS25_balersRound.zip": "Kuhn VB 3190 V1.0",
        },
        customTags: {
            // "FILE/FOLDER NAME/ID": [
            //     { text: "Bright", color: "#FF0000", opacity: 0.8, textOpacity: 1.0 },
            //     { text: "Subtle", color: "#00FF00", opacity: 0.3, textOpacity: 0.6 },
            //     { text: "Ghost", color: "#0000FF", opacity: 0.2, textOpacity: 0.4 }
            // ]
        },
        hideAllSizeTags: false,
        hideSizeTagFiles: [],
        hideSizeTagFolders: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs",
        ],
    });
    attachDocPreview(fsContainer);
})()

FS25_8450Windrower.zip
FS25_claasSmallBalePack.zip