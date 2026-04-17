(function initializeFS25FileList() {
    const apiKey = "__API_KEY__";
    const fsRootFolderId = "1EqzEAoB3zUuDiAfA81DNmqQh97mH8ISR";
    const fsContainer = document.getElementById("fs-fileList");

    // CUSTOM CONSTANTS
    const numMapsArray = Array.from({ length: 100 }, (_, i) => `map-${i + 1}`);
    const numTexturesArray = Array.from({ length: 100 }, (_, i) => `texture-${i + 1}`);
    const numOthersArray = Array.from({ length: 100 }, (_, i) => `other-${i + 1}`);
    const numModsArray = Array.from({ length: 100 }, (_, i) => `mod-${i + 1}`);
    const numWIPArray = Array.from({ length: 100 }, (_, i) => `wip-${i + 1}`);

    const TopFx = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M238.7,73.5A15.9,15.9,0,0,0,222,71.2L171.4,93.7,142,40.7a16.1,16.1,0,0,0-28,0l-29.4,53L34,71.2A16,16,0,0,0,11.9,89.5L37.3,197.8a15.9,15.9,0,0,0,7.4,10.1,16.2,16.2,0,0,0,8.3,2.3,15.2,15.2,0,0,0,4.2-.6,265.5,265.5,0,0,1,141.5,0,16.5,16.5,0,0,0,12.5-1.7,15.6,15.6,0,0,0,7.4-10.1L244.1,89.5A16,16,0,0,0,238.7,73.5Z"/></svg>`;
    const ArchivedFx = `<svg xmlns:xlink="http://www.w3.org/1999/xlink" class="inline-block size-32 text-secondary mr-15 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zm-8.89 11.92L6.5 12H10v-2h4v2h3.5l-5.15 5.15c-.19.19-.51.19-.7 0zM5.12 5l.81-1h12l.94 1H5.12z" fill-opacity="0.63" fill="#F5F5F5"></path></svg>`;

    if (!fsContainer) {
        console.error("file list container not found");
        return;
    }

    listFilesInFolder({
        folderId: fsRootFolderId,
        container: fsContainer,
        apiKey,
        iconDefinitions: {
            "ItemFxIcon": "https://www.justkaarlo.com/res/mods/fs25/ico/fs25-side-fx.png",
        },
        iconAssignments: {
            "ItemFxIcon": [
                ...numMapsArray,
                ...numTexturesArray,
                ...numOthersArray,
                ...numModsArray,
                ...numWIPArray,
            ],
        },
        customIcons: {},
        folderIconDefinitions: {},
        folderIconAssignments: {},
        customFolderIcons: {},
        highlightFiles: [],
        colorizeFiles: [],
        excludePartsFolders: [],
        folderGradientFallback: {},
        showDownloadButtonForAllFiles: true,
        downloadButtonFiles: [],
        excludeDownloadFiles: [
            "fs25-maps",
            "fs25-textures",
            "fs25-others",
            "fs25-mods",
            "fs25-wip",
            ...numMapsArray,
            ...numTexturesArray,
            ...numOthersArray,
            ...numWIPArray,
        ],
        customDownloadLinks: {
            "mod-1": "https://www.justkaarlo.com/download/fs25/ZZZ_FS25_FilltypesTP_for_all.zip",
            "mod-2": "https://github.com/id577/FS25_AdvancedDamageSystem/releases/latest/download/FS25_AdvancedDamageSystem.zip",
            "mod-3": "https://github.com/exekx/FS25_RealisticHarvesting/releases/latest/download/FS25_RealisticHarvesting.zip",
        },
        customWebsiteLinks: {
            "fs25-maps": "https://www.kingmods.net/en/fs25/categories/maps",
            "fs25-textures": "https://www.kingmods.net/en/fs25/categories/miscellaneous/textures",
            "fs25-others": "https://www.kingmods.net/en/fs25/categories/miscellaneous/other-mods",
            "fs25-mods": "https://www.kingmods.net/en/fs25/new-mods",
            "fs25-wip": "https://www.kingmods.net/en/fs25/work-in-progress",

            // MAPS
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
            "map-46": "https://farmingsimulator25mods.com/terre-dauvergne-ma7-edition-v1-0/",
            "map-47": "https://www.kingmods.net/en/fs25/mods/68875/mountain-hill-2025",
            "map-48": "https://www.kingmods.net/en/fs25/mods/72875/rennebu-25",
            "map-49": "https://www.kingmods.net/en/fs25/mods/72979/fields-of-tyrone",
            "map-50": "https://www.kingmods.net/en/fs25/mods/73020/the-pichonniere-valley",
            "map-51": "https://www.kingmods.net/en/fs25/mods/73061/dunareni-x4",
            "map-52": "https://www.kingmods.net/en/fs25/mods/74981/les-terres-de-france",
            "map-53": "https://www.kingmods.net/en/fs25/mods/73553/osweiler",
            "map-54": "https://www.kingmods.net/en/fs25/mods/75318/vast-country",
            "map-55": "https://www.kingmods.net/en/fs25/mods/75320/countryside-fields",
            "map-56": "https://www.kingmods.net/en/fs25/mods/74397/the-peasant-valley",
            "map-57": "https://www.kingmods.net/en/fs25/mods/65291/starowies",
            "map-58": "https://www.kingmods.net/en/fs25/mods/75994/district-of-drensteinfurt",
            "map-59": "https://www.kingmods.net/en/fs25/mods/76898/along-the-kiel-canal",
            "map-60": "https://www.kingmods.net/en/fs25/mods/76662/solek",
            "map-61": "https://www.kingmods.net/en/fs25/mods/74978/birgland",

            // TEXTURES

            // MODS
            "mod-1": "https://www.patreon.com/posts/fs25-filltypestp-139915899",
            "mod-2": "https://www.kingmods.net/en/fs25/mods/69590/advanced-damage-system",
            "mod-3": "https://www.kingmods.net/en/fs25/mods/73932/realistic-harvesting",

            // WORK IN PROGRESS
            "wip-3": "https://www.kingmods.net/en/fs25/work-in-progress/1856/rental-station",
            "wip-4": "https://www.kingmods.net/en/fs25/work-in-progress/1916/production-extension",
            "wip-5": "https://www.kingmods.net/en/fs25/work-in-progress/1909/advanced-employee-manager",
            "wip-6": "https://www.kingmods.net/en/fs25/work-in-progress/1978/crop-diseases",
            "wip-7": "https://www.kingmods.net/en/fs25/work-in-progress/1976/oil-maintenance",
            "wip-8": "https://www.kingmods.net/en/fs25/work-in-progress/1970/skill-tree",
        },
        tooltipData: {
            // MAPS
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
                    "https://www.justkaarlo.com/res/mods/fs25/img/map-44-1.png",
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
            "map-46": {
                images: [
                    "https://farmingsimulator25mods.com/wp-content/uploads/2025/06/terre-d-auvergne-28ma7-edition-29-v1.0-2.jpg",
                    "https://farmingsimulator25mods.com/wp-content/uploads/2025/06/terre-d-auvergne-28ma7-edition-29-v1.0-4.jpg",
                    "https://farmingsimulator25mods.com/wp-content/uploads/2025/06/terre-d-auvergne-28ma7-edition-29-v1.0-1.jpg",
                ],
            },
            "map-47": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/mountain-hill-2025-fs25-uEChZ.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/mountain-hill-2025-fs25-0ExGp.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/mountain-hill-2025-fs25-kSEUh.jpg",
                ],
            },
            "map-48": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/rennebu-25-fs25-XUB6v.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/rennebu-25-fs25-KdSav.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/rennebu-25-fs25-aLmxE.jpg",
                ],
            },
            "map-49": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/fields-of-tyrone-fs25-RkHWZ.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/fields-of-tyrone-fs25-DtN5W.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/fields-of-tyrone-fs25-QYvhz.jpg",
                ],
            },
            "map-50": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/the-pichonniere-valley-fs25-2dJFW.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/the-pichonniere-valley-fs25-9rb4E.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/the-pichonniere-valley-fs25-jSPTg.jpg",
                ],
            },
            "map-51": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/dunareni-x4-fs25-GK76B.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/dunareni-x4-fs25-KhF65.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/dunareni-x4-fs25-lbu82.jpg",
                ],
            },
            "map-52": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/les-terres-de-france-fs25-zro4t.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/les-terres-de-france-fs25-OykwX.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/les-terres-de-france-fs25-iK3NQ.jpg",
                ],
            },
            "map-53": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/osweiler-fs25-GqeHg.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/osweiler-fs25-ANdSM.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/osweiler-fs25-FC61L.jpg",
                ],
            },
            "map-54": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/vast-country-fs25-v3Wfp.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/vast-country-fs25-vaG3C.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/vast-country-fs25-GmUbC.jpg",
                ],
            },
            "map-55": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/countryside-fields-fs25-dJHXU.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/countryside-fields-fs25-lFM42.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/countryside-fields-fs25-KkiGu.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/countryside-fields-fs25-aDrCM.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/countryside-fields-fs25-p9j1Y.jpg",
                ],
            },
            "map-56": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/the-peasant-valley-fs25-QXPXg.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/the-peasant-valley-fs25-vlQrL.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/the-peasant-valley-fs25-2etY2.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/the-peasant-valley-fs25-39M3M.jpg",
                ],
            },
            "map-57": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/starowies-fs25-RzjRt.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/starowies-fs25-cS4qq.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/starowies-fs25-xDeQW.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/starowies-fs25-GBwuJ.jpg",
                ],
            },
            "map-58": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/district-of-drensteinfurt-fs25-Toz98.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/district-of-drensteinfurt-fs25-Q6UNr.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/district-of-drensteinfurt-fs25-96Wgt.jpg",
                ],
            },
            "map-59": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/along-the-kiel-canal-fs25-oCUOQ.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/along-the-kiel-canal-fs25-hW4sm.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/along-the-kiel-canal-fs25-RIM5K.jpg",
                ],
            },
            "map-60": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/solek-fs25-MfeGc.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/solek-fs25-ByqEB.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/solek-fs25-KJsP7.jpg",
                ],
            },
            "map-61": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/birgland-fs25-wDWz9.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/birgland-fs25-xwFJl.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/birgland-fs25-ETGqx.jpg",
                ],
            },

            // MODS
            "mod-1": {
                description: "FilltypesTP for all maps allow any player have all filltypes in any map without need editing files from the map.",
            },
            "mod-2": {
                description: "Advanced Damage System is a mod that completely reworks the standard vehicle damage and maintenance system.",
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/advanced-damage-system-fs25-lF0Yh.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/advanced-damage-system-fs25-73bZb.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/advanced-damage-system-fs25-sFsHo.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/advanced-damage-system-fs25-6IDEh.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/advanced-damage-system-fs25-WA1fw.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/advanced-damage-system-fs25-zYKS8.jpg",
                ],
            },
            "mod-3": {
                description: "This mod completely overhauls the harvesting mechanics! Your combine will no longer be able to unrealistically harvest at full speed in dense crops without consequences.",
                images: [
                    "https://www.kingmods.net/uploads/fs25/mods/realistic-harvesting-fs25-EF3LF.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/realistic-harvesting-fs25-aa6sA.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/realistic-harvesting-fs25-5l2oT.jpg",
                    "https://www.kingmods.net/uploads/fs25/mods/realistic-harvesting-fs25-AVvzS.jpg",
                ],
            },

            // WORK IN PROGRESS
            "wip-1": {
                images: [
                    "https://www.justkaarlo.com/res/mods/fs25/img/wip-1-1.jpg",
                    "https://www.justkaarlo.com/res/mods/fs25/img/wip-1-2.jpg",
                ],
            },
            "wip-2": {
                images: [
                    "https://www.kingmods.net/uploads/fs22/mods/ballyspring-2-fs22-5-2.jpg",
                    "https://www.kingmods.net/uploads/fs22/mods/ballyspring-2-fs22-5-3.jpg",
                ],
            },
            "wip-3": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/wips/rental-station-fs25-MLXkb.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/rental-station-fs25-kg8JV.jpg",
                ],
            },
            "wip-4": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/wips/production-extension-fs25-TNyKN.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/production-extension-fs25-GnkSJ.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/production-extension-fs25-wXD2v.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/production-extension-fs25-cAtzd.jpg",
                ],
            },
            "wip-5": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/wips/advanced-employee-manager-fs25-ZhTsP.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/advanced-employee-manager-fs25-x6UNq.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/advanced-employee-manager-fs25-8UoTk.jpg",
                ],
            },
            "wip-6": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/wips/crop-diseases-fs25-0ZoGe.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/crop-diseases-fs25-R8Zu3.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/crop-diseases-fs25-YEcag.jpg",
                ],
            },
            "wip-7": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/wips/oil-maintenance-fs25-mPnQf.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/oil-maintenance-fs25-g8XqA.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/oil-maintenance-fs25-p6RCW.jpg",
                ],
            },
            "wip-8": {
                images: [
                    "https://www.kingmods.net/uploads/fs25/wips/skill-tree-fs25-lhdhX.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/skill-tree-fs25-GAyqH.jpg",
                    "https://www.kingmods.net/uploads/fs25/wips/skill-tree-fs25-ziKcO.jpg",
                ],
            },
        },
        showDownloadButtonAtRoot: true,
        customDisplayNames: {},
        tagDefinitions: {
            // GENERAL TAGS
            "top1": { text: TopFx, color: "#e4af00", opacity: 0.6, textColor: "#c8c8c8ff", textOpacity: 0.75, priority: 1 },
            "top2": { text: TopFx, color: "#965f00", opacity: 0.6, textColor: "#c8c8c8ff", textOpacity: 0.65, priority: 2 },
            "top3": { text: TopFx, color: "#899A17", opacity: 0.6, textColor: "#c8c8c8ff", textOpacity: 0.65, priority: 3 },
            "top4": { text: TopFx, color: "#8f8f8f", opacity: 0.6, textColor: "#c8c8c8ff", textOpacity: 0.7, priority: 4 },

            "beta": { text: "BETA", color: "#7d9000", opacity: 0.5, textOpacity: 0.45 },
            "outdated": { text: "Outdated", color: "#5e5f5eff", opacity: 0.2, textOpacity: 0.35 },
            "latest": { text: "Latest", color: "#95ac00", opacity: 0.5, textOpacity: 0.45, priority: 99 },

            // MAPS TAGS
            "1x-map": { text: "1x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45, priority: 96 },
            "2x-map": { text: "2x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45, priority: 97 },
            "4x-map": { text: "4x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45, priority: 98 },
            "8x-map": { text: "8x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45, priority: 99 },
            "16x-map": { text: "16x", color: "#7d9000", opacity: 0.5, textOpacity: 0.45, priority: 100 },
            "multifruit": { text: "Multifruit", color: "#888888", opacity: 0.5, textColor: "#c1c1c1", textOpacity: 0.6, priority: 5 },

            // MODS TAGS
            "misc": { text: "Misc", color: "#888888", opacity: 0.5, textColor: "#c1c1c1", textOpacity: 0.6, priority: 98 },
            "map": { text: "Map", color: "#888888", opacity: 0.5, textColor: "#c1c1c1", textOpacity: 0.6, priority: 99 },
            "script": { text: "Script", color: "#888888", opacity: 0.5, textColor: "#c1c1c1", textOpacity: 0.6, priority: 96 },

           // WORK IN PROGRESS
            "archived": { text: ArchivedFx, color: "#000000", opacity: 0.15, textColor: "#e2e2e2", textOpacity: 0.6, priority: 97 },
        },
        tagAssignments: {
            // GENERAL
            "beta": [],
            "outdated": [],
            "top1": [
                "map-6", "map-11",
            ],
            "top2": [
                "map-1", "map-50",
            ],
            "top3": [
                "map-17",
            ],
            "top4": [
                "map-7", "map-15","map-16", "map-13", "map-14", "map-21", "map-48", "map-54", "map-52", "map-59", "map-61",
            ],

            // MAPS
            "1x-map": [
                "map-10", "map-34", "map-35", "map-36", "map-37", "map-38", "map-23", "map-40", "map-42", "map-43", "map-44", "map-45", "map-46", "map-48", "map-50", "map-55", "map-56",
            ],
            "2x-map": [],
            "4x-map": [
                "map-1", "map-2", "map-3", "map-4", "map-6", "map-7", "map-11", "map-8", "map-9", "map-12", "map-13", "map-14", "map-15", "map-16", "map-17", "map-18", "map-19", "map-20", "map-21", "map-22", "map-24", "map-25", "map-26", "map-27", "map-28", "map-29", "map-30", "map-31", "map-32", "map-33", "map-39", "map-41", "map-47", "map-49", "map-51", "map-53", "map-54", "map-57", "map-52", "map-58", "map-59", "map-60", "map-61",
            ],
            "16x-map": [
                "map-5",
            ],
            "multifruit": [
                "map-11", "map-37", "map-12",
            ],

            // MODS
            "misc": [
                "mod-1",
            ],
            "latest": [
                "mod-2", "mod-3",
            ],

            // WORK IN PROGRESS
            "archived": [
                "wip-7",
            ],
            "map": [
                "wip-1", "wip-2",
            ],
            "script": [
                "wip-3", "wip-4", "wip-5", "mod-2", "wip-6", "wip-8", "mod-3",
            ],
        },
        customTags: {
            "mod-1": [
                { text: "v9.0.0.0", color: "#95ac00", opacity: 0.5, textOpacity: 0.45 }
            ],
        },
        hideAllSizeTags: false,
        hideSizeTagFiles: [
            ...numMapsArray,
            ...numTexturesArray,
            ...numOthersArray,
            ...numModsArray,
            ...numWIPArray,
        ],
        hideSizeTagFolders: [
            "fs25-maps",
            "fs25-textures",
            "fs25-others",
            "fs25-mods",
            "fs25-wip",
        ],
        customFiles: [
            // MAPS
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
            {
                id: "map-46",
                name: "Terre d'Auvergne",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-47",
                name: "Mountain Hill 2025",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-48",
                name: "Rennebu 25",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-49",
                name: "Fields Of Tyrone",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-50",
                name: "The Pichonnière Valley",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-51",
                name: "Dunăreni",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-52",
                name: "Les Terres De France",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-53",
                name: "Osweiler",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-54",
                name: "Vast Country",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-55",
                name: "Countryside Fields",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-56",
                name: "The Peasant Valley",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-57",
                name: "Starowies",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-58",
                name: "District Of Drensteinfurt",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-59",
                name: "Along The Kiel Canal",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-60",
                name: "Solek",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },
            {
                id: "map-61",
                name: "Birgland",
                mimeType: "application/zip",
                parentId: "fs25-maps"
            },


            // TEXTURES

            // MODS
            {
                id: "mod-1",
                name: "FilltypesTP For All",
                mimeType: "application/zip",
                parentId: "fs25-mods"
            },
            {
                id: "mod-2",
                name: "Advanced Damage System",
                mimeType: "application/zip",
                parentId: "fs25-mods"
            },
            {
                id: "mod-3",
                name: "Realistic Harvesting",
                mimeType: "application/zip",
                parentId: "fs25-mods"
            },

            // OTHERS

            // WORK IN PROGRESS
            {
                id: "wip-1",
                name: "Combined Counties",
                mimeType: "application/zip",
                parentId: "fs25-wip"
            },
            {
                id: "wip-2",
                name: "BallySpring 25",
                mimeType: "application/zip",
                parentId: "fs25-wip"
            },
            {
                id: "wip-3",
                name: "Rental Station",
                mimeType: "application/zip",
                parentId: "fs25-wip"
            },
            {
                id: "wip-4",
                name: "Production Extension",
                mimeType: "application/zip",
                parentId: "fs25-wip"
            },
            {
                id: "wip-5",
                name: "Advanced Employee Manager",
                mimeType: "application/zip",
                parentId: "fs25-wip"
            },
            {
                id: "wip-6",
                name: "Crop Diseases",
                mimeType: "application/zip",
                parentId: "fs25-wip"
            },
            {
                id: "wip-7",
                name: "Oil Maintenance",
                mimeType: "application/zip",
                parentId: "fs25-wip"
            },
            {
                id: "wip-8",
                name: "Skill Tree",
                mimeType: "application/zip",
                parentId: "fs25-wip"
            },
        ],
        customFolders: [
            {
                id: "fs25-maps",
                name: "Maps",
                mimeType: "application/vnd.google-apps.folder",
                icon: "https://www.justkaarlo.com/res/mods/fs25/ico/fs25-maps.png",
            },
            // {
            //     id: "fs25-textures",
            //     name: "Textures",
            //     mimeType: "application/vnd.google-apps.folder",
            //     icon: "https://www.justkaarlo.com/res/mods/fs25/ico/fs25-textures.png",
            // },
            // {
            //     id: "fs25-others",
            //     name: "Others",
            //     mimeType: "application/vnd.google-apps.folder",
            //     icon: "https://www.justkaarlo.com/res/mods/fs25/ico/fs25-others.png",
            // },
            {
                id: "fs25-mods",
                name: "Mods",
                mimeType: "application/vnd.google-apps.folder",
                icon: "https://www.justkaarlo.com/res/mods/fs25/ico/fs25-mods-2.png",
            },
            {
                id: "fs25-wip",
                name: "Work In Progress",
                mimeType: "application/vnd.google-apps.folder",
                icon: "https://www.justkaarlo.com/res/mods/fs25/ico/fs25-wip-2.png",
            }
        ],
    });
    attachDocPreview(fsContainer);
})()