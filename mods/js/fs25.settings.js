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
        customIcons: {},
        customFolderIcons: {
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "../res/src/fs25-logo-small.png",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs": "../res/src/fs25-maps.png",
        },
        highlightFiles: [],
        colorizeFiles: [],
        excludePartsFolders: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs",
        ],
        folderGradientFallback: {},
        showDownloadButtonForAllFiles: true,
        downloadButtonFiles: [],
        excludeDownloadFiles: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs",
        ],
        customDownloadLinks: {},
        customWebsiteLinks: {
            "1NQJdjAjXB8c5We33KuXdPltBGM6qQgpT": "https://www.kingmods.net/en/profile/fs-miner",
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "https://www.kingmods.net/en/fs25/new-mods",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs": "https://www.kingmods.net/en/fs25/categories/maps",
            "FS25_TowingChain.zip": "https://www.kingmods.net/en/fs25/mods/66050/towing-chain-with-hook",
            "FS25_dice.zip": "https://www.kingmods.net/en/fs25/mods/70469/dice-extra-slot-machine",
            "FS25_TransactionLog.zip": "https://www.kingmods.net/en/fs25/mods/69362/transaction-log",
            "FS25_TaskList.zip": "https://www.kingmods.net/en/fs25/mods/66090/task-list",
        },
        tooltipData: {
            "FS25_rootCropStorage.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/root-crop-storage-fs25-xag1c.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/root-crop-storage-fs25-SlsuP.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/root-crop-storage-fs25-fU882.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/root-crop-storage-fs25-C9NTN.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/root-crop-storage-fs25-n7vKG.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/root-crop-storage-fs25-sz9hQ.jpg",
                ],
                description: "This building is for storage of Potatoes, Beets, Carrots, Parsnips and Beetroots. This building functions like a Silo or Hayloft, but for root crops."
            },
            "FS25_TowingChain.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/towing-chain-with-hook-fs25-K3nei.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/towing-chain-with-hook-fs25-u8A25.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/towing-chain-with-hook-fs25-eIH1Q.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/towing-chain-with-hook-fs25-Xwo1N.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/towing-chain-with-hook-fs25-PHh1I.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/towing-chain-with-hook-fs25-3EQpM.jpg",
                ],
                description: "With this mod you can tow vehicles by towing chain. You can also mount a towing hook to vehicles that have no attacher and then attach the towing chain to this hook."
            },
            "FS25_dice.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/dice-extra-slot-machine-fs25-LeKyR.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/dice-extra-slot-machine-fs25-ho87s.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/dice-extra-slot-machine-fs25-dGnL5.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/dice-extra-slot-machine-fs25-h9OUL.jpg",
                ],
                description: "This is a reality-based slot machine, you have to put money in it, there is 50 euros worth of money and 13 euros worth of money, you choose how much you put in."
            },
            "FS25_Piccin_MODBT11.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/piccin-advanced-mod-bt-11-fs25-6QMk2.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/piccin-advanced-mod-bt-11-fs25-4MnaH.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/piccin-advanced-mod-bt-11-fs25-m3CHk.jpg",
                ],
                description: ""
            },
            "FS25_n0tLizardNeoPack.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/lizard-neo-pack-fs25-Ggz0c.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/lizard-neo-pack-fs25-ZbGvp.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/lizard-neo-pack-fs25-eg65e.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/lizard-neo-pack-fs25-HuyFj.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/lizard-neo-pack-fs25-A9gk3.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/lizard-neo-pack-fs25-EbUlv.jpg",
                ],
                description: ""
            },
            "FS25_Bednar_Terraland.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/bednar-terraland-fs25-4Zciv.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/bednar-terraland-fs25-kXqSK.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/bednar-terraland-fs25-puVt6.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/bednar-terraland-fs25-RM5t5.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/bednar-terraland-fs25-VWQfF.jpg",
                ],
                description: ""
            },
            "FS25_DeutzS9_AgrarTec.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/deutz-fahr-sieries-9-agrar-tec-fs25-q07oC.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/deutz-fahr-sieries-9-agrar-tec-fs25-TRxll.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/deutz-fahr-sieries-9-agrar-tec-fs25-KESX6.jpg",
                ],
                description: ""
            },
            "FS25_JohnDeereGator6x4.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-gator-th-6x4-fs25-DCBsK.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-gator-th-6x4-fs25-WXysT.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-gator-th-6x4-fs25-ORl13.jpg",
                ],
                description: ""
            },
            "FS25_JohnDeere_Ripper2100.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-2100-ripper-fs25-kUznv.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-2100-ripper-fs25-DdbNa.jpg",
                ],
                description: ""
            },
            "FS25_CaseEcoloTil2500.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/case-ecolo-til-2500-fs25-LOHAk.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/case-ecolo-til-2500-fs25-GtOp7.jpg",
                ],
                description: ""
            },
            "FS25_TransactionLog.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/transaction-log-fs25-JuVNK.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/transaction-log-fs25-JuVNK.jpg",
                ],
                description: ""
            },
            "FS25_TaskList.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/task-list-fs25-2v94x.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/task-list-fs25-ls7KR.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/task-list-fs25-TQemW.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/task-list-fs25-YNdVr.jpg",
                ],
                description: ""
            },
            "FS25_JD_8R_Series2022_SpezialEdition.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-8r-series-2022-special-edition-fs25-3LpDH.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-8r-series-2022-special-edition-fs25-t3wDc.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-8r-series-2022-special-edition-fs25-Duv05.jpg",
                ],
                description: ""
            },
            "FS25_JohnDeere_8030.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-8530-edit-fs25-SsF79.jpg",
                ],
                description: ""
            },
            "FS25_JohnDeere8R_WG.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-8r-series-wirtgen-group-edition-fs25-NVSns.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-8r-series-wirtgen-group-edition-fs25-Tfa3e.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-8r-series-wirtgen-group-edition-fs25-If0Rt.jpg",
                ],
                description: ""
            },
            "FS25_JohnDeere_8RX.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-8rx-special-fs25-MG86y.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-8rx-special-fs25-43P2a.jpg",
                ],
                description: ""
            },
            "FS25_FS19RewrittenPack_A_G.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/fs19-vehicles-and-tools-a-g-fs25-UAEXA.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/fs19-vehicles-and-tools-a-g-fs25-sXsuE.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/fs19-vehicles-and-tools-a-g-fs25-WISv7.jpg",
                ],
                description: ""
            },
            "FS25_FS22RewrittenPack_A_C.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/vehicles-and-tools-pack-a-c-fs25-H9RCV.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/vehicles-and-tools-pack-a-c-fs25-VYJbr.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/vehicles-and-tools-pack-a-c-fs25-Wmazx.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/vehicles-and-tools-pack-a-c-fs25-rSs6v.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/vehicles-and-tools-pack-a-c-fs25-lUXZ0.jpg",
                ],
                description: ""
            },
            "FS25_FS19RewrittenPack_H_K.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/fs19-vehicles-and-tools-h-k-fs25-1u65V.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/fs19-vehicles-and-tools-h-k-fs25-mbFi9.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/fs19-vehicles-and-tools-h-k-fs25-i1BZA.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/fs19-vehicles-and-tools-h-k-fs25-T6xPk.jpg",
                ],
                description: ""
            },
            "FS25_Yurg_Custom_Pack.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/yurgs-custom-pack-fs25-kAs1i.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/yurgs-custom-pack-fs25-kAs1i.jpg",
                ],
                description: ""
            },
            "FS25_Grimme_KS754.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/grimme-ks754-fs25-lJAJJ.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/grimme-ks754-fs25-3uKGf.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/grimme-ks754-fs25-nogiK.jpg",
                ],
                description: ""
            },
            "FS25_harvestgiant.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/lizard-harvestgiant-fs25-ogaGh.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/lizard-harvestgiant-fs25-EfrQP.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/lizard-harvestgiant-fs25-TmTR7.jpg",
                ],
                description: ""
            },
            "FS25_ROPA_Multifruit.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/ropa-6s-900-ps1000000-l-multifruchte-fs25-KC7K1.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ropa-6s-900-ps1000000-l-multifruchte-fs25-N5A5Y.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ropa-6s-900-ps1000000-l-multifruchte-fs25-uOQR7.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ropa-6s-900-ps1000000-l-multifruchte-fs25-HppQA.jpg",
                ],
                description: ""
            },
            "tiger6S.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/ropa-tiger-6s-fs25-kYtSa.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ropa-tiger-6s-fs25-M5oRf.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ropa-tiger-6s-fs25-TCc3Y.jpg",
                ],
                description: ""
            },
            "FS25_Hirschfeld_Dewulf_ZKIVSE_by_HIP_Marco.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/dewulf-4-row-harvester-fs25-utHjT.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/dewulf-4-row-harvester-fs25-tGTcG.jpg",
                ],
                description: ""
            },
            "FS25_Hirschfeld_Oxbow_Ernter_by_BadBoy.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/oxbo-vegetable-harvesters-fs25-y1gk5.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/oxbo-vegetable-harvesters-fs25-mxbkQ.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/oxbo-vegetable-harvesters-fs25-VxsoL.jpg",
                ],
                description: ""
            },
            "FS25_HomeMade_Lizard2.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/homemade-lizard-fork-2-fs25-UWCli.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/homemade-lizard-fork-2-fs25-56pnw.jpg",
                ],
                description: ""
            },
            "FS25_John_Deere_CS770.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-cs-770-fs25-54fFE.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/john-deere-cs-770-fs25-VIZpJ.jpg",
                ],
                description: ""
            },
            "FS25_JactoByConnect_Pack.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/jacto-by-connect-pack-fs25-7N8Ip.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/jacto-by-connect-pack-fs25-7N8Ip.jpg",
                ],
                description: ""
            },
            "FS25_JactoPack.zip": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/jacto-pack-fs25-uhMky.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/jacto-pack-fs25-20hky.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/jacto-pack-fs25-iUNcm.jpg",
                ],
                description: ""
            },
        },
        showDownloadButtonAtRoot: true,
        customDisplayNames: {
            "FS25_Bednar_Terraland.zip": "Bednar Terraland",
            "FS25_dice.zip": "Dice Extra Slot machine",
            "FS25_n0tLizardNeoPack.zip": "Lizard Neo Pack",
            "FS25_Piccin_MODBT11.zip": "Piccin Advanced Mod BT 11",
            "FS25_TowingChain.zip": "Towing Chain With Hook",
            "FS25_DeutzS9_AgrarTec.zip": "Deutz-Fahr Sieries 9 - Agrar-Tec",
            "FS25_JohnDeereGator6x4.zip": "John Deere Gator TH 6x4",
            "FS25_JohnDeere_Ripper2100.zip": "John Deere 2100 Ripper",
            "FS25_CaseEcoloTil2500.zip": "Case Ecolo-Til 2500",
            "FS25_TransactionLog.zip": "Transaction Log",
            "FS25_TaskList.zip": "Task List",
            "FS25_JD_8R_Series2022_SpezialEdition.zip": "John Deere 8R Series 2022 Special Edition",
            "FS25_JohnDeere_8030.zip": "John Deere 8530 Edit",
            "FS25_JohnDeere8R_WG.zip": "John Deere 8R Series Wirtgen Group Edition",
            "FS25_JohnDeere_8RX.zip": "John Deere 8RX Special",
            "FS25_FS19RewrittenPack_A_G": "FS19 Vehicles and Tools (A-G)",
            "FS25_FS19RewrittenPack_H_K.zip": "FS19 Vehicles and Tools (H-K)",
            "FS25_FS22RewrittenPack_A_C.zip": "FS22 Vehicles and Tools Pack (A-C)",
            "FS25_Yurg_Custom_Pack.zip": "Yurg's Custom Pack",
            "FS25_Grimme_KS754.zip": "Grimme KS754",
            "FS25_harvestgiant.zip": "LIZARD Harvest GIANT",
            "FS25_ROPA_Multifruit.zip": "Ropa 6S (900 PS/1.000.000 l) Multifrüchte",
            "tiger6S.zip": "Ropa Tiger 6S",
            "FS25_Hirschfeld_Dewulf_ZKIVSE_by_HIP_Marco.zip": "Dewulf 4-Row Harvester",
            "FS25_Hirschfeld_Oxbow_Ernter_by_BadBoy.zip": "Oxbo vegetable harvesters",
            "FS25_HomeMade_Lizard2.zip": "HomeMade Lizard Fork 2",
            "FS25_John_Deere_CS770.zip": "John Deere CS 770",
            "FS25_JactoByConnect_Pack.zip": "Jacto By Connect Pack",
            "FS25_JactoPack.zip": "Jacto Pack (Recommended)",
        },
        customTags: {
            // "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": [
            //     { text: "Bright", color: "#FF0000", opacity: 0.8, textOpacity: 1.0 },
            //     { text: "Subtle", color: "#00FF00", opacity: 0.3, textOpacity: 0.6 },
            //     { text: "Ghost", color: "#0000FF", opacity: 0.2, textOpacity: 0.4 }
            // ]
        },
        hideAllSizeTags: false,
        hideSizeTagFiles: [],
        hideSizeTagFolders: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1POXftu49rQW6coDWMVnpaQbLu7PrWEXs",
        ],
    });
    attachDocPreview(fsContainer);
})()