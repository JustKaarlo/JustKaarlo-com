(function initializeFileLists() {
    const apiKey = "__API_KEY__";
    const twRootFolderId = "1EqzEAoB3zUuDiAfA81DNmqQh97mH8ISR";
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
            "FSM Full Modpack.rar",
            "Part 1",
            "Part 2",
        ],
        colorizeFiles: [
            "FSM Full Modpack.rar"
        ],
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
            "FS25_NoRestrictedFences.zip"
        ],
        excludeDownloadFiles: [],
        customDownloadLinks: {
            "1HDkymUsO_xIZe7fnhzO_-WI7iSoGk25m": "http://app.justkaarlo.com/download/1kaFnzCG_2SHqHgP6JLwmyjYmjlCJKdw1",
            "1LJosoqsuFY60Agu0b6gfTNi6SHfSYysV": "http://app.justkaarlo.com/download/12Rw9riJFYJ-Hi_mDYD__i4GjPEVGdpEe", // PART 1
            "12LAELEwKdXTeV_QVEZbPC8VeCXqTbdx0": "http://app.justkaarlo.com/download/1s_UFuWi01ObokibWdFT7Xefmwa98Rppu", // PART 2
            "1vUmpslRRVH6rsM3KksjQDXVgY2Tf1Mhk": "http://app.justkaarlo.com/download/195EvjPk_rANKEWoOtnieq4I506D_q20A", // PART 3
        },
        showDownloadButtonAtRoot: true
    });
})()