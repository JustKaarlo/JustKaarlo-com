(function initializeFS25FileList() {
    const apiKey = "__API_KEY__";
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
            "Seven Kingdoms.exe":                   "../res/mods/total-war/ico/SevenKingdoms.ico",
            "Total War Skyrim.exe":                 "../res/mods/total-war/ico/TotalWarSkyrim.ico",
            "Northern Kingdoms Remastered.exe":     "../res/mods/total-war/ico/NorthernKingdomsRemastered.ico",
            "Attila Extra Modifications.exe":       "../res/mods/total-war/ico/TotalWarAttilaExtras.ico",
            "Medieval Kingdoms 1212AD Part 1.exe":  "../res/mods/total-war/ico/MedievelKingdoms1212AD.ico",
            "Medieval Kingdoms 1212AD Part 2.exe":  "../res/mods/total-war/ico/MedievelKingdoms1212AD.ico",
            "Medieval Kingdoms 1212AD Part 3.exe":  "../res/mods/total-war/ico/MedievelKingdoms1212AD.ico",
            "Medieval Kingdoms 1212AD Part 4.exe":  "../res/mods/total-war/ico/MedievelKingdoms1212AD.ico",
            "Medieval Kingdoms 1212AD Part 5.exe":  "../res/mods/total-war/ico/MedievelKingdoms1212AD.ico",
            "Ancient Empires Part 1.exe":           "../res/mods/total-war/ico/AnchientEmpires.ico",
            "Ancient Empires Part 2.exe":           "../res/mods/total-war/ico/AnchientEmpires.ico",
            "Ancient Empires Part 3.exe":           "../res/mods/total-war/ico/AnchientEmpires.ico",
            "Ancient Empires Part 4.exe":           "../res/mods/total-war/ico/AnchientEmpires.ico",
            "The Dawnless Days Part 1.exe":         "../res/mods/total-war/ico/TheDawnlessDays.ico",
            "The Dawnless Days Part 2.exe":         "../res/mods/total-war/ico/TheDawnlessDays.ico",
            "The Dawnless Days Part 3.exe":         "../res/mods/total-war/ico/TheDawnlessDays.ico",
            "Nova Attila Part 1.exe":               "../res/mods/total-war/ico/NovaAttila.ico",
            "Nova Attila Part 2.exe":               "../res/mods/total-war/ico/NovaAttila.ico",

            "Empire Total War II.rar":              "../res/mods/total-war/ico/EmpireII.ico",
            "Empire 2 Generals Part 1.exe":         "../res/mods/total-war/ico/Empire2General.ico",
            "Empire 2 Generals Part 2.exe":         "../res/mods/total-war/ico/Empire2General.ico",
            "Empire 2 Generals Part 3.exe":         "../res/mods/total-war/ico/Empire2General.ico",

            "ACW2 The American Civil War.exe":      "../res/mods/total-war/ico/ACW2.ico",
            "Field Command Napoleon.exe":           "../res/mods/total-war/ico/FieldCommand.ico",
            "Grand Battle Mod.exe":                 "../res/mods/total-war/ico/GrandBattle.ico",
            "Napoleonic Total War III.exe":         "../res/mods/total-war/ico/NapoleonicTotalWar3.ico",
            "The Great War.exe":                    "../res/mods/total-war/ico/TheGreatWar.ico",

            "War of the Gods.exe":                  "../res/mods/total-war/ico/WarofTheGods.ico",
            "Radious Total War.exe":                "../res/mods/total-war/ico/RadiousTotalWar.ico",
            "Medieval 1100AD.exe":                  "../res/mods/total-war/ico/Medieval1100AD.ico",
            "Divide et Impera.exe":                 "../res/mods/total-war/ico/DivideetImpera.ico",
            "Rome II Extra Modifications.exe":      "../res/mods/total-war/ico/TotalWarRome2Extras.ico",
            "Para Bellum Part 1.exe":               "../res/mods/total-war/ico/ParaBellum.ico",
            "Para Bellum Part 2.exe":               "../res/mods/total-war/ico/ParaBellum.ico",
            "Legendary Empires HD Part 1.exe":      "../res/mods/total-war/ico/LegendaryEmpiresHD.ico",
            "Legendary Empires HD Part 2.exe":      "../res/mods/total-war/ico/LegendaryEmpiresHD.ico",
            "Total War New World.exe":              "../res/mods/total-war/ico/TotalWarNewWorld.ico",

            "Last Alliance.exe":                    "../res/mods/total-war/ico/LastAlliance.ico",
            "Pike & Shot II.exe":                   "../res/mods/total-war/ico/PikeAndShotII.ico",
            "Rise of Empires.exe":                  "../res/mods/total-war/ico/RiseOfEmpires.ico",
            "Dragon Empire Part 1.exe":             "../res/mods/total-war/ico/DragonEmpire.ico",
            "Dragon Empire Part 2.exe":             "../res/mods/total-war/ico/DragonEmpire.ico",
            "Carlist Wars.exe":                     "../res/mods/total-war/ico/TotalFotS.ico",
            "Scramble of the Far East.exe":         "../res/mods/total-war/ico/TotalFotS.ico",

            "Thrones Extra Modifications.exe":      "../res/mods/total-war/ico/TotalWarThronesExtras.ico",
            "Age of Arthur.exe":                    "../res/mods/total-war/ico/AgeOfArthur.ico",
        },
        folderIconDefinitions: {},
        folderIconAssignments: {},
        customFolderIcons: {
            "15r5NfzciWGfClpGvmT5ydfH4fDbScVAl":    "../res/mods/total-war/ico/attila-logo.png",
            "1IsBsstw8TYRZ4FP_cl0ydaVLWRRjVbam":    "../res/mods/total-war/ico/empire-logo.png",
            "1NiLKxsM1tZUbYjYoquZ2cYVMWh-zAprN":    "../res/mods/total-war/ico/napoleon-logo.png",
            "14p-1KeG4OB5uYIWqH8yRScpyXRj0IaEb":    "../res/mods/total-war/ico/rome2-logo.png",
            "1zYVOwQN--y78iTUnku67DyABh5maAfV_":    "../res/mods/total-war/ico/shogun2-logo.png",
            "1vizoQOE_gq9rK9LgrxeNgFoikw75AX2h":    "../res/mods/total-war/ico/thrones-logo.png",

            "1aKdtU4523e-51o_hm7-QeHFVxIFJvzlv":    "../res/mods/total-war/ico/MedievelKingdoms1212AD.ico",
            "1Y44ajJaNdEea5QLvUnQr3nLnmLxBHZSv":    "../res/mods/total-war/ico/AnchientEmpires.ico",
            "1iNfu1THAgULCd3pGUVsQCNlnTHKx-JQY":    "../res/mods/total-war/ico/TheDawnlessDays.ico",
            "1ElTsIpzKxZHZoMm9rxDfv6-dZoPLPosV":    "../res/mods/total-war/ico/SevenKingdoms.ico",
            "1NHAPD9Si2PM058Vkam_80h-okIFs31S3":    "../res/mods/total-war/ico/NovaAttila.ico",
            "1h__AJylt5ZhfY_iN8d-lGqg-KuReRTdj":    "../res/mods/total-war/ico/Empire2General.ico",
            "1P9wPHHxDGGt3tUrEyukiYBf-_YIMJayF":    "../res/mods/total-war/ico/ParaBellum.ico",
            "1MsU5Q9-uQ23a0anq3ZsH4RdZ-0CkiAiU":    "../res/mods/total-war/ico/DragonEmpire.ico",
            "1QkAve8DnUDfCRi3EBpFqqXHddXtiTfmX":    "../res/mods/total-war/ico/TotalFotS.ico",
            "12X13ZZgUZ2R1YaPWDrHKkl3iGXSGl6kw":    "../res/mods/total-war/ico/LegendaryEmpiresHD.ico",
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
            "1QkAve8DnUDfCRi3EBpFqqXHddXtiTfmX",
        ],
        customDownloadLinks: {
            "1P9wPHHxDGGt3tUrEyukiYBf-_YIMJayF": "https://www.justkaarlo.com/download/total-war/package/ParaBellum-Package.exe",
            "1MsU5Q9-uQ23a0anq3ZsH4RdZ-0CkiAiU": "https://www.justkaarlo.com/download/total-war/package/DragonEmpire-Package.exe",
            "1h__AJylt5ZhfY_iN8d-lGqg-KuReRTdj": "https://www.justkaarlo.com/download/total-war/package/Empire2General-Package.exe",
            "1iNfu1THAgULCd3pGUVsQCNlnTHKx-JQY": "https://www.justkaarlo.com/download/total-war/package/DawnlessDays-Package.exe",
            "1NHAPD9Si2PM058Vkam_80h-okIFs31S3": "https://www.justkaarlo.com/download/total-war/package/NovaAttila-Package.exe",
            "1aKdtU4523e-51o_hm7-QeHFVxIFJvzlv": "https://www.justkaarlo.com/download/total-war/package/MK1212AD-Package.exe",
            "1Y44ajJaNdEea5QLvUnQr3nLnmLxBHZSv": "https://www.justkaarlo.com/download/total-war/package/AncientEmpires-Package.exe",
            "12X13ZZgUZ2R1YaPWDrHKkl3iGXSGl6kw": "https://www.justkaarlo.com/download/total-war/package/LegendaryEmpiresHD-Package.exe",
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