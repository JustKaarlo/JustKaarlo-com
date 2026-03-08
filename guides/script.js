// Guide System Module
const GuideSystem = {
    currentGuides: [],
    currentGuideSlug: '',

    // Initialize the guide system with a specific array of guides
    init(guidesArray) {
        this.currentGuides = guidesArray;
    },

    // Convert any text to a URL-friendly slug
    titleToSlug(text) {
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    },
    
    // Open a guide based on its index
    openGuide(guideIndex) {
        const guide = this.currentGuides[guideIndex];
        if (!guide) return;

        // Handle different content types
        if (guide.contentType === 'image' && guide.image) {
            // Show modal with image preview
            this.showImageModal(guide);
        } else if (guide.contentType === 'description' && guide.description) {
            // Show modal with formatted description
            this.showDescriptionModal(guide);
        } else if (guide.contentType === 'link' && guide.link) {
            // Open link directly
            window.location.href = guide.link;
        } else if (guide.link) {
            // Fallback: if no contentType specified but link exists
            window.location.href = guide.link;
        }
    },
    
    // Show modal with guide image
    showImageModal(guide) {
        const modal = document.getElementById('guideModal');
        const modalTitle = document.getElementById('modalTitle');
        const guideImage = document.getElementById('guideImage');
        const guideDescription = document.getElementById('guideDescription');
        const guideLink = document.getElementById('guideLink');

        modalTitle.textContent = guide.title;
        
        // Show image, hide description
        guideImage.src = guide.image;
        guideImage.style.display = 'block';
        guideDescription.style.display = 'none';

        // Show or hide the external link button
        if (guide.link && guideLink) {
            guideLink.href = guide.link;
            guideLink.style.display = 'inline-flex';
        } else if (guideLink) {
            guideLink.style.display = 'none';
        }

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
    },
    
    // Show modal with formatted description
    showDescriptionModal(guide) {
        const modal = document.getElementById('guideModal');
        const modalTitle = document.getElementById('modalTitle');
        const guideImage = document.getElementById('guideImage');
        const guideDescription = document.getElementById('guideDescription');
        const guideLink = document.getElementById('guideLink');
        const tocButton = document.getElementById('tocButton');
        const tocPanel = document.getElementById('tocPanel');

        modalTitle.textContent = guide.title;
        this.currentGuideSlug = this.titleToSlug(guide.title);
        guideDescription.innerHTML = guide.description;
        guideDescription.style.display = 'block';
        guideImage.style.display = 'none';

        // Initialize dropdowns after content is loaded
        this.initializeDropdowns();

        // Process SQF code blocks
        SQFHighlighter.processAll(guideDescription);

        // Handle TOC button visibility and generation
        if (guide.showTOC === true) {
            tocButton.style.display = 'inline-flex';
            this.generateTOC();
        } else {
            tocButton.style.display = 'none';
            if (tocPanel) {
                tocPanel.classList.remove('show');
            }
        }

        // Show or hide the external link button
        if (guide.link && guideLink) {
            guideLink.href = guide.link;
            guideLink.style.display = 'inline-flex';
        } else if (guideLink) {
            guideLink.style.display = 'none';
        }

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
    },
    
    // Close the modal
    closeModal() {
        const modal = document.getElementById('guideModal');
        const tocPanel = document.getElementById('tocPanel');
        
        modal.classList.remove('show');
        if (tocPanel) {
            tocPanel.classList.remove('show');
        }
        
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');

        // Clear content after animation
        setTimeout(() => {
            const guideImage = document.getElementById('guideImage');
            const guideDescription = document.getElementById('guideDescription');
            const tocContent = document.getElementById('tocContent');
            if (guideImage) guideImage.src = '';
            if (guideDescription) guideDescription.innerHTML = '';
            if (tocContent) tocContent.innerHTML = '';
        }, 300);
    },
    
    // Generate guide buttons dynamically
    generateButtons(containerId, guidesArray) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Initialize with the provided guides array
        this.init(guidesArray);
        
        container.innerHTML = '';
        
        guidesArray.forEach((item, index) => {
            // Handle section headers
            if (item.type === 'section') {
                const section = document.createElement('div');
                section.className = 'guide-section';
                section.innerHTML = `
                    <h3 class="section-title">${item.title}</h3>
                    ${item.subtitle ? `<p class="section-subtitle">${item.subtitle}</p>` : ''}
                `;
                container.appendChild(section);
                return;
            }
            
            // Handle guide buttons
            const button = document.createElement('button');
            button.className = 'guide-button';
            button.setAttribute('data-index', index);
            
            // Build badge HTML if exists
            let badgeHTML = '';
            if (item.badge) {
                const badgePosition = item.badge.position || 'right';
                const badgeClass = badgePosition === 'icon-tag' ? 'guide-badge-icon-tag' : 'guide-badge-right';
                
                // Check if badge icon is a URL or emoji/text
                const isImageBadge = item.badge.icon.startsWith('http://') || 
                                    item.badge.icon.startsWith('https://') || 
                                    item.badge.icon.startsWith('/');
                
                const badgeContent = isImageBadge 
                    ? `<img src="${item.badge.icon}" alt="${item.badge.tooltip || ''}">` 
                    : item.badge.icon;
                
                badgeHTML = `
                    <div class="${badgeClass}">
                        ${badgeContent}
                        ${item.badge.tooltip ? `<span class="badge-tooltip">${item.badge.tooltip}</span>` : ''}
                    </div>
                `;
            }
            
            button.innerHTML = `
                <div class="guide-icon-wrapper">
                    <img class="guide-icon" src="${item.icon}" alt="">
                    ${item.badge && item.badge.position === 'icon-tag' ? badgeHTML : ''}
                </div>
                <div class="guide-text">
                    <span class="guide-title">${item.title}</span>
                    <span class="guide-subtitle">${item.subtitle}</span>
                </div>
                ${item.badge && item.badge.position !== 'icon-tag' ? badgeHTML : ''}
            `;
            
            button.addEventListener('click', () => this.openGuide(index));
            container.appendChild(button);
        });
        
        this.apply3DTiltEffect();
    },
    
    // Apply 3D tilt effect to guide buttons
    apply3DTiltEffect() {
        document.querySelectorAll('.guide-button').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const midX = rect.width / 2;
                const midY = rect.height / 2;
                const rotateX = ((y - midY) / midY) * 5;
                const rotateY = ((x - midX) / midX) * 5;
                button.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    },
    
    // Initialize dropdown functionality
    initializeDropdowns() {
        const dropdowns = document.querySelectorAll('.guide-description .dropdown');
        
        dropdowns.forEach(dropdown => {
            const header = dropdown.querySelector('.dropdown-header');
            
            if (header) {
                // Remove any existing click listeners
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);
                
                // Add click listener
                newHeader.addEventListener('click', () => {
                    dropdown.classList.toggle('active');
                });
            }
        });
    },
    
    // Generate table of contents from headers AND [data-toc] elements
    generateTOC() {
        const guideDescription = document.getElementById('guideDescription');
        const tocContent = document.getElementById('tocContent');

        if (!guideDescription || !tocContent) return;

        // Collect all headers + any element with data-toc attribute (in DOM order)
        const tocElements = guideDescription.querySelectorAll(
            'h1, h2, h3, h4, h5, h6, [data-toc]'
        );

        if (tocElements.length === 0) {
            tocContent.innerHTML = '<p style="color: #999; padding: 10px;">No sections found</p>';
            return;
        }

        tocContent.innerHTML = '';

        // Track used slugs to handle duplicates
        const usedSlugs = {};

        tocElements.forEach((el) => {
            const isCustom = el.hasAttribute('data-toc') && !el.matches('h1,h2,h3,h4,h5,h6');
            const label = isCustom
                ? el.getAttribute('data-toc')
                : el.textContent.trim();

            // Build a unique slug-based ID
            let slug = this.titleToSlug(label) || 'section';
            if (usedSlugs[slug] !== undefined) {
                usedSlugs[slug]++;
                slug = `${slug}-${usedSlugs[slug]}`;
            } else {
                usedSlugs[slug] = 0;
            }
            const sectionId = `section-${slug}`;
            el.id = sectionId;

            // TOC level class
            let levelClass = 'toc-custom';
            if (!isCustom) {
                levelClass = `toc-${el.tagName.toLowerCase()}`;
            }

            // Build TOC item
            const tocItem = document.createElement('div');
            tocItem.className = `toc-item ${levelClass}`;

            const label_span = document.createElement('span');
            label_span.className = 'toc-item-label';
            label_span.textContent = label;
            tocItem.appendChild(label_span);

            // Copy-link button
            const linkBtn = document.createElement('button');
            linkBtn.className = 'toc-link-btn';
            linkBtn.title = 'Copy section link';
            linkBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/><rect x="9" y="2" width="13" height="13" rx="2"/></svg>`;

            let linkTimeout;
            linkBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const base = window.location.origin + window.location.pathname;
                const url = `${base}#${this.currentGuideSlug}--${slug}`;
                navigator.clipboard.writeText(url).then(() => {
                    linkBtn.classList.add('copied');
                    linkBtn.title = 'Copied!';
                    clearTimeout(linkTimeout);
                    linkTimeout = setTimeout(() => {
                        linkBtn.classList.remove('copied');
                        linkBtn.title = 'Copy section link';
                    }, 2000);
                }).catch(() => {
                    const ta = document.createElement('textarea');
                    ta.value = url;
                    ta.style.cssText = 'position:fixed;opacity:0';
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    linkBtn.classList.add('copied');
                    clearTimeout(linkTimeout);
                    linkTimeout = setTimeout(() => linkBtn.classList.remove('copied'), 2000);
                });
            });
            tocItem.appendChild(linkBtn);

            // Scroll to section on label click
            tocItem.addEventListener('click', (e) => {
                if (e.target.closest('.toc-link-btn')) return;
                const target = document.getElementById(sectionId);
                if (target && guideDescription) {
                    const targetRect = target.getBoundingClientRect();
                    const containerRect = guideDescription.getBoundingClientRect();
                    const scrollOffset = targetRect.top - containerRect.top + guideDescription.scrollTop - 20;
                    guideDescription.scrollTo({ top: scrollOffset, behavior: 'smooth' });
                    if (window.innerWidth <= 768) {
                        const tocPanel = document.getElementById('tocPanel');
                        if (tocPanel) tocPanel.classList.remove('show');
                    }
                }
            });

            tocContent.appendChild(tocItem);
        });
    }
};

