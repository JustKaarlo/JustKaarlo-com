//  DocSystem — Article/Modal Engine
//  Drop-in replacement for the old GuideSystem / script.js
//  Rename summary:
//    GuideSystem           → DocSystem
//    guide / guides        → article / articles
//    initializeGuidePage   → initDocPage
//    generateButtons       → renderArticleGrid

const DocSystem = {
    currentArticles: [],
    currentArticleSlug: '',

    // Load the articles array that belongs to this page
    init(articlesArray) {
        this.currentArticles = articlesArray;
    },

    // Convert any text to a URL-friendly slug
    toSlug(text) {
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    },

    // Open an article by its index in currentArticles
    openArticle(articleIndex) {
        const article = this.currentArticles[articleIndex];
        if (!article) return;

        if (article.contentType === 'image' && article.image) {
            this._showImageModal(article);
        } else if (article.contentType === 'description' && article.description) {
            this._showDescriptionModal(article);
        } else if (article.contentType === 'link' && article.link) {
            window.location.href = article.link;
        } else if (article.link) {
            window.location.href = article.link;
        }
    },

    _showImageModal(article) {
        const modal      = document.getElementById('docModal');
        const titleEl    = document.getElementById('docModalTitle');
        const imgEl      = document.getElementById('docArticleImage');
        const descEl     = document.getElementById('docArticleBody');
        const linkEl     = document.getElementById('docArticleLink');

        titleEl.textContent = article.title;
        imgEl.src = article.image;
        imgEl.style.display = 'block';
        descEl.style.display = 'none';

        if (article.link && linkEl) {
            linkEl.href = article.link;
            linkEl.style.display = 'inline-flex';
        } else if (linkEl) {
            linkEl.style.display = 'none';
        }

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
    },

    _showDescriptionModal(article) {
        const modal      = document.getElementById('docModal');
        const titleEl    = document.getElementById('docModalTitle');
        const imgEl      = document.getElementById('docArticleImage');
        const descEl     = document.getElementById('docArticleBody');
        const linkEl     = document.getElementById('docArticleLink');
        const tocBtn     = document.getElementById('docTocButton');
        const tocPanel   = document.getElementById('docTocPanel');

        titleEl.textContent = article.title;
        this.currentArticleSlug = this.toSlug(article.title);
        descEl.innerHTML = article.description;
        descEl.style.display = 'block';
        imgEl.style.display = 'none';

        this._initDropdowns();
        SQFHighlighter.processAll(descEl);

        if (article.showTOC === true) {
            tocBtn.style.display = 'inline-flex';
            this._generateTOC();
        } else {
            tocBtn.style.display = 'none';
            if (tocPanel) tocPanel.classList.remove('show');
        }

        if (article.link && linkEl) {
            linkEl.href = article.link;
            linkEl.style.display = 'inline-flex';
        } else if (linkEl) {
            linkEl.style.display = 'none';
        }

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
    },

    closeModal() {
        const modal    = document.getElementById('docModal');
        const tocPanel = document.getElementById('docTocPanel');

        modal.classList.remove('show');
        if (tocPanel) tocPanel.classList.remove('show');

        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');

        setTimeout(() => {
            const imgEl  = document.getElementById('docArticleImage');
            const descEl = document.getElementById('docArticleBody');
            const tocContent = document.getElementById('docTocContent');
            if (imgEl)     imgEl.src = '';
            if (descEl)    descEl.innerHTML = '';
            if (tocContent) tocContent.innerHTML = '';
        }, 300);
    },

    // Render article card grid into containerId
    renderArticleGrid(containerId, articlesArray) {
        const container = document.getElementById(containerId);
        if (!container) return;

        this.init(articlesArray);
        container.innerHTML = '';

        articlesArray.forEach((item, index) => {
            // Section divider rows
            if (item.type === 'section') {
                const section = document.createElement('div');
                section.className = 'doc-section';
                section.innerHTML = `
                    <h3 class="doc-section-title">${item.title}</h3>
                    ${item.subtitle ? `<p class="doc-section-subtitle">${item.subtitle}</p>` : ''}
                `;
                container.appendChild(section);
                return;
            }

            // Article card button
            const card = document.createElement('button');
            card.className = 'doc-card';
            card.setAttribute('data-index', index);

            let badgeHTML = '';
            if (item.badge) {
                const pos = item.badge.position || 'right';
                const cls = pos === 'icon-tag' ? 'doc-badge-icon-tag' : 'doc-badge-right';
                const isImg = /^https?:\/\/|^\//.test(item.badge.icon);
                const content = isImg
                    ? `<img src="${item.badge.icon}" alt="${item.badge.tooltip || ''}">`
                    : item.badge.icon;
                badgeHTML = `
                    <div class="${cls}">
                        ${content}
                        ${item.badge.tooltip ? `<span class="doc-badge-tooltip">${item.badge.tooltip}</span>` : ''}
                    </div>`;
            }

            card.innerHTML = `
                <div class="doc-card-icon-wrap">
                    <img class="doc-card-icon" src="${item.icon}" alt="">
                    ${item.badge && item.badge.position === 'icon-tag' ? badgeHTML : ''}
                </div>
                <div class="doc-card-text">
                    <span class="doc-card-title">${item.title}</span>
                    <span class="doc-card-subtitle">${item.subtitle}</span>
                </div>
                ${item.badge && item.badge.position !== 'icon-tag' ? badgeHTML : ''}
            `;

            card.addEventListener('click', () => this.openArticle(index));
            container.appendChild(card);
        });

        this._apply3DTilt();
    },

    _apply3DTilt() {
        document.querySelectorAll('.doc-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const rx = ((e.clientY - r.top)  / r.height - 0.5) * -10;
                const ry = ((e.clientX - r.left) / r.width  - 0.5) *  10;
                card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    },

    _initDropdowns() {
        document.querySelectorAll('.doc-article-body .dropdown').forEach(dd => {
            const hdr = dd.querySelector('.dropdown-header');
            if (!hdr) return;
            const fresh = hdr.cloneNode(true);
            hdr.parentNode.replaceChild(fresh, hdr);
            fresh.addEventListener('click', () => dd.classList.toggle('active'));
        });
    },

    _generateTOC() {
        const body       = document.getElementById('docArticleBody');
        const tocContent = document.getElementById('docTocContent');
        if (!body || !tocContent) return;

        const elements = body.querySelectorAll('h1,h2,h3,h4,h5,h6,[data-toc]');
        if (!elements.length) {
            tocContent.innerHTML = '<p style="color:#999;padding:10px">No sections found</p>';
            return;
        }

        tocContent.innerHTML = '';
        const usedSlugs = {};

        elements.forEach(el => {
            const isCustom = el.hasAttribute('data-toc') && !el.matches('h1,h2,h3,h4,h5,h6');
            const label = isCustom ? el.getAttribute('data-toc') : el.textContent.trim();

            let slug = this.toSlug(label) || 'section';
            if (usedSlugs[slug] !== undefined) {
                slug = `${slug}-${++usedSlugs[slug]}`;
            } else {
                usedSlugs[slug] = 0;
            }
            const sectionId = `section-${slug}`;
            el.id = sectionId;

            const levelClass = isCustom ? 'toc-custom' : `toc-${el.tagName.toLowerCase()}`;
            const item = document.createElement('div');
            item.className = `toc-item ${levelClass}`;

            const labelSpan = document.createElement('span');
            labelSpan.className = 'toc-item-label';
            labelSpan.textContent = label;
            item.appendChild(labelSpan);

            // Copy-link button
            const linkBtn = document.createElement('button');
            linkBtn.className = 'toc-link-btn';
            linkBtn.title = 'Copy section link';
            linkBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/><rect x="9" y="2" width="13" height="13" rx="2"/></svg>`;

            let copyTimer;
            linkBtn.addEventListener('click', e => {
                e.stopPropagation();
                const url = `${location.origin}${location.pathname}#${this.currentArticleSlug}--${slug}`;
                navigator.clipboard.writeText(url).catch(() => {
                    const ta = Object.assign(document.createElement('textarea'), { value: url });
                    ta.style.cssText = 'position:fixed;opacity:0';
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                }).finally(() => {
                    linkBtn.classList.add('copied');
                    linkBtn.title = 'Copied!';
                    clearTimeout(copyTimer);
                    copyTimer = setTimeout(() => {
                        linkBtn.classList.remove('copied');
                        linkBtn.title = 'Copy section link';
                    }, 2000);
                });
            });
            item.appendChild(linkBtn);

            item.addEventListener('click', e => {
                if (e.target.closest('.toc-link-btn')) return;
                const target = document.getElementById(sectionId);
                if (target && body) {
                    const offset = target.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop - 20;
                    body.scrollTo({ top: offset, behavior: 'smooth' });
                    if (window.innerWidth <= 768) {
                        const panel = document.getElementById('docTocPanel');
                        if (panel) panel.classList.remove('show');
                    }
                }
            });

            tocContent.appendChild(item);
        });
    }
};


