(function initializeFileLists() {
    const apiKey = "AIzaSyDqtsRN35V1JnmfIY9hTsn_Ej4aSipsK4M";
    const twRootFolderId = "10v2qU6Q01tZkyc7EuqGjz_YF_JA-AAiG";
    const twContainer = document.getElementById("tw-fileList");
    listFilesInFolder({
        folderId: twRootFolderId,
        container: twContainer,
        apiKey,
        customIcons: {
            "Seven Kingdoms.exe":                   "https://www.justkaarlo.com/Mods/src/filelist/icons/SevenKingdoms.ico",
            "Total War Skyrim.exe":                 "https://www.justkaarlo.com/Mods/src/filelist/icons/TotalWarSkyrim.ico",
            "Northern Kingdoms Remastered.exe":     "https://www.justkaarlo.com/Mods/src/filelist/icons/NorthernKingdomsRemastered.ico",
            "Attila Extra Modifications.exe":       "https://www.justkaarlo.com/Mods/src/filelist/icons/TotalWarAttilaExtras.ico",
            "Medieval Kingdoms 1212AD Part 1.exe":  "https://www.justkaarlo.com/Mods/src/filelist/icons/MedievelKingdoms1212AD.ico",
            "Medieval Kingdoms 1212AD Part 2.exe":  "https://www.justkaarlo.com/Mods/src/filelist/icons/MedievelKingdoms1212AD.ico",
            "Medieval Kingdoms 1212AD Part 3.exe":  "https://www.justkaarlo.com/Mods/src/filelist/icons/MedievelKingdoms1212AD.ico",
            "Medieval Kingdoms 1212AD Part 4.exe":  "https://www.justkaarlo.com/Mods/src/filelist/icons/MedievelKingdoms1212AD.ico",
            "Medieval Kingdoms 1212AD Part 5.exe":  "https://www.justkaarlo.com/Mods/src/filelist/icons/MedievelKingdoms1212AD.ico",
            "Ancient Empires Part 1.exe":           "https://www.justkaarlo.com/Mods/src/filelist/icons/AnchientEmpires.ico",
            "Ancient Empires Part 2.exe":           "https://www.justkaarlo.com/Mods/src/filelist/icons/AnchientEmpires.ico",
            "Ancient Empires Part 3.exe":           "https://www.justkaarlo.com/Mods/src/filelist/icons/AnchientEmpires.ico",
            "Ancient Empires Part 4.exe":           "https://www.justkaarlo.com/Mods/src/filelist/icons/AnchientEmpires.ico",
            "The Dawnless Days Part 1.exe":         "https://www.justkaarlo.com/Mods/src/filelist/icons/TheDawnlessDays.ico",
            "The Dawnless Days Part 2.exe":         "https://www.justkaarlo.com/Mods/src/filelist/icons/TheDawnlessDays.ico",
            "The Dawnless Days Part 3.exe":         "https://www.justkaarlo.com/Mods/src/filelist/icons/TheDawnlessDays.ico",
            "Nova Attila Part 1.exe":               "https://www.justkaarlo.com/Mods/src/filelist/icons/NovaAttila.ico",
            "Nova Attila Part 2.exe":               "https://www.justkaarlo.com/Mods/src/filelist/icons/NovaAttila.ico",

            "Empire Total War II v4.5.rar":         "https://www.justkaarlo.com/Mods/src/filelist/icons/EmpireII.ico",
            "Empire 2 Generals Part 1.exe":         "https://www.justkaarlo.com/Mods/src/filelist/icons/Empire2General.ico",
            "Empire 2 Generals Part 2.exe":         "https://www.justkaarlo.com/Mods/src/filelist/icons/Empire2General.ico",
            "Empire 2 Generals Part 3.exe":         "https://www.justkaarlo.com/Mods/src/filelist/icons/Empire2General.ico",

            "ACW2 The American Civil War.exe":      "https://www.justkaarlo.com/Mods/src/filelist/icons/ACW2.ico",
            "Field Command Napoleon.exe":           "https://www.justkaarlo.com/Mods/src/filelist/icons/FieldCommand.ico",
            "Grand Battle Mod.exe":                 "https://www.justkaarlo.com/Mods/src/filelist/icons/GrandBattle.ico",
            "Napoleonic Total War III.exe":         "https://www.justkaarlo.com/Mods/src/filelist/icons/NapoleonicTotalWar3.ico",

            "War of the Gods.exe":                  "https://www.justkaarlo.com/Mods/src/filelist/icons/WarofTheGods.ico",
            "Radious Total War.exe":                "https://www.justkaarlo.com/Mods/src/filelist/icons/RadiousTotalWar.ico",
            "Medieval 1100AD.exe":                  "https://www.justkaarlo.com/Mods/src/filelist/icons/Medieval1100AD.ico",
            "Divide et Impera.exe":                 "https://www.justkaarlo.com/Mods/src/filelist/icons/DivideetImpera.ico",
            "Rome II Extra Modifications.exe":      "https://www.justkaarlo.com/Mods/src/filelist/icons/TotalWarRome2Extras.ico",
            "Para Bellum Part 1.exe":               "https://www.justkaarlo.com/Mods/src/filelist/icons/ParaBellum.ico",
            "Para Bellum Part 2.exe":               "https://www.justkaarlo.com/Mods/src/filelist/icons/ParaBellum.ico",

            "Last Alliance.exe":                    "https://www.justkaarlo.com/Mods/src/filelist/icons/LastAlliance.ico",
            "Pike & Shot II.exe":                   "https://www.justkaarlo.com/Mods/src/filelist/icons/PikeAndShotII.ico",
            "Rise of Empires.exe":                  "https://www.justkaarlo.com/Mods/src/filelist/icons/RiseOfEmpires.ico",
            "Dragon Empire Part 1.exe":             "https://www.justkaarlo.com/Mods/src/filelist/icons/DragonEmpire.ico",
            "Dragon Empire Part 2.exe":             "https://www.justkaarlo.com/Mods/src/filelist/icons/DragonEmpire.ico",
            "Carlist Wars.exe":                     "https://www.justkaarlo.com/Mods/src/filelist/icons/TotalFotS.ico",
            "Scramble of the Far East.exe":         "https://www.justkaarlo.com/Mods/src/filelist/icons/TotalFotS.ico",

            "Thrones Extra Modifications.exe":      "https://www.justkaarlo.com/Mods/src/filelist/icons/TotalWarThronesExtras.ico",
            "Age of Arthur.exe":                    "https://www.justkaarlo.com/Mods/src/filelist/icons/AgeOfArthur.ico",
        },
        customFolderIcons: {
            "15r5NfzciWGfClpGvmT5ydfH4fDbScVAl":    "https://www.justkaarlo.com/Mods/src/TW/attila-logo.png",
            "1IsBsstw8TYRZ4FP_cl0ydaVLWRRjVbam":    "https://www.justkaarlo.com/Mods/src/TW/empire-logo.png",
            "1NiLKxsM1tZUbYjYoquZ2cYVMWh-zAprN":    "https://www.justkaarlo.com/Mods/src/TW/napoleon-logo.png",
            "14p-1KeG4OB5uYIWqH8yRScpyXRj0IaEb":    "https://www.justkaarlo.com/Mods/src/TW/rome2-logo.png",
            "1zYVOwQN--y78iTUnku67DyABh5maAfV_":    "https://www.justkaarlo.com/Mods/src/TW/shogun2-logo.png",
            "1vizoQOE_gq9rK9LgrxeNgFoikw75AX2h":    "https://www.justkaarlo.com/Mods/src/TW/thrones-logo.png",

            "1aKdtU4523e-51o_hm7-QeHFVxIFJvzlv":    "https://www.justkaarlo.com/Mods/src/filelist/icons/MedievelKingdoms1212AD.ico",
            "1Y44ajJaNdEea5QLvUnQr3nLnmLxBHZSv":    "https://www.justkaarlo.com/Mods/src/filelist/icons/AnchientEmpires.ico",
            "1iNfu1THAgULCd3pGUVsQCNlnTHKx-JQY":    "https://www.justkaarlo.com/Mods/src/filelist/icons/TheDawnlessDays.ico",
            "1ElTsIpzKxZHZoMm9rxDfv6-dZoPLPosV":    "https://www.justkaarlo.com/Mods/src/filelist/icons/SevenKingdoms.ico",
            "1NHAPD9Si2PM058Vkam_80h-okIFs31S3":    "https://www.justkaarlo.com/Mods/src/filelist/icons/NovaAttila.ico",
            "1h__AJylt5ZhfY_iN8d-lGqg-KuReRTdj":    "https://www.justkaarlo.com/Mods/src/filelist/icons/Empire2General.ico",
            "1P9wPHHxDGGt3tUrEyukiYBf-_YIMJayF":    "https://www.justkaarlo.com/Mods/src/filelist/icons/ParaBellum.ico",
            "1MsU5Q9-uQ23a0anq3ZsH4RdZ-0CkiAiU":    "https://www.justkaarlo.com/Mods/src/filelist/icons/DragonEmpire.ico",
            "1MsU5Q9-uQ23a0anq3ZsH4RdZ-0CkiAiU":    "https://www.justkaarlo.com/Mods/src/filelist/icons/DragonEmpire.ico",
            "1QkAve8DnUDfCRi3EBpFqqXHddXtiTfmX":    "https://www.justkaarlo.com/Mods/src/filelist/icons/TotalFotS.ico",
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
        downloadButtonFiles: [
            "Attila Extra Modifications.exe",
            "Seven Kingdoms.exe",
            "Total War Skyrim.exe",
            "Northern Kingdoms Remastered.exe",

            "Empire Total War II v4.5.rar",

            "ACW2 The American Civil War.exe",
            "Field Command Napoleon.exe",
            "Grand Battle Mod.exe",
            "Napoleonic Total War III.exe",

            "Rome II Extra Modifications.exe",
            "Divide et Impera.exe",
            "Medieval 1100AD.exe",
            "Radious Total War.exe",
            "War of the Gods.exe",

            "Last Alliance.exe",
            "Pike & Shot II.exe",
            "Rise of Empires.exe",
            "Carlist Wars.exe",
            "Scramble of the Far East.exe",

            "Thrones Extra Modifications.exe",
            "Age of Arthur.exe",
        ],
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
            "1P9wPHHxDGGt3tUrEyukiYBf-_YIMJayF": "https://drive.usercontent.google.com/download?id=1Vx5468IueYzpkM2mDf6bvozx6KXhvWoE&export=download&authuser=0",
        },
        showDownloadButtonAtRoot: true
    });
    attachDocPreview(twContainer);

    const erRootFolderId = "1QAOW3qPeIHWinvsQmECyfccTZjavI7mA";
    const erContainer = document.getElementById("fileList");
    listFilesInFolder({
        folderId: erRootFolderId,
        container: erContainer,
        apiKey,
        customIcons: {
            "Convergence (2.2.3).zip": "https://www.justkaarlo.www/Mods/src/filelist/Convergence.ico"
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
})();