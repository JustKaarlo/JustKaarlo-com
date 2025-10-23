(function initializeFS25FileList() {
    const apiKey = "__API_KEY__";
    const fsRootFolderId = "1EqzEAoB3zUuDiAfA81DNmqQh97mH8ISR";
    const fsContainer = document.getElementById("fs-fileList");

    // CUSTOM CONSTANTS
    const Fs25OthersCategory = "../res/src/fs25-others.png";
    const Fs25MapsCategory = "../res/src/fs25-maps.png";
    // const Fs25TexturesCategory = "../res/src/fs25-textures.png";
    const Fs25NorthAmericanMaps = "../res/src/fs25-north-american-maps.png";
    const Fs25EuropeanMaps = "../res/src/fs25-european-maps.png";
    const Fs25NorthAmericanTag = { text: "North America", color: "#6c7d00ff", opacity: 0.5, textOpacity: 0.5 };
    const Fs25EuropeTag = { text: "Europe", color: "#6c7d00ff", opacity: 0.5, textOpacity: 0.5 };
    const Fs252xMaps = { text: "2x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 };
    const Fs254xMaps = { text: "4x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 };
    const Fs2516xMaps = { text: "16x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 };
    const Fs25SdieFxIcon = "../res/src/fs25-side-fx.png";

    
    if (!fsContainer) {
        console.error("FS25 file list container not found");
        return;
    }

    listFilesInFolder({
        folderId: fsRootFolderId,
        container: fsContainer,
        apiKey,
        customIcons: {
            "FS25_AdvancedDamageSystem.zip": Fs25SdieFxIcon,
            "FS25_Vehicle_Years.zip": Fs25SdieFxIcon,
            "FS25_VehicleSpeedSync.zip": Fs25SdieFxIcon,
            "FS25_ConstructionUtilities.zip": Fs25SdieFxIcon,

            "OlssonsMods.zip": Fs25SdieFxIcon,
            "MissingMods.zip": Fs25SdieFxIcon,

            // MAPS
            "Huron County 16X.zip": Fs25NorthAmericanMaps,
            "Schwesing Bahnhof.zip": Fs25EuropeanMaps,
            "Freche Dachskarte 4X.zip": Fs25EuropeanMaps,
            "Saxlingham.zip": Fs25EuropeanMaps,
            "Judith Plains, Montana.zip": Fs25EuropeanMaps,
            "Back Roads County.zip": Fs25NorthAmericanMaps,
            "Lenkovtsy.zip": Fs25EuropeanMaps,
            "NF Marsch.zip": Fs25EuropeanMaps,
            "Am Nord-Ostsee-Kanal.zip": Fs25EuropeanMaps,
        },
        customFolderIcons: {
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "../res/src/fs25-logo-small.png",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs": Fs25MapsCategory,
            "1Vtso3y0kFlJt8hi1ZlTFhtFolDVTxNj_": Fs25OthersCategory,
        },
        highlightFiles: [],
        colorizeFiles: [],
        excludePartsFolders: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs",
            "1Vtso3y0kFlJt8hi1ZlTFhtFolDVTxNj_",
        ],
        folderGradientFallback: {},
        showDownloadButtonForAllFiles: true,
        downloadButtonFiles: [],
        excludeDownloadFiles: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs",
            "1Vtso3y0kFlJt8hi1ZlTFhtFolDVTxNj_",

            // MAPS
            "Huron County 16X.zip",
            "Schwesing Bahnhof.zip",
            "Freche Dachskarte 4X.zip",
            "Saxlingham.zip",
            "Judith Plains, Montana.zip",
            "Back Roads County.zip",
            "Lenkovtsy.zip",
            "NF Marsch.zip",
            "Am Nord-Ostsee-Kanal.zip",
        ],
        customDownloadLinks: {},
        customWebsiteLinks: {
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "https://www.kingmods.net/en/fs25/new-mods",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs": "https://www.kingmods.net/en/fs25/categories/maps",
            "1Vtso3y0kFlJt8hi1ZlTFhtFolDVTxNj_": "https://www.kingmods.net/en/fs25/categories/miscellaneous/other-mods",

            "FS25_AdvancedDamageSystem.zip": "https://www.kingmods.net/en/fs25/mods/69590/advanced-damage-system",
            "FS25_Vehicle_Years.zip": "https://www.kingmods.net/en/fs25/mods/62107/vehicle-years",
            "FS25_VehicleSpeedSync.zip": "https://www.kingmods.net/en/fs25/mods/61898/vehicle-speed-sync",
            "FS25_ConstructionUtilities.zip": "https://www.kingmods.net/en/fs25/mods/71060/construction-utilities",

            // MAPS
            "Huron County 16X.zip": "https://www.kingmods.net/en/fs25/mods/63643/huron-county-16x",
            "Schwesing Bahnhof.zip": "https://www.kingmods.net/en/fs25/mods/62944/schwesing-bahnhof",
            "Freche Dachskarte 4X.zip": "https://www.kingmods.net/en/fs25/mods/60427/freche-dachskarte-4x",
            "Saxlingham.zip": "https://www.kingmods.net/en/fs25/mods/69094/saxlingham",
            "Judith Plains, Montana.zip": "https://www.kingmods.net/en/fs25/mods/67169/judith-plains-montana-4x",
            "Back Roads County.zip": "https://www.kingmods.net/en/fs25/mods/69427/back-roads-county-4x",
            "Lenkovtsy.zip": "https://www.kingmods.net/en/fs25/mods/63925/lenkovtsy-4x",
            "NF Marsch.zip": "https://www.kingmods.net/en/fs25/mods/62246/nf-marsch-4x",
            "Am Nord-Ostsee-Kanal.zip": "https://www.kingmods.net/en/fs25/mods/71098/am-nord-ostsee-kanal-4x",
        },
        tooltipData: {
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
            "Saxlingham.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/saxlingham-fs25-QSj04.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/saxlingham-fs25-vzlbW.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/saxlingham-fs25-j8Jj2.jpg",
                ]
            },
            "Judith Plains, Montana.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/judith-plains-montana-4x-fs25-GDQxi.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/judith-plains-montana-4x-fs25-OtVTO.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/judith-plains-montana-4x-fs25-iXzsx.jpg",
                ]
            },
            "Back Roads County.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/back-roads-county-4x-fs25-FnifC.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/back-roads-county-4x-fs25-JgFNr.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/back-roads-county-4x-fs25-Yp20w.jpg",
                ]
            },
            "Lenkovtsy.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/lenkovtsy-4x-fs25-lcheK.jpg",
                    "https://farmingsimulator22mods.com/wp-content/uploads/2025/04/lenkivtsi-map-4x-v1-0-0-3-fs25-9.jpg",
                    "https://mods.club/uploads/image/2025/01/small-town-usa-v1-0-0.webp",
                ]
            },
            "NF Marsch.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/nf-marsch-4x-fs25-GfdKk.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/nf-marsch-4x-fs25-mMLjE.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/nf-marsch-4x-fs25-LB19G.jpg",
                ]
            },
            "Am Nord-Ostsee-Kanal.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/am-nord-ostsee-kanal-4x-fs25-nZ2J3.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/am-nord-ostsee-kanal-4x-fs25-zUwWq.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/am-nord-ostsee-kanal-4x-fs25-zJu45.jpg",
                ]
            },


            // "": {
            //     images: [
            //         "",
            //         "",
            //         "",
            //     ]
            // },
        },
        showDownloadButtonAtRoot: true,
        customDisplayNames: {
            "OlssonsMods.zip": "Olssons Mods",
            "MissingMods.zip": "Olssons Missing Mods",

            "FS25_AdvancedDamageSystem.zip": "Advanced Damage System",
            "FS25_Vehicle_Years.zip": "Vehicle Years",
            "FS25_VehicleSpeedSync.zip": "Vehicle Speed Sync",
            "FS25_ConstructionUtilities.zip": "Construction Utilities",

            // MAPS
            "Huron County 16X.zip": "Huron County",
            "Schwesing Bahnhof.zip": "Schwesing Bahnhof",
            "Freche Dachskarte 4X.zip": "Freche Dachskarte",
            "Saxlingham.zip": "Saxlingham",
            "Judith Plains, Montana.zip": "Judith Plains, Montana",
            "Back Roads County.zip": "Back Roads County",
            "Lenkovtsy.zip": "Lenkovtsy",
            "NF Marsch.zip": "NF Marsch",
            "Am Nord-Ostsee-Kanal.zip": "Am Nord-Ostsee-Kanal",
        },
        customTags: {
            // "FILE/FOLDER NAME/ID": [
            //     { text: "Bright", color: "#FF0000", opacity: 0.8, textOpacity: 1.0 },
            //     { text: "Subtle", color: "#00FF00", opacity: 0.3, textOpacity: 0.6 },
            //     { text: "Ghost", color: "#0000FF", opacity: 0.2, textOpacity: 0.4 }
            // ]
            "OlssonsMods.zip": [
                { text: "Collection", color: "#95ac00", opacity: 0.5, textOpacity: 0.45 }
            ],
            "MissingMods.zip": [
                { text: "Collection", color: "#95ac00", opacity: 0.5, textOpacity: 0.45 }
            ],


            // MAPS
            "Huron County 16X.zip": [
                Fs25NorthAmericanTag,
                Fs2516xMaps,
            ],
            "Schwesing Bahnhof.zip": [
                Fs25EuropeTag,
                Fs254xMaps,
            ],
            "Freche Dachskarte 4X.zip": [
                Fs25EuropeTag,
                Fs254xMaps,
            ],
            "Saxlingham.zip": [
                Fs25EuropeTag,
                Fs252xMaps,
            ],
            "Judith Plains, Montana.zip": [
                Fs25EuropeTag,
                Fs252xMaps,
            ],
            "Back Roads County.zip": [
                Fs25NorthAmericanTag,
                Fs254xMaps,
            ],
            "Lenkovtsy.zip": [
                Fs25EuropeTag,
                Fs254xMaps,
            ],
            "NF Marsch.zip": [
                Fs25EuropeTag,
                Fs254xMaps,
            ],
            "Am Nord-Ostsee-Kanal.zip": [
                Fs25EuropeTag,
                Fs254xMaps,
            ],
        },
        hideAllSizeTags: false,
        hideSizeTagFiles: [
            // MAPS
            "Huron County 16X.zip",
            "Schwesing Bahnhof.zip",
            "Freche Dachskarte 4X.zip",
            "Saxlingham.zip",
            "Judith Plains, Montana.zip",
            "Back Roads County.zip",
            "Lenkovtsy.zip",
            "NF Marsch.zip",
            "Am Nord-Ostsee-Kanal.zip",
        ],
        hideSizeTagFolders: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs",
            "1Vtso3y0kFlJt8hi1ZlTFhtFolDVTxNj_",
        ],
    });
    attachDocPreview(fsContainer);
})()

FS25_8450Windrower.zip
FS25_claasSmallBalePack.zip