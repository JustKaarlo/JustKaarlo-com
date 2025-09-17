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
            "FSM Full Modpack.zip": "https://cdn.buymeacoffee.com/uploads/membership_level/2024/06/x3t3ecJIeddW9EwyTs8ZbPV3KsmZTicsiIbWq4l8.png@800w_0e.webp",
        },
        customFolderIcons: {
            "1NQJdjAjXB8c5We33KuXdPltBGM6qQgpT": "https://cdn.buymeacoffee.com/uploads/membership_level/2024/06/x3t3ecJIeddW9EwyTs8ZbPV3KsmZTicsiIbWq4l8.png@800w_0e.webp",
        },
        highlightFiles: [],
        colorizeFiles: [
            "FSM Full Modpack.zip"
        ],
        excludePartsFolders: [
            "1SD8hCSKgeJ4O6tlpFOzxl1qvRRl_YfF2",
            "1NQJdjAjXB8c5We33KuXdPltBGM6qQgpT"
        ],
        folderGradientFallback: {},
        downloadButtonFiles: [],
        excludeDownloadFiles: [
            "Maps",
            "1SD8hCSKgeJ4O6tlpFOzxl1qvRRl_YfF2"
        ],
        customDownloadLinks: {},
        showDownloadButtonAtRoot: true
    });

    attachDocPreview(fsContainer);
})()