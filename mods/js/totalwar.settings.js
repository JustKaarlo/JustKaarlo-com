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
            "Seven Kingdoms.exe":                   "../res/mods/total-war/ico/SevenKingdoms.ico",
            "Total War Skyrim.exe":                 "../res/mods/total-war/ico/TotalWarSkyrim.ico",
            "Northern Kingdoms Remastered.exe":     "../res/mods/total-war/ico/NorthernKingdomsRemastered.ico",
            "Ice & Fire War of Westeros.exe":       "../res/mods/total-war/ico/Ice&Fire.ico",
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
            "Eldirath Total War Part 1.exe":        "../res/mods/total-war/ico/EldirathTotalWar.ico",
            "Eldirath Total War Part 2.exe":        "../res/mods/total-war/ico/EldirathTotalWar.ico",
            "Medieval Warfare.rar":                 "../res/mods/total-war/ico/MedievalWarfare.ico",

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
            "Total War ATTILA":                     "../res/mods/total-war/ico/attila-logo.png",
            "Total War EMPIRE":                     "../res/mods/total-war/ico/empire-logo.png",
            "Total War NAPOLEON":                   "../res/mods/total-war/ico/napoleon-logo.png",
            "Total War ROME II":                    "../res/mods/total-war/ico/rome2-logo.png",
            "Total War SHOGUN 2":                   "../res/mods/total-war/ico/shogun2-logo.png",
            "Total War THRONES OF BRITANNIA":       "../res/mods/total-war/ico/thrones-logo.png",

            "Medieval Kingdoms 1212AD":             "../res/mods/total-war/ico/MedievelKingdoms1212AD.ico",
            "Ancient Empires":                      "../res/mods/total-war/ico/AnchientEmpires.ico",
            "The Dawnless Days5":                   "../res/mods/total-war/ico/TheDawnlessDays.ico",
            "Nova Attila":                          "../res/mods/total-war/ico/NovaAttila.ico",
            "Empire 2 Generals":                    "../res/mods/total-war/ico/Empire2General.ico",
            "Para Bellum":                          "../res/mods/total-war/ico/ParaBellum.ico",
            "Dragon Empire":                        "../res/mods/total-war/ico/DragonEmpire.ico",
            "Total FotS":                           "../res/mods/total-war/ico/TotalFotS.ico",
            "Legendary Empires HD":                 "../res/mods/total-war/ico/LegendaryEmpiresHD.ico",
            "Eldirath Total War":                   "../res/mods/total-war/ico/EldirathTotalWar.ico",
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
            "Total War ATTILA",
            "Total War EMPIRE",
            "Total War NAPOLEON",
            "Total War ROME II",
            "Total War SHOGUN 2",
            "Total War THRONES OF BRITANNIA",
        ],
        folderGradientFallback: {},
        showDownloadButtonForAllFiles: true,
        downloadButtonFiles: [],
        excludeDownloadFiles: [
            "Total War ATTILA",
            "Total War EMPIRE",
            "Total War NAPOLEON",
            "Total War ROME II",
            "Total War SHOGUN 2",
            "Total War THRONES OF BRITANNIA",

            "Ancient Empires",
            "Eldirath Total War",
            "Medieval Kingdoms 1212AD",
            "Nova Attila",
            "The Dawnless Days",
            "Empire 2 Generals",
            "Legendary Empires HD",
            "Para Bellum",
            "Dragon Empire",
            "Total FotS",
        ],
        customDownloadLinks: {},
        customWebsiteLinks: {},
        tooltipData: {
            "Attila Extra Modifications.exe": {
                description: "<b>Includes</b><br><code><b>Blood & Gore DLC Better Performance</b></code><br><code><b>Custom Battle Crash Fix</b></code><br><code><b>Massive Battles Better Perfomance</b></code><br><code><b>Additional Units Pack</b></code><br><code><b>Age of Vikings</b></code><br><code><b>TDD Remove Unit Caps</b></code><br><code><b>I&F Remove Unit Caps</b></code><br><code><b>Olympian Battle Camera</b></code><br><code><b>Attila Ultimate Animations</b></code>"
            },
            "Rome II Extra Modifications.exe": {
                description: "<b>Includes</b><br><code><b>Ados Trojan Units</b></code><br><code><b>Crassus Roman Reskin</b></code><br><code><b>Nordos 3D Units Cards</b></code><br><code><b>Nordos Faction Unlocker</b></code><br><code><b>Nordos Units Compilation</b></code><br><code><b>Simple Greek Reskin</b></code><br><code><b>Simple Roman Reskin</b></code><br><code><b>Unit Icons Pack</b></code><br><code><b>Units Super Pack</b></code>"
            },
            "Thrones Extra Modifications.exe": {
                description: "<b>Includes</b><br><code><b>Anno Domini - 878 Units Reskins</b></code><br><code><b>GB Mercenary Addition</b></code><br><code><b>Massive Battle Better Performance</b></code><br><code><b>Owens Unlock All Factions</b></code><br><code><b>ThreeKingdoms Units Shapes</b></code><br><code><b>Thrones Reforged</b></code><br><code><b>TOB Ultimate Animations</b></code><br><code><b>Unique Units Expansion</b></code>"
            },
        },
        showDownloadButtonAtRoot: false,
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