// ============================================================
// SQF Code Block System — CodeSnap Plus Style
// Usage in guide descriptions:
//   <pre class="sqf-block" data-title="myScript.sqf">...code...</pre>
// ============================================================
const SQFHighlighter = {

    // SQF control-flow keywords (distinct pink)
    CTRL_KEYWORDS: new Set([
        'if','then','else','elseif','while','do','for','from','to','step',
        'forEach','forEachReversed','switch','case','default','try','catch',
        'exitWith','waitUntil','throw','with','local','do','select','count',
        'apply','findIf','findIfReversed','sort','reverse','append'
    ]),

    // Common SQF built-in commands (cyan)
    COMMANDS: new Set([
        'hint','hintSilent','systemChat','diag_log','sleep','uiSleep',
        'createVehicle','createUnit','createGroup','createMarker','createLocation',
        'deleteVehicle','deleteGroup','deleteMarker','addAction','removeAction',
        'publicVariable','publicVariableServer','publicVariableClient','broadcastToAll',
        'setVariable','getVariable','allVariables',
        'player','this','thisList','thisTrigger','time','missionNamespace',
        'call','spawn','exec','execVM','execFSM','compile','str','typeName',
        'isNull','alive','side','group','position','getPos','getPosASL','getPosATL',
        'setPos','setPosASL','setPosATL','move','moveTo','doMove','commandMove',
        'units','leader','setLeader','join','joinSilent','leaveGroup',
        'addMagazine','addWeapon','addBackpack','addItem','removeAllWeapons',
        'removeAllMagazines','removeAllItems','setPrimaryWeaponAnimationMuzzle',
        'damage','setDamage','killed','hit','handleHeal','addEventHandler','removeEventHandler',
        'globalChat','sideChat','groupChat','vehicleChat','commandChat','customChat',
        'cutText','cutRsc','cutFadeOut','titleText','titleRsc','titleFadeOut',
        'playSound','say','say3D','playMusic','fadeSounds','fadeRadio','fadeMusic',
        'format','count','push','set','in','find','isEqualTo','isNotEqualTo',
        'keys','values','merge','createHashMap','createHashMapFromArray',
        'params','param','setParams',
        'private','nil','objNull','grpNull','taskNull','locationNull',
        'true','false','null',
        'floor','ceil','round','abs','sqrt','sin','cos','tan','atan','atan2',
        'random','selectRandom','selectRandomWeighted',
        'allUnits','allDead','allPlayers','activePlayers','entities',
        'nearestObjects','nearestObject','nearEntities',
        'inAreaArray','inArea','add3DENEventHandler',
        'isServer','isClient','isDedicated','hasInterface','isMultiplayer',
        'remoteExec','remoteExecCall',
        'BIS_fnc_spawn','BIS_fnc_call'
    ]),

    // Tokenize and highlight SQF source code
    highlight(code) {
        // We'll parse character by character for accuracy
        let result = '';
        let i = 0;
        const len = code.length;

        const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

        while (i < len) {
            const ch = code[i];
            const ch2 = code.slice(i, i+2);

            // Block comment /* ... */
            if (ch2 === '/*') {
                let end = code.indexOf('*/', i+2);
                if (end === -1) end = len - 2;
                const token = code.slice(i, end+2);
                result += `<span class="sqf-comment">${esc(token)}</span>`;
                i = end + 2;
                continue;
            }

            // Line comment // ...
            if (ch2 === '//') {
                let end = code.indexOf('\n', i);
                if (end === -1) end = len;
                result += `<span class="sqf-comment">${esc(code.slice(i, end))}</span>`;
                i = end;
                continue;
            }

            // Preprocessor (#define, #include etc.)
            if (ch === '#' && (i === 0 || code[i-1] === '\n')) {
                let end = code.indexOf('\n', i);
                if (end === -1) end = len;
                result += `<span class="sqf-macro">${esc(code.slice(i, end))}</span>`;
                i = end;
                continue;
            }

            // Double-quoted string
            if (ch === '"') {
                let j = i+1;
                while (j < len) {
                    if (code[j] === '"') {
                        if (code[j+1] === '"') { j += 2; continue; } // escaped ""
                        j++;
                        break;
                    }
                    j++;
                }
                result += `<span class="sqf-str">${esc(code.slice(i, j))}</span>`;
                i = j;
                continue;
            }

            // Single-quoted string
            if (ch === "'") {
                let j = i+1;
                while (j < len) {
                    if (code[j] === "'") { j++; break; }
                    j++;
                }
                result += `<span class="sqf-str">${esc(code.slice(i, j))}</span>`;
                i = j;
                continue;
            }

            // Number (integer or float, optionally negative handled by operator)
            if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(code[i+1] || ''))) {
                let j = i;
                if (code[j] === '-') j++;
                while (j < len && /[0-9._eExX]/.test(code[j])) j++;
                result += `<span class="sqf-num">${esc(code.slice(i, j))}</span>`;
                i = j;
                continue;
            }

            // Identifier / keyword / command / variable
            if (/[a-zA-Z_]/.test(ch)) {
                let j = i;
                while (j < len && /[a-zA-Z0-9_]/.test(code[j])) j++;
                const word = code.slice(i, j);
                const wordLow = word.toLowerCase();

                // true / false / nil
                if (wordLow === 'true' || wordLow === 'false' || wordLow === 'nil' || wordLow === 'null') {
                    result += `<span class="sqf-bool">${esc(word)}</span>`;
                }
                // TAG_fnc_ pattern
                else if (/^[a-zA-Z0-9]+_fnc_[a-zA-Z0-9_]+$/.test(word)) {
                    result += `<span class="sqf-fn">${esc(word)}</span>`;
                }
                // Local variable _xxx
                else if (word.startsWith('_')) {
                    result += `<span class="sqf-var-loc">${esc(word)}</span>`;
                }
                // Control-flow keywords
                else if (this.CTRL_KEYWORDS.has(wordLow)) {
                    result += `<span class="sqf-kw-ctrl">${esc(word)}</span>`;
                }
                // Built-in commands
                else if (this.COMMANDS.has(word) || this.COMMANDS.has(wordLow)) {
                    result += `<span class="sqf-cmd">${esc(word)}</span>`;
                }
                // ALLCAPS likely a macro constant
                else if (/^[A-Z][A-Z0-9_]{2,}$/.test(word)) {
                    result += `<span class="sqf-macro">${esc(word)}</span>`;
                }
                // Global variable (starts uppercase)
                else if (/^[A-Z]/.test(word)) {
                    result += `<span class="sqf-var-glob">${esc(word)}</span>`;
                }
                else {
                    result += esc(word);
                }
                i = j;
                continue;
            }

            // Brackets / braces / parens
            if ('[]{}()'.includes(ch)) {
                result += `<span class="sqf-bracket">${esc(ch)}</span>`;
                i++;
                continue;
            }

            // Operators and punctuation
            if ('=<>!&|+*/%:;,^~@'.includes(ch)) {
                // Grab multi-char operators
                let j = i;
                while (j < len && '=<>!&|+*/%:;,^~@'.includes(code[j]) && j - i < 3) j++;
                result += `<span class="sqf-op">${esc(code.slice(i, j))}</span>`;
                i = j;
                continue;
            }

            // Anything else (whitespace, newlines, etc.)
            result += esc(ch);
            i++;
        }
        return result;
    },

    // Build line numbers string matching the code's line count
    buildGutter(code) {
        const lines = code.split('\n');
        return lines.map((_, idx) =>
            `<span class="sqf-gutter-line">${idx + 1}</span>`
        ).join('');
    },

    // Strip leading/trailing blank lines from raw code
    trimCode(raw) {
        return raw.replace(/^\n+/, '').replace(/\n+$/, '');
    },

    // Replace a <pre class="sqf-block"> with the full styled widget
    processElement(pre) {
        const rawCode = this.trimCode(pre.textContent || pre.innerText || '');

        const highlighted = this.highlight(rawCode);

        const wrapper = document.createElement('div');
        wrapper.className = 'sqf-wrapper';
        wrapper.dataset.rawCode = rawCode;

        wrapper.innerHTML = `
            <pre class="sqf-code">${highlighted}</pre>
            <button class="sqf-copy-btn" title="Copy code">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/>
                    <rect x="9" y="2" width="13" height="13" rx="2"/>
                </svg>
                <span>Copy</span>
            </button>
        `;

        // Copy button logic
        const copyBtn = wrapper.querySelector('.sqf-copy-btn');
        let copyTimeout;
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = wrapper.dataset.rawCode;
            navigator.clipboard.writeText(text).then(() => {
                copyBtn.classList.add('copied');
                copyBtn.querySelector('span').textContent = 'Copied!';
                copyBtn.querySelector('svg').innerHTML = `<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
                clearTimeout(copyTimeout);
                copyTimeout = setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtn.querySelector('span').textContent = 'Copy';
                    copyBtn.querySelector('svg').innerHTML = `<path d="M9 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/><rect x="9" y="2" width="13" height="13" rx="2"/>`;
                }, 2000);
            }).catch(() => {
                // Fallback for older browsers
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                copyBtn.classList.add('copied');
                copyBtn.querySelector('span').textContent = 'Copied!';
                clearTimeout(copyTimeout);
                copyTimeout = setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtn.querySelector('span').textContent = 'Copy';
                }, 2000);
            });
        });

        pre.parentNode.replaceChild(wrapper, pre);
    },

    // Process all sqf-block elements inside a container
    processAll(container) {
        const blocks = container.querySelectorAll('pre.sqf-block');
        blocks.forEach(pre => this.processElement(pre));
    }
};

