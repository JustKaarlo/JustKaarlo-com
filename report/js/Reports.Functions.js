// Report Type Configuration with Webhook URLs
const REAL_WEBHOOK_URL = "__WEBHOOK_URL__";
const REPORT_CONFIGS = {
    'arrest': {
        webhookUrl: 'REAL_WEBHOOK_URL',
        threadId: '1396775578396528731',
        title: 'ARREST REPORT',
        footer: 'Department of Justice',
        tagInput: 'offenseInput',
        tagContainer: 'offense-tags',
        fields: ['location', 'datetime', 'defendant', 'officer'],
        requiredTags: true
    },
    'citation': {
        webhookUrl: 'REAL_WEBHOOK_URL',
        threadId: '1396776491890507796',
        title: 'CITATION REPORT',
        footer: 'Department of Justice',
        tagInput: 'violationInput',
        tagContainer: 'violation-tags',
        fields: ['location', 'datetime', 'name', 'amount'],
        requiredTags: true
    },
    'coroner': {
        webhookUrl: 'REAL_WEBHOOK_URL',
        threadId: '1396777100459114538',
        title: 'CORONER REPORT',
        footer: 'Medical Examiner Office',
        fields: ['name', 'dob', 'exam_date', 'datetime', 'location', 'cause'],
        checkboxes: ['foul', 'meds', 'defib', 'cpr']
    },
    'fire': {
        webhookUrl: 'REAL_WEBHOOK_URL',
        threadId: '1396777562214240347',
        title: 'FIRE INCIDENT REPORT',
        footer: 'State Fire Rescue & Search',
        tagInput: 'unitInput',
        tagContainer: 'unit-tags',
        fields: ['datetime', 'location', 'incident-type', 'fire-spread-level'],
        checkboxes: ['methods-used'],
        requiredTags: true
    },
    'medical': {
        webhookUrl: 'REAL_WEBHOOK_URL',
        threadId: '1396778617568104469',
        title: 'MEDICAL REPORT',
        footer: 'Emergency Medical Services',
        fields: ['datetime', 'location', 'name', 'gender', 'dob', 'primary', 'injuries', 'pulse', 'respiration', 'bp', 'hospital', 'condition'],
        checkboxes: ['consciousness', 'treatment']
    },
    'prison': {
        webhookUrl: 'REAL_WEBHOOK_URL',
        threadId: '1396779280968712272',
        title: 'PRISON TRANSPORT REPORT',
        footer: 'Department of Correction',
        fields: ['datetime', 'pickup', 'receiver', 'department'],
        hasSuspects: true
    },
    'towing': {
        webhookUrl: 'REAL_WEBHOOK_URL',
        threadId: '1396779624335409232',
        title: 'TOW REPORT',
        footer: 'Department of Transportation',
        fields: ['owner', 'makeModel', 'color', 'tag', 'condition', 'datetime', 'requestedBy', 'takenTo', 'location', 'reason']
    }
};

// Global variables
let currentReportType = null;
let currentConfig = null;

// Utility Functions
function randomID() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let id = "";
    for (let i = 0; i < 3; i++) id += letters[Math.floor(Math.random() * letters.length)];
    id += "-";
    for (let i = 0; i < 3; i++) id += numbers[Math.floor(Math.random() * numbers.length)];
    id += "-" + numbers[Math.floor(Math.random() * numbers.length)];
    return id;
}

