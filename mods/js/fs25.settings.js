(function initializeFS25FileList() {
    const apiKey = "AIzaSyDqtsRN35V1JnmfIY9hTsn_Ej4aSipsK4M";
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
            "FSM Full Modpack.rar": "https://cdn.buymeacoffee.com/uploads/membership_level/2024/06/x3t3ecJIeddW9EwyTs8ZbPV3KsmZTicsiIbWq4l8.png@800w_0e.webp",
            "FSM Updated.zip": "https://cdn.buymeacoffee.com/uploads/membership_level/2024/06/x3t3ecJIeddW9EwyTs8ZbPV3KsmZTicsiIbWq4l8.png@800w_0e.webp",
        },
        customFolderIcons: {},
        highlightFiles: [
            "Download All.zip"
        ],
        colorizeFiles: [],
        excludePartsFolders: [],
        folderGradientFallback: {},
        downloadButtonFiles: [
            "FS25_agriculturalSubsidy.zip",
            "FS25_HeaderRackPack.zip",
            "FS25_NoVehicleCameraCollision_KingMods.zip",
            "FS25_paintAndTerraformAnywhere.zip",
            "FS25_PalletsRack.zip",
            "FS25_RM_Subsidy.zip",
            "FS25_UniversalAutoload.zip",
            "FS25_BetterProductions.zip",
            "FS25_enterWhereYouLookingAt.zip",
            "FS25_exhaustExtension.zip",
            "FS25_GoldPlant_msi.zip",
            "FS25_groundTextures.zip",
            "FS25_HorseCareManager.zip",
            "FS25_morePallets.zip",
            "FS25_ProductionSupplyTrader.zip",
            "FS25_RealisticLivestock.zip",
            "FS25_SupplyTransportContracts.zip",
            "FS25_ZYX_SeasonalPrices_crossplay.zip",
            "FS25_BetterContracts.zip",
            "FS25_ContractServiceProvider.zip",
            "FS25_fillTypeExtender.zip",
            "FS25_GreenhouseAutomaticWatering.zip",
            "FS25_NoRestrictedFences.zip",
            "FS25_allTheGroundTextures.zip",
            "FS25_ProductionControl.zip",
            "FS25_ProductionStorageControl.zip",
            "FS22_RealGPSMod.zip",
            "FS25_RoadKit.zip",
            "FS25_sellEverything.zip",
            "FS25_semiLowloader3A.zip",
            "FS25_sheds_WS11.zip",
            "FS25_TailLiftPack.zip",
            "FS25PlaceAnywheremaster.zip",
        ],
        excludeDownloadFiles: [],
        customDownloadLinks: {
            "1EqzEAoB3zUuDiAfA81DNmqQh97mH8ISR": "http://app.justkaarlo.com/download/1_K0oQCe33VqiOqtik10W9ZpLVqpcINYH"
        },
        showDownloadButtonAtRoot: true
    });

    attachDocPreview(fsContainer);
})()