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
            "Huron County 16X.zip": "../res/src/fs25-north-american-maps.png",
            "Schwesing Bahnhof.zip": "../res/src/fs25-european-maps.png",
            "Freche Dachskarte 4X.zip": "../res/src/fs25-european-maps.png",
        },
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

            "Huron County 16X.zip",
            "Schwesing Bahnhof.zip",
            "Freche Dachskarte 4X.zip",
        ],
        customDownloadLinks: {},
        customWebsiteLinks: {
            "1NQJdjAjXB8c5We33KuXdPltBGM6qQgpT": "https://www.kingmods.net/en/profile/fs-miner",
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "https://www.kingmods.net/en/fs25/new-mods",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs": "https://www.kingmods.net/en/fs25/categories/maps",
            "FS25_Ropa_BFE.zip": "https://www.kingmods.net/en/fs25/mods/62298/ropa-tiger-6s-big-field-edition",
            "FS25_Balers_Pack_Whit_Windrower.zip": "https://www.kingmods.net/en/fs25/mods/61837/pack-of-balers-with-windrower",

            "Huron County 16X.zip": "https://www.kingmods.net/en/fs25/mods/63643/huron-county-16x",
            "Schwesing Bahnhof.zip": "https://www.kingmods.net/en/fs25/mods/62944/schwesing-bahnhof",
            "Freche Dachskarte 4X.zip": "https://www.kingmods.net/en/fs25/mods/60427/freche-dachskarte-4x",
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
            "FS25_Balers_Pack_Whit_Windrower.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/pack-of-balers-with-windrower-fs25-7Ut83.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/pack-of-balers-with-windrower-fs25-SBi4l.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/pack-of-balers-with-windrower-fs25-1n8yk.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/pack-of-balers-with-windrower-fs25-hWm4W.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/pack-of-balers-with-windrower-fs25-A133u.jpg",
                ],
                description: ""
            },

            // MAPS
            "Huron County 16X.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/huron-county-16x-fs25-93Ti6.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/huron-county-16x-fs25-FwSEY.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/huron-county-16x-fs25-sTYvz.jpg",
                ]
            },
            "Schwesing Bahnhof.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/schwesing-bahnhof-fs25-AWlkl.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/schwesing-bahnhof-fs25-imAx3.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/schwesing-bahnhof-fs25-zlVd9.jpg",
                ]
            },
            "Freche Dachskarte 4X.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/freche-dachskarte-4x-fs25-hAssD.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/freche-dachskarte-4x-fs25-MGuVe.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/freche-dachskarte-4x-fs25-jwxtA.jpg",
                ]
            },
        },
        showDownloadButtonAtRoot: true,
        customDisplayNames: {
            "FS25_Ropa_BFE.zip": "Ropa Tiger 6S Big Field Edition",
            "FS25_Balers_Pack_Whit_Windrower.zip": "Pack Of Balers With Windrower",

            // MAPS
            "Huron County 16X.zip": "Huron County",
            "Schwesing Bahnhof.zip": "Schwesing Bahnhof",
            "Freche Dachskarte 4X.zip": "Freche Dachskarte",
        },
        customTags: {
            // "FILE/FOLDER NAME/ID": [
            //     { text: "Bright", color: "#FF0000", opacity: 0.8, textOpacity: 1.0 },
            //     { text: "Subtle", color: "#00FF00", opacity: 0.3, textOpacity: 0.6 },
            //     { text: "Ghost", color: "#0000FF", opacity: 0.2, textOpacity: 0.4 }
            // ]

            // MAPS
            "Huron County 16X.zip": [
                { text: "North America", color: "#6c7d00ff", opacity: 0.5, textOpacity: 0.5 },
                { text: "16x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            ],
            "Schwesing Bahnhof.zip": [
                { text: "Europe", color: "#6c7d00ff", opacity: 0.5, textOpacity: 0.5 },
                { text: "4x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            ],
            "Freche Dachskarte 4X.zip": [
                { text: "Europe", color: "#6c7d00ff", opacity: 0.5, textOpacity: 0.5 },
                { text: "4x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            ],
        },
        hideAllSizeTags: false,
        hideSizeTagFiles: [
            "Huron County 16X.zip",
            "Schwesing Bahnhof.zip",
            "Freche Dachskarte 4X.zip",
        ],
        hideSizeTagFolders: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs",
        ],
    });
    attachDocPreview(fsContainer);
})()

FS25_8450Windrower.zip
FS25_claasSmallBalePack.zip