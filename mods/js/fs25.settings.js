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
            "FS25_Piccin_MODBT11.zip": "https://www.kingmods.net/en/fs25/mods/69804/piccin-advanced-mod-bt-11",
            "FS25_n0tLizardNeoPack.zip": "https://www.kingmods.net/en/fs25/mods/65192/lizard-neo-pack",
            "FS25_Bednar_Terraland.zip": "https://www.kingmods.net/en/fs25/mods/68816/bednar-terraland",
            "FS25_DeutzS9_AgrarTec.zip": "https://www.kingmods.net/en/fs25/mods/59330/deutz-fahr-sieries-9-agrar-tec",
            "FS25_JohnDeereGator6x4.zip": "https://www.kingmods.net/en/fs25/mods/70597/john-deere-gator-th-6x4",
            "FS25_JohnDeere_Ripper2100.zip": "https://www.kingmods.net/en/fs25/mods/69950/john-deere-2100-ripper",
            "FS25_CaseEcoloTil2500.zip": "https://www.kingmods.net/en/fs25/mods/69710/case-ecolo-til-2500",
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
        },
        customTags: {
            "FS25_Bednar_Terraland.zip": [ { text: "Equipment", color: "#539b0bff", opacity: 0.2, textOpacity: 0.65 } ],
            "FS25_CaseEcoloTil2500.zip": [ { text: "Equipment", color: "#539b0bff", opacity: 0.2, textOpacity: 0.65 } ],
            "FS25_JohnDeere_Ripper2100.zip": [ { text: "Equipment", color: "#539b0bff", opacity: 0.2, textOpacity: 0.65 } ],
            "FS25_n0tLizardNeoPack.zip": [ { text: "Equipment", color: "#539b0bff", opacity: 0.2, textOpacity: 0.65 } ],
            "FS25_Piccin_MODBT11.zip": [ { text: "Equipment", color: "#539b0bff", opacity: 0.2, textOpacity: 0.65 } ],

            "FS25_DeutzS9_AgrarTec.zip": [ { text: "Vehicle", color: "#57a20cff", opacity: 0.2, textOpacity: 0.65 } ],
            "FS25_JohnDeereGator6x4.zip": [ { text: "Vehicle", color: "#57a20cff", opacity: 0.2, textOpacity: 0.65 } ],

            "FS25_TowingChain.zip": [ { text: "Utilities", color: "#7d9664ff", opacity: 0.2, textOpacity: 0.65 } ],

            "FS25_dice.zip": [ { text: "Other", color: "#7d9664ff", opacity: 0.2, textOpacity: 0.65 } ],
            
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