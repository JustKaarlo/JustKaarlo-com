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
            "ConvergenceIcon": "../../res/icons/Convergence.ico",
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
        colorizeFiles: [],
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
            "Convergence (2.2.3).zip": "Convergence.zip",
        },
        tagDefinitions: {
            "version": {
                text: "v2.2.3",
                textColor: "#c1c1c1",
                textOpacity: 0.8,
                color: "#60a1c8",
                opacity: 0.3,
                priority: 1
            }
        },
        tagAssignments: {
            "version": [
                "Convergence (2.2.3).zip"
            ]
        },
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