// ============================================================
//  SQF Code Highlighter (unchanged, still used by DocSystem)
// ============================================================
const SQFHighlighter = {
    CTRL_KEYWORDS: new Set([
        'if','then','else','elseif','while','do','for','from','to','step',
        'forEach','forEachReversed','switch','case','default','try','catch',
        'exitWith','waitUntil','throw','with','local','select','count',
        'apply','findIf','findIfReversed','sort','reverse','append'
    ]),
    COMMANDS: new Set([
        'hint','hintSilent','systemChat','diag_log','sleep','uiSleep',
        'createVehicle','createUnit','createGroup','createMarker','createLocation',
        'deleteVehicle','deleteGroup','deleteMarker','addAction','removeAction',
        'publicVariable','publicVariableServer','publicVariableClient','broadcastToAll',
        'setVariable','getVariable','allVariables','player','this','thisList',
        'thisTrigger','time','missionNamespace','call','spawn','exec','execVM',
        'execFSM','compile','str','typeName','isNull','alive','side','group',
        'position','getPos','getPosASL','getPosATL','setPos','setPosASL','setPosATL',
        'move','moveTo','doMove','commandMove','units','leader','setLeader','join',
        'joinSilent','leaveGroup','addMagazine','addWeapon','addBackpack','addItem',
        'removeAllWeapons','removeAllMagazines','removeAllItems','damage','setDamage',
        'addEventHandler','removeEventHandler','format','count','push','set','in',
        'find','isEqualTo','isNotEqualTo','keys','values','merge','createHashMap',
        'createHashMapFromArray','params','param','setParams','private','nil','objNull',
        'grpNull','taskNull','locationNull','true','false','null','floor','ceil',
        'round','abs','sqrt','sin','cos','tan','atan','atan2','random',
        'selectRandom','selectRandomWeighted','allUnits','allDead','allPlayers',
        'activePlayers','entities','nearestObjects','nearestObject','nearEntities',
        'inAreaArray','inArea','isServer','isClient','isDedicated','hasInterface',
        'isMultiplayer','remoteExec','remoteExecCall','BIS_fnc_spawn','BIS_fnc_call'
    ]),

    highlight(code) {
        let result = '';
        let i = 0;
        const len = code.length;
        const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

        while (i < len) {
            const ch = code[i], ch2 = code.slice(i, i+2);

            if (ch2 === '/*') {
                let end = code.indexOf('*/', i+2); if (end === -1) end = len - 2;
                result += `<span class="sqf-comment">${esc(code.slice(i, end+2))}</span>`; i = end + 2; continue;
            }
            if (ch2 === '//') {
                let end = code.indexOf('\n', i); if (end === -1) end = len;
                result += `<span class="sqf-comment">${esc(code.slice(i, end))}</span>`; i = end; continue;
            }
            if (ch === '#' && (i === 0 || code[i-1] === '\n')) {
                let end = code.indexOf('\n', i); if (end === -1) end = len;
                result += `<span class="sqf-macro">${esc(code.slice(i, end))}</span>`; i = end; continue;
            }
            if (ch === '"') {
                let j = i+1;
                while (j < len) { if (code[j] === '"') { if (code[j+1] === '"') { j += 2; continue; } j++; break; } j++; }
                result += `<span class="sqf-str">${esc(code.slice(i, j))}</span>`; i = j; continue;
            }
            if (ch === "'") {
                let j = i+1;
                while (j < len) { if (code[j] === "'") { j++; break; } j++; }
                result += `<span class="sqf-str">${esc(code.slice(i, j))}</span>`; i = j; continue;
            }
            if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(code[i+1] || ''))) {
                let j = i; while (j < len && /[0-9._eExX]/.test(code[j])) j++;
                result += `<span class="sqf-num">${esc(code.slice(i, j))}</span>`; i = j; continue;
            }
            if (/[a-zA-Z_]/.test(ch)) {
                let j = i; while (j < len && /[a-zA-Z0-9_]/.test(code[j])) j++;
                const word = code.slice(i, j), wl = word.toLowerCase();
                if (wl === 'true' || wl === 'false' || wl === 'nil' || wl === 'null')
                    result += `<span class="sqf-bool">${esc(word)}</span>`;
                else if (/^[a-zA-Z0-9]+_fnc_[a-zA-Z0-9_]+$/.test(word))
                    result += `<span class="sqf-fn">${esc(word)}</span>`;
                else if (word.startsWith('_'))
                    result += `<span class="sqf-var-loc">${esc(word)}</span>`;
                else if (this.CTRL_KEYWORDS.has(wl))
                    result += `<span class="sqf-kw-ctrl">${esc(word)}</span>`;
                else if (this.COMMANDS.has(word) || this.COMMANDS.has(wl))
                    result += `<span class="sqf-cmd">${esc(word)}</span>`;
                else if (/^[A-Z][A-Z0-9_]{2,}$/.test(word))
                    result += `<span class="sqf-macro">${esc(word)}</span>`;
                else if (/^[A-Z]/.test(word))
                    result += `<span class="sqf-var-glob">${esc(word)}</span>`;
                else
                    result += esc(word);
                i = j; continue;
            }
            if ('[]{}()'.includes(ch)) { result += `<span class="sqf-bracket">${esc(ch)}</span>`; i++; continue; }
            if ('=<>!&|+*/%:;,^~@'.includes(ch)) {
                let j = i; while (j < len && '=<>!&|+*/%:;,^~@'.includes(code[j]) && j - i < 3) j++;
                result += `<span class="sqf-op">${esc(code.slice(i, j))}</span>`; i = j; continue;
            }
            result += esc(ch); i++;
        }
        return result;
    },

    trimCode(raw) { return raw.replace(/^\n+/, '').replace(/\n+$/, ''); },

    processElement(pre) {
        const raw = this.trimCode(pre.textContent || pre.innerText || '');
        const wrapper = document.createElement('div');
        wrapper.className = 'sqf-wrapper';
        wrapper.dataset.rawCode = raw;
        wrapper.innerHTML = `
            <pre class="sqf-code">${this.highlight(raw)}</pre>
            <button class="sqf-copy-btn" title="Copy code">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/>
                    <rect x="9" y="2" width="13" height="13" rx="2"/>
                </svg>
                <span>Copy</span>
            </button>`;
        const btn = wrapper.querySelector('.sqf-copy-btn');
        let t;
        btn.addEventListener('click', e => {
            e.stopPropagation();
            navigator.clipboard.writeText(wrapper.dataset.rawCode).then(() => {
                btn.classList.add('copied');
                btn.querySelector('span').textContent = 'Copied!';
                clearTimeout(t);
                t = setTimeout(() => { btn.classList.remove('copied'); btn.querySelector('span').textContent = 'Copy'; }, 2000);
            });
        });
        pre.parentNode.replaceChild(wrapper, pre);
    },

    processAll(container) {
        container.querySelectorAll('pre.sqf-block').forEach(p => this.processElement(p));
    }
};