function autoGrow(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

function showAlert(message, title = '📢 Notice') {
    const existing = document.getElementById('custom-alert');
    if (existing) existing.remove();

    const popup = document.createElement('div');
    popup.id = 'custom-alert';
    popup.style = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #23272A;
        color: white;
        padding: 20px 25px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.6);
        z-index: 1000;
        text-align: center;
        max-width: 90%;
    `;

    popup.innerHTML = `
        <div style="font-size: 15px; color: #ccc;">${message}</div>
        <button style="margin-top: 15px; padding: 8px 16px; font-size: 14px; border: none; background: #4f545c; color: white; border-radius: 6px; cursor: pointer;" onclick="document.getElementById('custom-alert').remove()">Close</button>
    `;

    document.querySelector('.card').appendChild(popup);
}

function showPopup() {
    const popup = document.getElementById('popup-overlay');
    popup.style.display = 'block';
    setTimeout(() => popup.style.display = 'none', 3000);
}

function showErrorPopup() {
    const popup = document.getElementById('error-popup');
    popup.style.display = 'block';
    setTimeout(() => popup.style.display = 'none', 3000);
}

// Report Type Detection
function detectReportType() {
    if (document.getElementById('defendant')) return 'arrest';
    if (document.getElementById('violationInput')) return 'citation';
    if (document.getElementById('exam_date')) return 'coroner';
    if (document.getElementById('unitInput')) return 'fire';
    if (document.getElementById('primary')) return 'medical';
    if (document.getElementById('suspectList')) return 'prison';
    if (document.getElementById('owner')) return 'towing';
    return null;
}

// Tag Input System
function createTagInput(inputId, containerId) {
    const input = document.getElementById(inputId);
    const container = document.getElementById(containerId);
    
    if (!input || !container) return;

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            e.preventDefault();
            addTag(this.value.trim(), container, input);
            this.value = '';
        }
    });
}

function addTag(text, container, input) {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `${text} <span class="remove">&times;</span>`;
    container.insertBefore(tag, input);
    tag.querySelector('.remove').addEventListener('click', () => tag.remove());
}

// Suspect Management (Prison Transport)
function addSuspect() {
    const container = document.getElementById("suspectList");
    if (!container) return;
    
    const suspectCard = document.createElement("div");
    suspectCard.className = "suspect-container";
    suspectCard.innerHTML = `
        <div class="suspect-header">
            <span class="no-box">Suspect</span>
            <button class="delete-btn" onclick="removeSuspect(this)">🗑️</button>
        </div>
        <div class="suspect-row">
            <div class="field-group">
                <label>Name</label>
                <input type="text">
            </div>
            <div class="field-group">
                <label>Gender</label>
                <select>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
            <div class="field-group">
                <label>Date of Birth</label>
                <input type="date">
            </div>
        </div>
    `;
    container.appendChild(suspectCard);
    updateSuspectListNumbers();
}

function removeSuspect(btn) {
    const card = btn.closest(".suspect-container");
    if (card) card.remove();
    updateSuspectListNumbers();
}

function updateSuspectListNumbers() {
    const containers = document.querySelectorAll(".suspect-container");
    containers.forEach((c, i) => {
        const no = c.querySelector(".no-box");
        const del = c.querySelector(".delete-btn");
        no.textContent = `Suspect #${i + 1}`;
        if (i === 0) {
            del.disabled = true;
            del.style.backgroundColor = "#3a3a3a";
            del.style.cursor = "not-allowed";
            del.title = "Cannot remove the first suspect";
        } else {
            del.disabled = false;
            del.style.backgroundColor = "";
            del.style.cursor = "pointer";
            del.title = "";
        }
    });
}

// Form Reset
function resetForm() {
    // Reset all input fields except readonly ones
    document.querySelectorAll('input[type="text"], input[type="datetime-local"], input[type="date"], select, textarea').forEach(el => {
        if (!el.hasAttribute("readonly")) {
            el.value = '';
        }
    });

    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(el => {
        el.checked = false;
    });

    // Remove all tags
    document.querySelectorAll('.tag').forEach(tag => tag.remove());

    // Reset auto-grow textareas
    document.querySelectorAll('textarea.autogrow').forEach(el => {
        autoGrow(el);
    });

    // Reset suspects for prison transport
    if (currentReportType === 'prison') {
        document.getElementById("suspectList").innerHTML = "";
        addSuspect();
    }
}

