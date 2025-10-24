(function initializeFS25FileList() {
    const apiKey = "AIzaSyDqtsRN35V1JnmfIY9hTsn_Ej4aSipsK4M";
    const fsRootFolderId = "184OONp6ZUL5_oMTuGuqgyx2qNE9-D2UT";
    const fsContainer = document.getElementById("tw-fileList");
    // CUSTOM CONSTANTS

    if (!fsContainer) {
        console.error("file list container not found");
        return;
    }

    listFilesInFolder({
        folderId: fsRootFolderId,
        container: fsContainer,
        apiKey,
        iconDefinitions: {},
        iconAssignments: {},
        customIcons: {
            "Seven Kingdoms.exe":                   "../res/filelist/SevenKingdoms.ico",
            "Total War Skyrim.exe":                 "../res/filelist/TotalWarSkyrim.ico",
            "Northern Kingdoms Remastered.exe":     "../res/filelist/NorthernKingdomsRemastered.ico",
            "Attila Extra Modifications.exe":       "../res/filelist/TotalWarAttilaExtras.ico",
            "Medieval Kingdoms 1212AD Part 1.exe":  "../res/filelist/MedievelKingdoms1212AD.ico",
            "Medieval Kingdoms 1212AD Part 2.exe":  "../res/filelist/MedievelKingdoms1212AD.ico",
            "Medieval Kingdoms 1212AD Part 3.exe":  "../res/filelist/MedievelKingdoms1212AD.ico",
            "Medieval Kingdoms 1212AD Part 4.exe":  "../res/filelist/MedievelKingdoms1212AD.ico",
            "Medieval Kingdoms 1212AD Part 5.exe":  "../res/filelist/MedievelKingdoms1212AD.ico",
            "Ancient Empires Part 1.exe":           "../res/filelist/AnchientEmpires.ico",
            "Ancient Empires Part 2.exe":           "../res/filelist/AnchientEmpires.ico",
            "Ancient Empires Part 3.exe":           "../res/filelist/AnchientEmpires.ico",
            "Ancient Empires Part 4.exe":           "../res/filelist/AnchientEmpires.ico",
            "The Dawnless Days Part 1.exe":         "../res/filelist/TheDawnlessDays.ico",
            "The Dawnless Days Part 2.exe":         "../res/filelist/TheDawnlessDays.ico",
            "The Dawnless Days Part 3.exe":         "../res/filelist/TheDawnlessDays.ico",
            "Nova Attila Part 1.exe":               "../res/filelist/NovaAttila.ico",
            "Nova Attila Part 2.exe":               "../res/filelist/NovaAttila.ico",

            "Empire Total War II.rar":              "../res/filelist/EmpireII.ico",
            "Empire 2 Generals Part 1.exe":         "../res/filelist/Empire2General.ico",
            "Empire 2 Generals Part 2.exe":         "../res/filelist/Empire2General.ico",
            "Empire 2 Generals Part 3.exe":         "../res/filelist/Empire2General.ico",

            "ACW2 The American Civil War.exe":      "../res/filelist/ACW2.ico",
            "Field Command Napoleon.exe":           "../res/filelist/FieldCommand.ico",
            "Grand Battle Mod.exe":                 "../res/filelist/GrandBattle.ico",
            "Napoleonic Total War III.exe":         "../res/filelist/NapoleonicTotalWar3.ico",

            "War of the Gods.exe":                  "../res/filelist/WarofTheGods.ico",
            "Radious Total War.exe":                "../res/filelist/RadiousTotalWar.ico",
            "Medieval 1100AD.exe":                  "../res/filelist/Medieval1100AD.ico",
            "Divide et Impera.exe":                 "../res/filelist/DivideetImpera.ico",
            "Rome II Extra Modifications.exe":      "../res/filelist/TotalWarRome2Extras.ico",
            "Para Bellum Part 1.exe":               "../res/filelist/ParaBellum.ico",
            "Para Bellum Part 2.exe":               "../res/filelist/ParaBellum.ico",

            "Last Alliance.exe":                    "../res/filelist/LastAlliance.ico",
            "Pike & Shot II.exe":                   "../res/filelist/PikeAndShotII.ico",
            "Rise of Empires.exe":                  "../res/filelist/RiseOfEmpires.ico",
            "Dragon Empire Part 1.exe":             "../res/filelist/DragonEmpire.ico",
            "Dragon Empire Part 2.exe":             "../res/filelist/DragonEmpire.ico",
            "Carlist Wars.exe":                     "../res/filelist/TotalFotS.ico",
            "Scramble of the Far East.exe":         "../res/filelist/TotalFotS.ico",

            "Thrones Extra Modifications.exe":      "../res/filelist/TotalWarThronesExtras.ico",
            "Age of Arthur.exe":                    "../res/filelist/AgeOfArthur.ico",
        },
        folderIconDefinitions: {},
        folderIconAssignments: {},
        customFolderIcons: {
            "15r5NfzciWGfClpGvmT5ydfH4fDbScVAl":    "../res/filelist/attila-logo.png",
            "1IsBsstw8TYRZ4FP_cl0ydaVLWRRjVbam":    "../res/filelist/empire-logo.png",
            "1NiLKxsM1tZUbYjYoquZ2cYVMWh-zAprN":    "../res/filelist/napoleon-logo.png",
            "14p-1KeG4OB5uYIWqH8yRScpyXRj0IaEb":    "../res/filelist/rome2-logo.png",
            "1zYVOwQN--y78iTUnku67DyABh5maAfV_":    "../res/filelist/shogun2-logo.png",
            "1vizoQOE_gq9rK9LgrxeNgFoikw75AX2h":    "../res/filelist/thrones-logo.png",

            "1aKdtU4523e-51o_hm7-QeHFVxIFJvzlv":    "../res/filelist/MedievelKingdoms1212AD.ico",
            "1Y44ajJaNdEea5QLvUnQr3nLnmLxBHZSv":    "../res/filelist/AnchientEmpires.ico",
            "1iNfu1THAgULCd3pGUVsQCNlnTHKx-JQY":    "../res/filelist/TheDawnlessDays.ico",
            "1ElTsIpzKxZHZoMm9rxDfv6-dZoPLPosV":    "../res/filelist/SevenKingdoms.ico",
            "1NHAPD9Si2PM058Vkam_80h-okIFs31S3":    "../res/filelist/NovaAttila.ico",
            "1h__AJylt5ZhfY_iN8d-lGqg-KuReRTdj":    "../res/filelist/Empire2General.ico",
            "1P9wPHHxDGGt3tUrEyukiYBf-_YIMJayF":    "../res/filelist/ParaBellum.ico",
            "1MsU5Q9-uQ23a0anq3ZsH4RdZ-0CkiAiU":    "../res/filelist/DragonEmpire.ico",
            "1QkAve8DnUDfCRi3EBpFqqXHddXtiTfmX":    "../res/filelist/TotalFotS.ico",
        },
        highlightFiles: [
            "Attila Extra Modifications.exe",
            "Rome II Extra Modifications.exe",
            "Thrones Extra Modifications.exe"
        ],
        colorizeFiles: [
            "Attila Extra Modifications.exe",
            "Rome II Extra Modifications.exe",
            "Thrones Extra Modifications.exe"
        ],
        excludePartsFolders: [
            "15r5NfzciWGfClpGvmT5ydfH4fDbScVAl",
            "1IsBsstw8TYRZ4FP_cl0ydaVLWRRjVbam",
            "1NiLKxsM1tZUbYjYoquZ2cYVMWh-zAprN",
            "14p-1KeG4OB5uYIWqH8yRScpyXRj0IaEb",
            "1zYVOwQN--y78iTUnku67DyABh5maAfV_",
            "1vizoQOE_gq9rK9LgrxeNgFoikw75AX2h",
            "1QkAve8DnUDfCRi3EBpFqqXHddXtiTfmX"
        ],
        folderGradientFallback: {},
        showDownloadButtonForAllFiles: true,
        downloadButtonFiles: [],
        excludeDownloadFiles: [
            "15r5NfzciWGfClpGvmT5ydfH4fDbScVAl",
            "1IsBsstw8TYRZ4FP_cl0ydaVLWRRjVbam",
            "1NiLKxsM1tZUbYjYoquZ2cYVMWh-zAprN",
            "14p-1KeG4OB5uYIWqH8yRScpyXRj0IaEb",
            "1zYVOwQN--y78iTUnku67DyABh5maAfV_",
            "1vizoQOE_gq9rK9LgrxeNgFoikw75AX2h",
            "1QkAve8DnUDfCRi3EBpFqqXHddXtiTfmX"
        ],
        customDownloadLinks: {
            "1P9wPHHxDGGt3tUrEyukiYBf-_YIMJayF": "https://www.justkaarlo.com/data/packages/ParaBellum-Package.exe",
            "1MsU5Q9-uQ23a0anq3ZsH4RdZ-0CkiAiU": "https://www.justkaarlo.com/data/packages/DragonEmpire-Package.exe",
            "1h__AJylt5ZhfY_iN8d-lGqg-KuReRTdj": "https://www.justkaarlo.com/data/packages/Empire2General-Package.exe",
            "1iNfu1THAgULCd3pGUVsQCNlnTHKx-JQY": "https://www.justkaarlo.com/data/packages/DawnlessDays-Package.exe",
            "1NHAPD9Si2PM058Vkam_80h-okIFs31S3": "https://www.justkaarlo.com/data/packages/NovaAttila-Package.exe",
            "1aKdtU4523e-51o_hm7-QeHFVxIFJvzlv": "https://www.justkaarlo.com/data/packages/MK1212AD-Package.exe",
            "1Y44ajJaNdEea5QLvUnQr3nLnmLxBHZSv": "https://www.justkaarlo.com/data/packages/AncientEmpires-Package.exe"
        },
        customWebsiteLinks: {},
        tooltipData: {},
        showDownloadButtonAtRoot: true,
        customDisplayNames: {},
        tagDefinitions: {},
        tagAssignments: {},
        hideAllSizeTags: false,
        hideSizeTagFiles: [],
        hideSizeTagFolders: [],
        customFiles: [],
        customFolders: [],
    });
    attachDocPreview(fsContainer);
})()