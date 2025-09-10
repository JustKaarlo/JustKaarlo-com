(function initializeFileLists() {
    const apiKey = "AIzaSyDqtsRN35V1JnmfIY9hTsn_Ej4aSipsK4M";
    const twRootFolderId = "1o2O8JyiYVPc6ukBqpwbFDp1Ki6iNeALT";
    const twContainer = document.getElementById("tw-fileList");
    listFilesInFolder({
        folderId: twRootFolderId,
        container: twContainer,
        apiKey,
        customIcons: {
            "FSM Full Modpack.rar": "https://cdn.buymeacoffee.com/uploads/membership_level/2024/06/x3t3ecJIeddW9EwyTs8ZbPV3KsmZTicsiIbWq4l8.png@800w_0e.webp"
        },
        customFolderIcons: {
            "1HDkymUsO_xIZe7fnhzO_-WI7iSoGk25m": "https://cdn.buymeacoffee.com/uploads/membership_level/2024/06/x3t3ecJIeddW9EwyTs8ZbPV3KsmZTicsiIbWq4l8.png@800w_0e.webp"
        },
        highlightFiles: [
            "FSM Full Modpack.rar"
        ],
        colorizeFiles: [
            "FSM Full Modpack.rar"
        ],
        excludePartsFolders: [],
        folderGradientFallback: {},
        downloadButtonFiles: [],
        excludeDownloadFiles: [],
        customDownloadLinks: {},
        showDownloadButtonAtRoot: true
    });
    attachDocPreview(twContainer);
})()