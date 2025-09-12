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
            "FSM Updated.zip": "https://cdn.buymeacoffee.com/uploads/membership_level/2024/06/x3t3ecJIeddW9EwyTs8ZbPV3KsmZTicsiIbWq4l8.png@800w_0e.webp",
        },
        customFolderIcons: {},
        highlightFiles: [],
        colorizeFiles: [
            "FSM Full Modpack.zip"
        ],
        excludePartsFolders: [
            "1SD8hCSKgeJ4O6tlpFOzxl1qvRRl_YfF2"
        ],
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
            "FS25_ObjectBaleStorage.zip",
            "FS22_RealGPSMod.zip",
            "FS25_OldUS_Shed.zip",
            "FS25_TowingChain.zip",
            "farmMarket.zip",
            "FS25_Containers_Pack.zip",
            "FS25_CustomProductions.zip",
            "FS25_LogisticsCenter.zip",
            "FS25_Cybuchowo.zip",
            "FS25_Lipinki.zip",
            "FS25_Mecklenburg_Lake_District_crossplay.zip",
            "FS25_Polesine.zip",
            "FS25_SchwesingBahnhof.zip",
            "FS25_Szpakowo.zip",
            "FS25_realGPS.zip",
            "Mechlenburg Lagke District.jpg",
            "Polesine.jpg",
            "Schwesing Bahnhof.jpg",
            "Szpakowo.jpg",
            "Cybuchowo.jpg",
            "Lipinki.jpg",
            "FS25_adjustWorkingSpeed.zip",
            "FS25_BetterProductions.zip",
            "FS25_BuyableGPS.zip",
            "FS25_electricChargeStation.zip",
            "FS25_Excavator_Extension.zip",
            "FS25_gameplay_Real_Vehicle_Breakdowns.zip",
            "FS25_GarageMenu.zip",
            "FS25_ImprovedProductionDistribution.zip",
            "FS25_Kshop.zip",
            "FS25_paintableFoliagesExtended.zip",
            "FS25_ProductionControl.zip",
            "FS25_productionsLimitIncreaser120.zip",
            "FS25_ProductionStorageControl.zip",
            "FS25_realDirtColor.zip",
            "FS25_realGPS.zip",
            "FS25_RealisticWeather.zip",
            "FS25_rememberPositions.zip",
            "FS25_sellEverything.zip",
            "FS25_TipAnywhere.zip",
            "FS25_TransferOwnership.zip",
            "FS25_UnrestrictedPlacement.zip",
            "FS25_Waterpumpingstation_crossplay.zip",
            "RMM25_Transfer_Tank.zip",
            "FS25_AdjustableMirrors.zip"
        ],
        excludeDownloadFiles: [
            "Maps",
            "1SD8hCSKgeJ4O6tlpFOzxl1qvRRl_YfF2"
        ],
        customDownloadLinks: {
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "http://app.justkaarlo.com/download/1ET6TFJVaEuGgyDXWw65tS2ELw1zGKtFu"
        },
        showDownloadButtonAtRoot: true
    });

    attachDocPreview(fsContainer);
})()