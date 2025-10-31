(function initializeFS25FileList() {
    const apiKey = "AIzaSyDqtsRN35V1JnmfIY9hTsn_Ej4aSipsK4M";
    const fsRootFolderId = "1EqzEAoB3zUuDiAfA81DNmqQh97mH8ISR";
    const fsContainer = document.getElementById("fs-fileList");

    // CUSTOM CONSTANTS

    if (!fsContainer) {
        console.error("file list container not found");
        return;
    }

    listFilesInFolder({
        folderId: fsRootFolderId,
        container: fsContainer,
        apiKey,
        iconDefinitions: {
            "ItemFxIcon": "../res/src/fs25-side-fx.png",
        },
        iconAssignments: {
            "ItemFxIcon": [
                // MODS

                // OTHERS
                "OlssonsMods.zip",
                "MissingMods.zip",

                // CUSTOM FILES
                "map-1", "map-2", "map-3", "map-4", "map-5", "map-6", "map-7", "map-8", "map-9", "map-10", "map-11", "map-12", "map-13", "map-14", "map-15",
            ],

        },
        customIcons: {},
        folderIconDefinitions: {
            "OthersCategory": "../res/src/fs25-others.png",
            "MapsCategory": "../res/src/fs25-maps.png",
            "TexturesCategory": "../res/src/fs25-textures.png",
        },
        folderIconAssignments: {
            "OthersCategory": [
                "1Vtso3y0kFlJt8hi1ZlTFhtFolDVTxNj_",
            ],
            "MapsCategory": [],
            "TexturesCategory": [],
        },
        customFolderIcons: {
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "../res/src/fs25-logo-small.png",
        },
        highlightFiles: [],
        colorizeFiles: [],
        excludePartsFolders: [],
        folderGradientFallback: {},
        showDownloadButtonForAllFiles: true,
        downloadButtonFiles: [],
        excludeDownloadFiles: [
            // FOLDERS
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1Vtso3y0kFlJt8hi1ZlTFhtFolDVTxNj_",

            // CUSTOM FOLDERS
            "fs25-maps",

            // CUSTOM FILES
            "map-1", "map-2", "map-3", "map-4", "map-5", "map-6", "map-7", "map-8", "map-9", "map-10", "map-11", "map-12", "map-13", "map-14", "map-15",
        ],
        customDownloadLinks: {},
        customWebsiteLinks: {
            // FOLDERS
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "https://www.kingmods.net/en/fs25/new-mods",
            "1Vtso3y0kFlJt8hi1ZlTFhtFolDVTxNj_": "https://www.kingmods.net/en/fs25/categories/miscellaneous/other-mods",

            // MODS

            // CUSTOM FOLDERS
            "fs25-maps": "https://www.kingmods.net/en/fs25/categories/maps",

            // CUSTOM FILES
            "map-1": "https://www.kingmods.net/en/fs25/mods/71475/map-1-20-4x",
            "map-2": "https://www.kingmods.net/en/fs25/mods/71098/am-nord-ostsee-kanal-4x",
            "map-3": "https://www.kingmods.net/en/fs25/mods/69427/back-roads-county-4x",
            "map-4": "https://www.kingmods.net/en/fs25/mods/60427/freche-dachskarte-4x",
            "map-5": "https://www.kingmods.net/en/fs25/mods/63643/huron-county-16x",
            "map-6": "https://www.kingmods.net/en/fs25/mods/67169/judith-plains-montana-4x",
            "map-7": "https://www.kingmods.net/en/fs25/mods/70264/la-plaine",
            "map-8": "https://www.kingmods.net/en/fs25/mods/63925/lenkovtsy-4x",
            "map-9": "https://www.kingmods.net/en/fs25/mods/62246/nf-marsch-4x",
            "map-10": "https://www.kingmods.net/en/fs25/mods/69094/saxlingham",
            "map-11": "https://www.kingmods.net/en/fs25/mods/62944/schwesing-bahnhof",
            "map-12": "https://www.kingmods.net/en/fs25/mods/70646/nietwerder-4x-multifruit",
            "map-13": "https://www.kingmods.net/en/fs25/mods/69994/wernolau-farm",
            "map-14": "https://www.kingmods.net/en/fs25/work-in-progress/1624/sivita",
            "map-15": "https://www.kingmods.net/en/fs25/mods/68888/polesine",
        },
        tooltipData: {
            // CUSTOM FILES
            "map-1": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/thuringen-20-4x-fs25-hJdoz.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/thuringen-20-4x-fs25-n8Qw3.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/thuringen-20-4x-fs25-2BY3J.jpg",
                ]
            },
            "map-2": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/am-nord-ostsee-kanal-4x-fs25-nZ2J3.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/am-nord-ostsee-kanal-4x-fs25-zUwWq.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/am-nord-ostsee-kanal-4x-fs25-zJu45.jpg",
                ]
            },
            "map-3": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/back-roads-county-4x-fs25-FnifC.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/back-roads-county-4x-fs25-JgFNr.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/back-roads-county-4x-fs25-Yp20w.jpg",
                ]
            },
            "map-4": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/freche-dachskarte-4x-fs25-hAssD.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/freche-dachskarte-4x-fs25-MGuVe.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/freche-dachskarte-4x-fs25-jwxtA.jpg",
                ]
            },
            "map-5": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/huron-county-16x-fs25-93Ti6.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/huron-county-16x-fs25-FwSEY.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/huron-county-16x-fs25-sTYvz.jpg",
                ]
            },
            "map-6": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/judith-plains-montana-4x-fs25-GDQxi.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/judith-plains-montana-4x-fs25-OtVTO.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/judith-plains-montana-4x-fs25-iXzsx.jpg",
                ]
            },
            "map-7": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/la-plaine-fs25-9wCnh.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/la-plaine-fs25-V4CN4.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/la-plaine-fs25-4fccq.jpg",
                ]
            },
            "map-8": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/lenkovtsy-4x-fs25-lcheK.jpg",
                    "https://farmingsimulator22mods.com/wp-content/uploads/2025/04/lenkivtsi-map-4x-v1-0-0-3-fs25-9.jpg",
                    "https://mods.club/uploads/image/2025/01/small-town-usa-v1-0-0.webp",
                ]
            },
            "map-9": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/nf-marsch-4x-fs25-GfdKk.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/nf-marsch-4x-fs25-mMLjE.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/nf-marsch-4x-fs25-LB19G.jpg",
                ]
            },
            "map-10": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/saxlingham-fs25-QSj04.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/saxlingham-fs25-vzlbW.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/saxlingham-fs25-j8Jj2.jpg",
                ]
            },
            "map-11": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/schwesing-bahnhof-fs25-AWlkl.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/schwesing-bahnhof-fs25-imAx3.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/schwesing-bahnhof-fs25-zlVd9.jpg",
                ]
            },
            "map-12": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/nietwerder-4x-multifruit-fs25-V0lD3.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/nietwerder-4x-multifruit-fs25-9FLMC.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/nietwerder-4x-multifruit-fs25-JLlvc.jpg",
                ]
            },
            "map-13": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/wernolau-farm-fs25-4P9qt.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/wernolau-farm-fs25-c4eiq.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/wernolau-farm-fs25-HrQVx.jpg",
                ]
            },
            "map-14": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/wips/sivita-fs25-E9hlz.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/sivita-fs25-gdSwY.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/sivita-fs25-byo4E.jpg",
                ]
            },
            "map-15": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/polesine-fs25-CmuUa.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/polesine-fs25-ps0aw.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/polesine-fs25-oGrAs.jpg",
                ]
            },
        },
        showDownloadButtonAtRoot: true,
        customDisplayNames: {
            // OTHERS
            "OlssonsMods.zip": "Olssons Mods",
            "MissingMods.zip": "Olssons Missing Mods",

            // MODS
        },
        tagDefinitions: {
            "2x-map": { text: "2x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            "4x-map": { text: "4x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            "16x-map": { text: "16x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            "wip": { text: "WIP", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            "outdated": { text: "Outdated", color: "#5e5f5eff", opacity: 0.2, textOpacity: 0.35 },
            "top": { text: "⭐", color: "#e4af00", opacity: 0.6, textOpacity: 1 },
            "collection": { text: "Collection", color: "#95ac00", opacity: 0.5, textOpacity: 0.45 },
        },
        tagAssignments: {
            "2x-map": [
                "map-10",
            ],
            "4x-map": [
                "map-1", "map-2", "map-3", "map-4", "map-6", "map-7", "map-11", "map-8", "map-9", "map-12", "map-13", "map-14", "map-15",
            ],
            "16x-map": [
                "map-5",
            ],
            "collection": [
                "OlssonsMods.zip",
                "MissingMods.zip",
            ],
            "wip": [
                "map-14",
            ],
            "outdated": [],
            "top": [
                "map-6"
            ]
        },
        customTags: {
        },
        hideAllSizeTags: false,
        hideSizeTagFiles: [
            // CUSTOM FILES
            "map-1", "map-2", "map-3", "map-4", "map-5", "map-6", "map-7", "map-8", "map-9", "map-10", "map-11", "map-12", "map-13", "map-14", "map-15",
        ],
        hideSizeTagFolders: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1Vtso3y0kFlJt8hi1ZlTFhtFolDVTxNj_",

            // CUSTOM FOLDERS
            "fs25-maps",
        ],
        customFiles: [
            {
                id: "map-1",
                name: "Thüringen",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-2",
                name: "Am Nord-Ostsee-Kanal",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-3",
                name: "Back Roads County",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-4",
                name: "Freche Dachskarte",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-5",
                name: "Huron County",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-6",
                name: "Judith Plains Montana",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-7",
                name: "La Plaine",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-8",
                name: "Lenkovtsy",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-9",
                name: "NF Marsch",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-10",
                name: "Saxlingham",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-11",
                name: "Schwesing Bahnhof",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-12",
                name: "Nietwerder",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-13",
                name: "Wernolau Farm",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-14",
                name: "Sivita",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-15",
                name: "Polesine",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
        ],
        customFolders: [
            {
                id: "fs25-maps",
                name: "Maps",
                mimeType: "application/vnd.google-apps.folder",
                icon: "../res/src/fs25-maps.png",
            }
        ],
    });
    attachDocPreview(fsContainer);
})()