// Form Validation and Data Collection
function collectFormData() {
    const data = {};
    
    // Collect basic field data
    if (currentConfig.fields) {
        for (const fieldId of currentConfig.fields) {
            const element = document.getElementById(fieldId);
            if (element) {
                data[fieldId] = element.value.trim();
                if (!data[fieldId]) return null; // Required field is empty
            }
        }
    }

    // Collect tags if required
    if (currentConfig.requiredTags && currentConfig.tagContainer) {
        const tags = [...document.querySelectorAll(`#${currentConfig.tagContainer} .tag`)].map(tag => 
            tag.textContent.replace('×', '').trim()
        );
        if (tags.length === 0) return null; // No tags added
        data.tags = tags;
    }

    // Collect checkbox data for fire reports
    if (currentReportType === 'fire') {
        const methods = [...document.querySelectorAll('#methods-used input[type="checkbox"]:checked')].map(cb => cb.value);
        if (methods.length === 0) return null;
        data.methods = methods;
    }

    // Collect checkbox data for medical reports
    if (currentReportType === 'medical') {
        const consciousness = [...document.querySelectorAll('#consciousness input[type="checkbox"]:checked')].map(cb => cb.value);
        const treatment = [...document.querySelectorAll('#treatment input[type="checkbox"]:checked')].map(cb => cb.value);
        if (consciousness.length === 0 || treatment.length === 0) return null;
        data.consciousness = consciousness;
        data.treatment = treatment;
    }

    // Special handling for coroner checkboxes
    if (currentReportType === 'coroner') {
        data.foul = document.getElementById('foul')?.checked ? '✅ Yes' : '❌ No';
        data.meds = document.getElementById('meds')?.checked ? '✅ Yes' : '❌ No';
        data.defib = document.getElementById('defib')?.checked ? '✅ Yes' : '❌ No';
        data.cpr = document.getElementById('cpr')?.checked ? '✅ Yes' : '❌ No';
    }

    // Special handling for suspects (prison transport)
    if (currentConfig.hasSuspects) {
        const suspectEls = document.querySelectorAll(".suspect-container");
        const suspects = [];
        for (const el of suspectEls) {
            const name = el.querySelector("input[type='text']").value.trim();
            const gender = el.querySelector("select").value.trim();
            const dob = el.querySelector("input[type='date']").value.trim();
            if (!name || !gender || !dob) return null;
            suspects.push({ name, gender, dob });
        }
        data.suspects = suspects;
    }

    return data;
}

// Form Submission
function submitForm() {
    const data = collectFormData();
    
    if (!data) {
        showErrorPopup();
        return;
    }

    // Check if webhook URL is configured
    if (currentConfig.webhookUrl.includes('__') || !currentConfig.webhookUrl) {
        showAlert("Webhook URL not configured. Please set up the webhook URL for this report type.", "⚠️ Configuration Error");
        return;
    }

    processSubmission(data);
}

// Form Processing and Submission
function processSubmission(data) {
    const generatedID = randomID();
    
    // Format datetime for display
    let formattedDateTime = '';
    let datetimeElement = null;
    let originalInput = null;
    let span = null;

    if (data.datetime) {
        formattedDateTime = data.datetime.replace('T', ' ');
        datetimeElement = document.getElementById('datetime');
        originalInput = datetimeElement.cloneNode(true);
        span = document.createElement('div');
        span.textContent = formattedDateTime;
        span.style = datetimeElement.style.cssText;
        span.className = datetimeElement.className;
        datetimeElement.parentNode.replaceChild(span, datetimeElement);
    }

    // Hide elements for screenshot
    const elementsToHide = [
        document.querySelector('.button-row'),
        document.querySelector('.header'),
        document.querySelector('.logo'),
        document.querySelector(`#${currentConfig.tagInput}`),
        ...document.querySelectorAll('.tag .remove'),
        ...document.querySelectorAll('.delete-btn')
    ].filter(el => el);

    elementsToHide.forEach(el => el.style.display = 'none');

    // Generate screenshot
    html2canvas(document.querySelector(".card"), {
        backgroundColor: null,
        scale: 2,
        useCORS: true
    }).then(canvas => {
        // Restore hidden elements
        if (span && originalInput) {
            span.parentNode.replaceChild(originalInput, span);
        }
        elementsToHide.forEach(el => el.style.display = '');

        canvas.toBlob(blob => {
            sendToDiscord(blob, data, generatedID);
        });
    });
}

