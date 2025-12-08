(function initializeFS25FileList() {
    const apiKey = "__API_KEY__";
    const fsRootFolderId = "1EqzEAoB3zUuDiAfA81DNmqQh97mH8ISR";
    const fsContainer = document.getElementById("fs-fileList");

    // CUSTOM CONSTANTS
    const numMapsArray = Array.from({ length: 50 }, (_, i) => `map-${i + 1}`);

    const TopFx = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M238.7,73.5A15.9,15.9,0,0,0,222,71.2L171.4,93.7,142,40.7a16.1,16.1,0,0,0-28,0l-29.4,53L34,71.2A16,16,0,0,0,11.9,89.5L37.3,197.8a15.9,15.9,0,0,0,7.4,10.1,16.2,16.2,0,0,0,8.3,2.3,15.2,15.2,0,0,0,4.2-.6,265.5,265.5,0,0,1,141.5,0,16.5,16.5,0,0,0,12.5-1.7,15.6,15.6,0,0,0,7.4-10.1L244.1,89.5A16,16,0,0,0,238.7,73.5Z"/></svg>`;

    if (!fsContainer) {
        console.error("file list container not found");
        return;
    }

    listFilesInFolder({
        folderId: fsRootFolderId,
        container: fsContainer,
        apiKey,
        iconDefinitions: {
            "ItemFxIcon": "../res/src/fs25-side-fx.png",
        },
        iconAssignments: {
            "ItemFxIcon": [
                ...numMapsArray,
                "ZZZ_FS25_FilltypesTP_for_all.zip",
            ],
        },
        customIcons: {},
        folderIconDefinitions: {
            "OthersCategory": "../res/src/fs25-others.png",
            "MapsCategory": "../res/src/fs25-maps.png",
            "TexturesCategory": "../res/src/fs25-textures.png",
        },
        folderIconAssignments: {
            "OthersCategory": [
                "1Vtso3y0kFlJt8hi1ZlTFhtFolDVTxNj_",
            ],
            "MapsCategory": [],
            "TexturesCategory": [],
        },
        customFolderIcons: {
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "../res/src/fs25-logo-small.png",
        },
        highlightFiles: [],
        colorizeFiles: [],
        excludePartsFolders: [],
        folderGradientFallback: {},
        showDownloadButtonForAllFiles: true,
        downloadButtonFiles: [],
        excludeDownloadFiles: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1Vtso3y0kFlJt8hi1ZlTFhtFolDVTxNj_",
            "fs25-maps",
            ...numMapsArray,
        ],
        customDownloadLinks: {
            "ZZZ_FS25_FilltypesTP_for_all.zip": "https://raw.githubusercontent.com/JustKaarlo/justkaarlo.github.io/refs/heads/Home/data/fs25/ZZZ_FS25_FilltypesTP_for_all.zip",
        },
        customWebsiteLinks: {
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ": "https://www.kingmods.net/en/fs25/new-mods",
            "1Vtso3y0kFlJt8hi1ZlTFhtFolDVTxNj_": "https://www.kingmods.net/en/fs25/categories/miscellaneous/other-mods",
            "fs25-maps": "https://www.kingmods.net/en/fs25/categories/maps",

            "map-1": "https://www.kingmods.net/en/fs25/mods/71475/map-1-20-4x",
            "map-2": "https://www.kingmods.net/en/fs25/mods/71098/am-nord-ostsee-kanal-4x",
            "map-3": "https://www.kingmods.net/en/fs25/mods/69427/back-roads-county-4x",
            "map-4": "https://www.kingmods.net/en/fs25/mods/60427/freche-dachskarte-4x",
            "map-5": "https://www.kingmods.net/en/fs25/mods/63643/huron-county-16x",
            "map-6": "https://www.kingmods.net/en/fs25/mods/67169/judith-plains-montana-4x",
            "map-7": "https://www.kingmods.net/en/fs25/mods/70264/la-plaine",
            "map-8": "https://www.kingmods.net/en/fs25/mods/63925/lenkovtsy-4x",
            "map-9": "https://www.kingmods.net/en/fs25/mods/62246/nf-marsch-4x",
            "map-10": "https://www.kingmods.net/en/fs25/mods/69094/saxlingham",
            "map-11": "https://www.kingmods.net/en/fs25/mods/62944/schwesing-bahnhof",
            "map-12": "https://www.kingmods.net/en/fs25/mods/70646/nietwerder-4x-multifruit",
            "map-13": "https://www.kingmods.net/en/fs25/mods/69994/wernolau-farm",
            "map-14": "https://www.kingmods.net/en/fs25/mods/68707/sivita",
            "map-15": "https://www.kingmods.net/en/fs25/mods/68888/polesine",
            "map-16": "https://www.kingmods.net/en/fs25/mods/65766/vojvodina-gornje-podunavlje",
            "map-17": "https://www.kingmods.net/en/fs25/mods/64100/rettenbach-plus",
            "map-18": "https://www.kingmods.net/en/fs25/mods/71702/des-cagouilles-dans-lgarouil",
            "map-19": "https://www.kingmods.net/en/fs25/mods/60554/garbindel",
            "map-20": "https://www.kingmods.net/en/fs25/mods/65584/rancho-fundo",
            "map-21": "https://www.kingmods.net/en/fs25/mods/63901/sickinger-hohe-rheinland-pfalz",
            "map-22": "https://www.kingmods.net/en/fs25/mods/62939/feliz",
            "map-23": "https://www.kingmods.net/en/fs25/mods/63497/silverrun-forest",
            "map-24": "https://www.kingmods.net/en/fs25/mods/67047/agroforests",
            "map-25": "https://www.kingmods.net/en/fs25/mods/67330/maypole-farm",
            "map-26": "https://www.kingmods.net/en/fs25/mods/67069/alpenvorland",
            "map-27": "https://www.kingmods.net/en/fs25/mods/66584/suvalkija-lowlands",
            "map-28": "https://www.kingmods.net/en/fs25/mods/63457/the-memory",
            "map-29": "https://www.kingmods.net/en/fs25/mods/68882/north-march-reloaded",
            "map-30": "https://www.kingmods.net/en/fs25/mods/71384/chadlington",
            "map-31": "https://www.kingmods.net/en/fs25/mods/69044/krampus-valley-2025",
            "map-32": "https://www.kingmods.net/en/fs25/mods/66648/forest-valley",
            "map-33": "https://www.kingmods.net/en/fs25/mods/66126/les-terres-campagnardes",
            "map-34": "https://www.kingmods.net/en/fs25/mods/62708/pallegney",
            "map-35": "https://www.kingmods.net/en/fs25/mods/70517/la-map-du-vexin",
            "map-36": "https://www.kingmods.net/en/fs25/mods/68622/la-riviere",
            "map-37": "https://www.kingmods.net/en/fs25/mods/70997/silverrun-forest-multifruit-edition",
            "map-38": "https://www.kingmods.net/en/fs25/mods/72028/pgr-bruzda",
            "map-39": "https://www.kingmods.net/en/fs25/mods/70020/landkreis-niedersachsen",
            "map-40": "https://www.kingmods.net/en/fs25/mods/65504/rhonplateu",
            "map-41": "https://www.kingmods.net/en/fs25/mods/72393/geistal",
            "map-42": "https://www.kingmods.net/en/fs25/mods/72634/monteriggioni",
            "map-43": "https://www.kingmods.net/en/fs25/mods/71764/ausseerland-4x",
            "map-44": "https://www.kingmods.net/en/fs25/mods/72330/ardennaise",
            "map-45": "https://www.kingmods.net/en/fs25/mods/65197/oberschwaben",

            "ZZZ_FS25_FilltypesTP_for_all.zip": "https://www.patreon.com/posts/fs25-filltypestp-139915899",
        },
        tooltipData: {
            // CUSTOM FILES
            "map-1": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/thuringen-20-4x-fs25-hJdoz.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/thuringen-20-4x-fs25-n8Qw3.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/thuringen-20-4x-fs25-2BY3J.jpg",
                ]
            },
            "map-2": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/am-nord-ostsee-kanal-4x-fs25-nZ2J3.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/am-nord-ostsee-kanal-4x-fs25-zUwWq.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/am-nord-ostsee-kanal-4x-fs25-zJu45.jpg",
                ]
            },
            "map-3": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/back-roads-county-4x-fs25-FnifC.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/back-roads-county-4x-fs25-JgFNr.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/back-roads-county-4x-fs25-Yp20w.jpg",
                ]
            },
            "map-4": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/freche-dachskarte-4x-fs25-hAssD.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/freche-dachskarte-4x-fs25-MGuVe.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/freche-dachskarte-4x-fs25-jwxtA.jpg",
                ]
            },
            "map-5": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/huron-county-16x-fs25-93Ti6.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/huron-county-16x-fs25-FwSEY.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/huron-county-16x-fs25-sTYvz.jpg",
                ]
            },
            "map-6": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/judith-plains-montana-4x-fs25-GDQxi.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/judith-plains-montana-4x-fs25-OtVTO.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/judith-plains-montana-4x-fs25-iXzsx.jpg",
                ]
            },
            "map-7": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/la-plaine-fs25-9wCnh.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/la-plaine-fs25-V4CN4.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/la-plaine-fs25-4fccq.jpg",
                ]
            },
            "map-8": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/lenkovtsy-4x-fs25-lcheK.jpg",
                    "https://farmingsimulator22mods.com/wp-content/uploads/2025/04/lenkivtsi-map-4x-v1-0-0-3-fs25-9.jpg",
                    "https://mods.club/uploads/image/2025/01/small-town-usa-v1-0-0.webp",
                ]
            },
            "map-9": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/nf-marsch-4x-fs25-GfdKk.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/nf-marsch-4x-fs25-mMLjE.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/nf-marsch-4x-fs25-LB19G.jpg",
                ]
            },
            "map-10": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/saxlingham-fs25-QSj04.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/saxlingham-fs25-vzlbW.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/saxlingham-fs25-j8Jj2.jpg",
                ]
            },
            "map-11": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/schwesing-bahnhof-fs25-AWlkl.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/schwesing-bahnhof-fs25-imAx3.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/schwesing-bahnhof-fs25-zlVd9.jpg",
                ]
            },
            "map-12": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/nietwerder-4x-multifruit-fs25-V0lD3.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/nietwerder-4x-multifruit-fs25-9FLMC.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/nietwerder-4x-multifruit-fs25-JLlvc.jpg",
                ]
            },
            "map-13": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/wernolau-farm-fs25-4P9qt.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/wernolau-farm-fs25-c4eiq.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/wernolau-farm-fs25-HrQVx.jpg",
                ]
            },
            "map-14": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/wips/sivita-fs25-E9hlz.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/sivita-fs25-gdSwY.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/sivita-fs25-byo4E.jpg",
                ]
            },
            "map-15": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/polesine-fs25-CmuUa.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/polesine-fs25-ps0aw.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/polesine-fs25-oGrAs.jpg",
                ]
            },
            "map-16": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/vojvodina-gornje-podunavlje-fs25-p4S3W.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/vojvodina-gornje-podunavlje-fs25-2Mg1z.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/vojvodina-gornje-podunavlje-fs25-rLLYr.jpg",
                ]
            },
            "map-17": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/rettenbach-plus-fs25-EQWfH.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/rettenbach-plus-fs25-Wn7vh.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/rettenbach-plus-fs25-eezp3.jpg",
                ]
            },
            "map-18": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/des-cagouilles-dans-lgarouil-fs25-3DVz1.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/des-cagouilles-dans-lgarouil-fs25-yhrCh.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/des-cagouilles-dans-lgarouil-fs25-W5emw.jpg",
                ]
            },
            "map-19": {
                images: [
                    "https://img.mod-network.net/files/images/63295ad5966ac/large_GarbindelMapv1280_3260.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/garbindel-fs25-qzreU.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/garbindel-fs25-Q7QME.jpg",
                ]
            },
            "map-20": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/rancho-fundo-fs25-4RphV.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/rancho-fundo-fs25-XP12c.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/rancho-fundo-fs25-7iRcg.jpg",
                ]
            },
            "map-21": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/sickinger-hohe-rheinland-pfalz-fs25-GKTtP.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/sickinger-hohe-rheinland-pfalz-fs25-JvEo1.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/sickinger-hohe-rheinland-pfalz-fs25-lMkQY.jpg",
                ]
            },
            "map-22": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/feliz-fs25-wEmKE.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/feliz-fs25-yEnhx.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/feliz-fs25-QLro8.jpg",
                ]
            },
            "map-23": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/silverrun-forest-fs25-lglt1.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/silverrun-forest-fs25-Dxs6B.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/silverrun-forest-fs25-aYqbn.jpg",
                ]
            },
            "map-24": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/agroforests-fs25-OenRB.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/agroforests-fs25-l76yR.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/agroforests-fs25-ajwEa.jpg",
                ],
                description: "Map based on <b>Silverrun Forest</b>. This massive expansion adds a sprawling forests, packed with production chains and points of interest that develop based on log deliveries."
            },
            "map-25": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/maypole-farm-fs25-Ke8y8.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/maypole-farm-fs25-H736m.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/maypole-farm-fs25-03siP.jpg",
                ],
            },
            "map-26": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/alpenvorland-fs25-B6s5I.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/alpenvorland-fs25-yQXjK.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/alpenvorland-fs25-0nPat.jpg",
                ],
            },
            "map-27": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/suvalkija-lowlands-fs25-XvDqj.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/suvalkija-lowlands-fs25-5T46e.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/suvalkija-lowlands-fs25-hlqfn.jpg",
                ],
            },
            "map-28": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/the-memory-fs25-aNjjO.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/the-memory-fs25-kpayq.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/the-memory-fs25-qmPUs.jpg",
                ],
            },
            "map-29": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/north-march-reloaded-fs25-QRSOm.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/north-march-reloaded-fs25-0F9y3.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/north-march-reloaded-fs25-KAWrR.jpg",
                ],
            },
            "map-30": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/chadlington-fs25-My0j7.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/chadlington-fs25-Uk76y.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/chadlington-fs25-eLycA.jpg",
                ],
            },
            "map-31": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/krampus-valley-2025-fs25-bwCKP.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/krampus-valley-2025-fs25-QqvTx.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/krampus-valley-2025-fs25-7D8eZ.jpg",
                ],
            },
            "map-32": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/forest-valley-fs25-pfTXC.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/forest-valley-fs25-YNkUb.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/forest-valley-fs25-brKXR.jpg",
                ],
            },
            "map-33": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/les-terres-campagnardes-fs25-JrGAu.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/les-terres-campagnardes-fs25-JyOoJ.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/les-terres-campagnardes-fs25-weo7l.jpg",
                ],
            },
            "map-34": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/pallegney-fs25-7SXEO.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/pallegney-fs25-lnvTS.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/pallegney-fs25-70iGf.jpg",
                ],
            },
            "map-35": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/la-map-du-vexin-fs25-Ivhs1.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/la-map-du-vexin-fs25-cRy3o.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/la-map-du-vexin-fs25-sIQ7x.jpg",
                ],
            },
            "map-36": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/la-riviere-fs25-kQreU.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/la-riviere-fs25-ECnl5.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/la-riviere-fs25-wFPek.jpg",
                ],
            },
            "map-37": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/silverrun-forest-multifruit-edition-fs25-RTzor.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/silverrun-forest-multifruit-edition-fs25-TbJ98.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/silverrun-forest-multifruit-edition-fs25-6t1uv.jpg",
                ],
            },
            "map-38": {
                images: [
                    "https://www.kingmods.net/uploads/fs22/mods/pgr-bruzda-fs22-1-2.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/pgr-bruzda-fs25-riPcp.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/pgr-bruzda-fs25-sRAO4.jpg",
                ],
            },
            "map-39": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/landkreis-niedersachsen-fs25-PAgv7.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/landkreis-niedersachsen-fs25-XTRER.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/landkreis-niedersachsen-fs25-lj8OB.jpg",
                ],
            },
            "map-40": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/rhonplateu-fs25-6TPiO.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/rhonplateu-fs25-pgwkS.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/rhonplateu-fs25-Ghb9u.jpg",
                ],
            },
            "map-41": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/geistal-fs25-iWk2C.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/geistal-fs25-X5kaq.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/geistal-fs25-URqse.jpg",
                ],
            },
            "map-42": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/monteriggioni-fs25-ddJsQ.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/monteriggioni-fs25-GRWwp.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/monteriggioni-fs25-VISaC.jpg",
                ],
            },
            "map-43": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/ausseerland-4x-fs25-lINrj.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ausseerland-4x-fs25-EEuFI.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ausseerland-4x-fs25-rnv59.jpg",
                ],
            },
            "map-44": {
                images: [
                    "https://www.justkaarlo.com/res/src/fs25-maps/map-44.png",
                    "https://www.kingmods.net/uploads/fs25/mods/ardennaise-fs25-FDczY.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/ardennaise-fs25-DVc7Z.jpg",
                ],
            },
            "map-45": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/oberschwaben-fs25-KIt4B.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/oberschwaben-fs25-FkQal.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/oberschwaben-fs25-e7Gcz.jpg",
                ],
            },
            "ZZZ_FS25_FilltypesTP_for_all.zip": {
                description: "FilltypesTP for all maps allow any player have all filltypes in any map without need editing files from the map.",
            },
        },
        showDownloadButtonAtRoot: true,
        customDisplayNames: {
            "ZZZ_FS25_FilltypesTP_for_all.zip": "FilltypesTP For All",
        },
        tagDefinitions: {
            // MAPS TAGS
            "1x-map": { text: "1x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            "2x-map": { text: "2x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            "4x-map": { text: "4x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            "8x-map": { text: "8x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            "16x-map": { text: "16x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            "wip": { text: "WIP", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            "beta": { text: "BETA", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            "outdated": { text: "Outdated", color: "#5e5f5eff", opacity: 0.2, textOpacity: 0.35 },
            "top1": { text: TopFx, color: "#e4af00", opacity: 0.6, textColor: "#c8c8c8ff", textOpacity: 0.75 },
            "top2": { text: TopFx, color: "#965f00", opacity: 0.6, textColor: "#c8c8c8ff", textOpacity: 0.65 },
            "top3": { text: TopFx, color: "#899A17", opacity: 0.6, textColor: "#c8c8c8ff", textOpacity: 0.65 },
            "top4": { text: TopFx, color: "#8f8f8f", opacity: 0.6, textColor: "#c8c8c8ff", textOpacity: 0.7 },
        },
        tagAssignments: {
            "1x-map": [
                "map-10", "map-34", "map-35", "map-36", "map-37", "map-38", "map-23", "map-40", "map-42", "map-43", "map-44", "map-45",
            ],
            "2x-map": [],
            "4x-map": [
                "map-1", "map-2", "map-3", "map-4", "map-6", "map-7", "map-11", "map-8", "map-9", "map-12", "map-13", "map-14", "map-15", "map-16", "map-17", "map-18", "map-19", "map-20", "map-21", "map-22", "map-24", "map-25", "map-26", "map-27", "map-28", "map-29", "map-30", "map-31", "map-32", "map-33", "map-39", "map-41",
            ],
            "16x-map": [
                "map-5",
            ],
            "wip": [],
            "beta": [],
            "outdated": [],
            "top1": [
                "map-6", "map-11",
            ],
            "top2": [
                "map-1",
            ],
            "top3": [
                "map-17",
            ],
            "top4": [
                "map-7", "map-15","map-16", "map-13", "map-14", "map-21",
            ],
        },
        customTags: {
            "ZZZ_FS25_FilltypesTP_for_all.zip": [
                { text: "v9.0.0.0", color: "#95ac00", opacity: 0.5, textOpacity: 0.45 }
            ],
        },
        hideAllSizeTags: false,
        hideSizeTagFiles: [
            ...numMapsArray,
        ],
        hideSizeTagFolders: [
            "1L8VdtjPgoVkN-LQeejAnvixvwfH0RsmQ",
            "1Vtso3y0kFlJt8hi1ZlTFhtFolDVTxNj_",

            // CUSTOM FOLDERS
            "fs25-maps",
        ],
        customFiles: [
            {
                id: "map-1",
                name: "Thüringen",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-2",
                name: "Am Nord-Ostsee-Kanal",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-3",
                name: "Back Roads County",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-4",
                name: "Freche Dachskarte",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-5",
                name: "Huron County",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-6",
                name: "Judith Plains Montana",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-7",
                name: "La Plaine",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-8",
                name: "Lenkovtsy",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-9",
                name: "NF Marsch",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-10",
                name: "Saxlingham",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-11",
                name: "Schwesing Bahnhof",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-12",
                name: "Nietwerder",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-13",
                name: "Wernolau Farm",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-14",
                name: "Sivita",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-15",
                name: "Polesine",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-16",
                name: "Vojvodina-Gornje Podunavlje",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-17",
                name: "Rettenbach Plus",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-18",
                name: "Des Cagouilles Dans L'Garouil",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-19",
                name: "Garbindel",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-20",
                name: "Rancho Fundo",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-21",
                name: "Sickinger-Höhe Rheinland-Pfalz",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-22",
                name: "Feliz",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-23",
                name: "Silverrun Forest",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-24",
                name: "AgroForests",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-25",
                name: "Maypole Farm",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-26",
                name: "Alpenvorland",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-27",
                name: "Suvalkija lowlands",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-28",
                name: "The Memory",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-29",
                name: "North March Reloaded",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-30",
                name: "Chadlington",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-31",
                name: "Krampus Valley 2025",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-32",
                name: "Forest Valley",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-33",
                name: "Les Terres Campagnardes",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-34",
                name: "Pallegney",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-35",
                name: "La Map Du Vexin",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-36",
                name: "La Rivière",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-37",
                name: "Silverrun Forest Multifruit Edition",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-38",
                name: "PGR Bruzda",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-39",
                name: "Landkreis Niedersachsen",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-40",
                name: "Rhönplateu",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-41",
                name: "Geistal",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-42",
                name: "Monteriggioni",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-43",
                name: "Ausseerland",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-44",
                name: "Ardennaise",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-45",
                name: "Oberschwaben",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
        ],
        customFolders: [
            {
                id: "fs25-maps",
                name: "Maps",
                mimeType: "application/vnd.google-apps.folder",
                icon: "../res/src/fs25-maps.png",
            }
        ],
    });
    attachDocPreview(fsContainer);
})()