// ============================================================
//  Navigation hide/show on scroll
// ============================================================
const NavSystem = {
    init() {
        const nav = document.querySelector('.nav-container');
        if (!nav) return;
        nav.classList.remove('hidden');
        window.addEventListener('scroll', () => {
            nav.classList.toggle('hidden', window.pageYOffset > 200);
        }, { passive: true });
        document.addEventListener('mousemove', e => {
            if (e.clientY < 100) nav.classList.remove('hidden');
            else if (window.pageYOffset > 200) nav.classList.add('hidden');
        }, { passive: true });
    }
};


// ============================================================
//  Global helpers for inline onclick attributes in HTML
// ============================================================
function openArticle(index)  { DocSystem.openArticle(index); }
function closeArticle()      { DocSystem.closeModal(); }
function toggleTOC() {
    const panel = document.getElementById('docTocPanel');
    if (panel) panel.classList.toggle('show');
}


// ============================================================
//  DOM ready — wire up modal events
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    NavSystem.init();

    const modal = document.getElementById('docModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) DocSystem.closeModal();
        });
    }
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') DocSystem.closeModal();
    });
});


// ============================================================
//  initDocPage — call this once per page to boot everything
//  Usage:  initDocPage('myGridId', myArticlesArray);
// ============================================================
function initDocPage(containerId, articlesArray) {
    document.addEventListener('DOMContentLoaded', () => {
        DocSystem.renderArticleGrid(containerId, articlesArray);

        // Deep-link support: #article-slug  or  #article-slug--section-slug
        const hash = window.location.hash.substring(1);
        if (!hash) return;

        const sepIdx      = hash.indexOf('--');
        const articleSlug = sepIdx !== -1 ? hash.substring(0, sepIdx) : hash;
        const sectionSlug = sepIdx !== -1 ? hash.substring(sepIdx + 2) : null;

        const idx = articlesArray.findIndex(a => DocSystem.toSlug(a.title) === articleSlug);
        if (idx === -1) return;

        setTimeout(() => {
            DocSystem.openArticle(idx);
            if (sectionSlug) {
                setTimeout(() => {
                    const target = document.getElementById(`section-${sectionSlug}`);
                    const body   = document.getElementById('docArticleBody');
                    if (target && body) {
                        const offset = target.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop - 20;
                        body.scrollTo({ top: offset, behavior: 'smooth' });
                    }
                }, 200);
            }
        }, 100);
    });
}