function sendToDiscord(blob, data, generatedID) {
    // Create embed fields based on report type
    const fields = [
        { name: "> ID", value: `\`\`\`\n${generatedID}\n\`\`\``, inline: false }
    ];

    // Add specific fields for different report types
    if (currentReportType === 'arrest' && data.defendant) {
        fields.push({ name: "> DEFENDANT", value: `\`\`\`\n${data.defendant}\n\`\`\``, inline: true });
    }
    if (currentReportType === 'citation' && data.name) {
        fields.push({ name: "> NAME", value: `\`\`\`\n${data.name}\n\`\`\``, inline: true });
    }
    if (currentReportType === 'towing' && data.owner) {
        fields.push({ name: "> REGISTERED OWNER", value: `\`\`\`\n${data.owner}\n\`\`\``, inline: true });
    }

    const embed = {
        title: currentConfig.title,
        color: 4737096,
        fields: fields,
        image: { url: "attachment://report.png" },
        footer: { text: currentConfig.footer },
        timestamp: new Date().toISOString()
    };

    const formData = new FormData();
    formData.append("payload_json", JSON.stringify({ embeds: [embed] }));
    formData.append("file", blob, "report.png");

    const threadQuery = currentConfig.threadId ? `?thread_id=${currentConfig.threadId}` : '';
    const finalURL = `${currentConfig.webhookUrl}${threadQuery}`;

    fetch(finalURL, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
            showPopup();
            resetForm();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert("Failed to Submit Report. Please check your connection.", "❌ Error");
    });
}

// Amount field formatting (for citation reports)
function formatAmountField() {
    const amountField = document.getElementById('amount');
    if (!amountField) return;

    amountField.addEventListener('input', function() {
        let raw = this.value.replace(/[^\d]/g, '');
        if (raw === '') {
            this.value = '';
            return;
        }
        this.value = '$' + raw;
    });
}

// Initialize everything when DOM loads
document.addEventListener("DOMContentLoaded", () => {
    // Detect report type
    currentReportType = detectReportType();
    if (!currentReportType) {
        console.error('Could not detect report type');
        return;
    }
    
    currentConfig = REPORT_CONFIGS[currentReportType];
    console.log(`Initialized ${currentReportType} report`);

    // Initialize auto-grow textareas
    document.querySelectorAll('textarea.autogrow').forEach(el => {
        autoGrow(el);
        el.addEventListener("input", () => autoGrow(el));
    });

    // Initialize tag inputs
    if (currentConfig.tagInput && currentConfig.tagContainer) {
        createTagInput(currentConfig.tagInput, currentConfig.tagContainer);
    }

    // Initialize amount field formatting for citation
    if (currentReportType === 'citation') {
        formatAmountField();
    }

    // Set examination date for coroner reports
    if (currentReportType === 'coroner') {
        const examInput = document.getElementById('exam_date');
        if (examInput) {
            const today = new Date().toISOString().split('T')[0];
            examInput.value = today;
        }
    }

    // Initialize suspects for prison transport
    if (currentReportType === 'prison') {
        addSuspect();
    }
});

// Global functions for HTML onclick handlers
window.resetForm = resetForm;
window.submitForm = submitForm;
window.addSuspect = addSuspect;
window.removeSuspect = removeSuspect;