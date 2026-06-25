(function initializeFS25FileList() {
    const apiKey = "__API_KEY__";
    const fsRootFolderId = "117HPqPWmd6uglc6HaJAHuHP8e4VbFRkl";
    const fsContainer = document.getElementById("fileList");
    // CUSTOM CONSTANTS

    if (!fsContainer) {
        console.error("file list container not found");
        return;
    }

    listFilesInFolder({
        folderId: fsRootFolderId,
        container: fsContainer,
        apiKey,
        enableSearch: false,
        iconDefinitions: {
            "ConvergenceIcon": "https://www.justkaarlo.com/res/mods/elden-ring/Convergence.ico",
        },
        iconAssignments: {
            "ConvergenceIcon": [
                "Convergence (2.2.3).zip"
            ],
        },
        folderIconDefinitions: {},
        folderIconAssignments: {},
        highlightFiles: [
            "Convergence (2.2.3).zip"
        ],
        colorizeFiles: [
            "Convergence (2.2.3).zip"
        ],
        excludePartsFolders: [],
        folderGradientFallback: {},
        showDownloadButtonForAllFiles: false,
        downloadButtonFiles: [],
        excludeDownloadFiles: [],
        customDownloadLinks: {},
        customWebsiteLinks: {
            "Convergence (2.2.3).zip": "https://www.convergencemod.com/",
        },
        tooltipData: {},
        showDownloadButtonAtRoot: true,
        customDisplayNames: {
            "Convergence (2.2.3).zip": "Convergence (2.2.3)",
        },
        tagDefinitions: {},
        tagAssignments: {},
        hideAllSizeTags: false,
        hideSizeTagFiles: [
            "Convergence Classes Summaries",
            "Kaarlo's Class Rating",
            "Path & Weapons",
            "Scaling Values",
            "Weapon Scaling & Catalyst Affinity Scaling",
            "Weapon Upgrades Explained",
            "What Custom Armor Replaces",
            "What Custom Weapons Replaces",
        ],
        hideSizeTagFolders: [],
        customFiles: [],
        customFolders: [],
    });
    attachDocPreview(fsContainer);
})()