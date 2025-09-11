(function initializeEldenRingFileList() {
    const apiKey = "__API_KEY__";
    const erRootFolderId = "117HPqPWmd6uglc6HaJAHuHP8e4VbFRkl";
    const erContainer = document.getElementById("fileList");
    
    if (!erContainer) {
        console.error("Elden Ring file list container not found");
        return;
    }

    listFilesInFolder({
        folderId: erRootFolderId,
        container: erContainer,
        apiKey,
        customIcons: {
            "Convergence (2.2.3).zip": "../res/filelist/Convergence.ico"
        },
        customFolderIcons: {},
        highlightFiles: [
            "Convergence (2.2.3).zip"
        ],
        colorizeFiles: [
            "Convergence (2.2.3).zip"
        ],
        excludePartsFolders: [],
        folderGradientFallback: {},
        downloadButtonFiles: [],
        excludeDownloadFiles: [],
        customDownloadLinks: {},
        showDownloadButtonAtRoot: true
    });

    attachDocPreview(erContainer);
})()