// Navigation System
const NavigationSystem = {
    init() {
        const nav = document.querySelector('.nav-container');
        if (nav) {
            let lastScrollTop = 0;
            let scrollTimeout;

            nav.classList.remove('hidden');

            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);

                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

                if (currentScroll < 200) {
                    nav.classList.remove('hidden');
                } else {
                    nav.classList.add('hidden');
                }

                lastScrollTop = currentScroll;
            }, { passive: true });

            document.addEventListener('mousemove', (e) => {
                if (e.clientY < 100) {
                    nav.classList.remove('hidden');
                } else if (window.pageYOffset > 200) {
                    nav.classList.add('hidden');
                }
            }, { passive: true });
        }
    }
};

// Global functions for HTML onclick attributes
function openGuide(index) {
    GuideSystem.openGuide(index);
}

function closeGuide() {
    GuideSystem.closeModal();
}

function toggleTOC() {
    const tocPanel = document.getElementById('tocPanel');
    if (tocPanel) {
        tocPanel.classList.toggle('show');
    }
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    NavigationSystem.init();
    
    // Set up modal close events
    const modal = document.getElementById('guideModal');
    if (modal) {
        // Close modal on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                GuideSystem.closeModal();
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            GuideSystem.closeModal();
        }
    });
});

// Page-specific initialization function
function initializeGuidePage(containerId, guidesArray) {
    document.addEventListener('DOMContentLoaded', () => {
        GuideSystem.generateButtons(containerId, guidesArray);

        // Check for deep link hash on page load
        const hash = window.location.hash.substring(1);
        if (!hash) return;

        // Detect whether this is a guide--section link or just a guide link
        const separatorIdx = hash.indexOf('--');
        const guideSlug = separatorIdx !== -1 ? hash.substring(0, separatorIdx) : hash;
        const sectionSlug = separatorIdx !== -1 ? hash.substring(separatorIdx + 2) : null;

        const guideIndex = guidesArray.findIndex(guide =>
            GuideSystem.titleToSlug(guide.title) === guideSlug
        );

        if (guideIndex !== -1) {
            setTimeout(() => {
                GuideSystem.openGuide(guideIndex);

                // If there's also a section to scroll to, do it after the modal renders
                if (sectionSlug) {
                    setTimeout(() => {
                        const sectionId = `section-${sectionSlug}`;
                        const target = document.getElementById(sectionId);
                        const desc = document.getElementById('guideDescription');
                        if (target && desc) {
                            const targetRect = target.getBoundingClientRect();
                            const containerRect = desc.getBoundingClientRect();
                            const scrollOffset = targetRect.top - containerRect.top + desc.scrollTop - 20;
                            desc.scrollTo({ top: scrollOffset, behavior: 'smooth' });
                        }
                    }, 200);
                }
            }, 100);
        }
    });
}