function closePinPopup() {
    document.getElementById('pin-popup').style.display = 'none';
}
function showAlert(message, title = '🔔 Notice') {
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

function confirmClearFields() {
    const confirmBox = document.createElement('div');
    confirmBox.style = `
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: #23272A; color: white; padding: 20px 25px; border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.6); z-index: 1000; text-align: center;
        max-width: 90%;
      `;
    confirmBox.innerHTML = `
        <div style="font-size: 15px; color: #ccc;">This will delete all webhook data. Are you sure?</div>
        <button id="confirm-clear-yes" style="margin-top: 15px; padding: 8px 16px;">YES</button>
        <button id="confirm-clear-no" style="margin-top: 15px; padding: 8px 16px; margin-left: 10px;">NO</button>
      `;

    const card = document.querySelector('.card');
    card.appendChild(confirmBox);

    document.getElementById('confirm-clear-yes').onclick = () => {
        try {
            localStorage.removeItem("webhookPresets");
            localStorage.removeItem("webhookHistory");
            localStorage.removeItem("threadHistory");
            localStorage.removeItem("threadNamedHistory");

            const webhookInput = document.getElementById("webhook-url");
            if (webhookInput) webhookInput.value = '';

            populateDatalist('webhook-history', 'webhookHistory');
        } catch (err) {
            console.error("Error clearing data:", err);
        } finally {
            if (card.contains(confirmBox)) card.removeChild(confirmBox);
        }
    };

    document.getElementById('confirm-clear-no').onclick = () => {
        if (card.contains(confirmBox)) card.removeChild(confirmBox);
    };
}

function deletePreset() {
    const name = document.getElementById('preset-name').value.trim();
    if (!name) return showAlert("A preset name is required to delete.");

    const confirmBox = document.createElement('div');
    confirmBox.style = `
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
    confirmBox.innerHTML = `
        <div style="font-size: 15px; color: #ccc;">Do you want to delete <strong>'${name}'</strong> preset?</div>
        <button id="confirm-delete-preset" style="margin-top: 15px; padding: 8px 16px; font-size: 14px; border: none; background: #4f545c; color: white; border-radius: 6px; cursor: pointer;">YES</button>
        <button id="cancel-delete-preset" style="margin-top: 15px; padding: 8px 16px; font-size: 14px; border: none; background: #4f545c; color: white; border-radius: 6px; cursor: pointer;">NO</button>
      `;
    document.querySelector('.card').appendChild(confirmBox);
    document.getElementById('confirm-delete-preset').onclick = () => {
        let presets = JSON.parse(localStorage.getItem("webhookPresets") || "[]");
        const match = presets.find(p => p.name === name);
        if (match) {
            presets = presets.filter(p => p.name !== name);
            localStorage.setItem("webhookPresets", JSON.stringify(presets));
            removeFromHistory('webhookHistory', match.webhook);
            if (match.thread) {
                removeFromHistory('threadHistory', match.thread);
                removeFromNamedThreadHistory(match.thread);
            }
            document.getElementById("preset-name").value = '';
            document.getElementById("webhook-url").value = '';
            document.getElementById("thread-id").value = '';
            populatePresetHistory();
            populateDatalist('webhook-history', 'webhookHistory');
            populateThreadNameDatalist();
            showAlert(`Preset '${name}' was deleted.`, '✅ Deleted');
        } else {
            showAlert(`Preset '${name}' was not found.`, '⚠️ Not Found');
        }
        document.querySelector('.card').removeChild(confirmBox);
    };
    document.getElementById('cancel-delete-preset').onclick = () => {
        document.querySelector('.card').removeChild(confirmBox);
    };
}

function autoGrow(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

document.addEventListener("DOMContentLoaded", () => {
    const locField = document.getElementById("location");
    autoGrow(locField);
    locField.addEventListener("input", () => autoGrow(locField));
});

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

function resetForm() {
    document.querySelectorAll('input[type="text"], input[type="datetime-local"]').forEach(el => el.value = '');
    document.querySelectorAll('.tag').forEach(tag => tag.remove());
    const loc = document.getElementById('location');
    loc.value = '';
    autoGrow(loc);
}

function showErrorPopup() {
    const popup = document.getElementById('error-popup');
    popup.style.display = 'block';
    setTimeout(() => popup.style.display = 'none', 3000);
}

function showPopup() {
    const popup = document.getElementById('popup-overlay');
    popup.style.display = 'block';
    setTimeout(() => popup.style.display = 'none', 3000);
}

function submitForm() {
    const location = document.getElementById('location').value.trim();
    const datetime = document.getElementById('datetime').value.trim();
    const defendant = document.getElementById('defendant').value.trim();
    const officer = document.getElementById('officer').value.trim();
    const offenses = [...document.querySelectorAll('.tag')].map(tag => tag.textContent.replace('×', '').trim());

    if (!location || !datetime || !defendant || !officer || offenses.length === 0) {
        showErrorPopup();
        return;
    }

    window.tempSubmissionData = { location, datetime, defendant, officer, offenses };
    document.getElementById('pin-popup').style.display = 'block';
    document.getElementById('pin-error').style.display = 'none';
}

function savePreset(name, webhook, threadId) {
    if (!name || !webhook) return;
    let presets = JSON.parse(localStorage.getItem("webhookPresets") || "[]");
    const existing = presets.find(p => p.name === name);
    if (existing) {
        existing.webhook = webhook;
        existing.thread = threadId;
    } else {
        presets.push({ name, webhook, thread: threadId });
    }
    localStorage.setItem("webhookPresets", JSON.stringify(presets));
    populatePresetHistory();
}

function populatePresetHistory() {
    const list = document.getElementById("preset-history");
    list.innerHTML = "";
    const presets = JSON.parse(localStorage.getItem("webhookPresets") || "[]");
    presets.forEach(p => {
        const option = document.createElement("option");
        option.value = p.name;
        list.appendChild(option);
    });
}

function fillFieldsFromPreset(name) {
    const presets = JSON.parse(localStorage.getItem("webhookPresets") || "[]");
    const match = presets.find(p => p.name === name);
    if (match) {
        document.getElementById("webhook-url").value = match.webhook;
        document.getElementById("thread-id").value = match.thread || "";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    populatePresetHistory();
    document.getElementById("preset-name").addEventListener("change", e => {
        fillFieldsFromPreset(e.target.value);
    });
});

function validateWebhook() {
    const webhook = document.getElementById('webhook-url').value.trim();
    const threadId = '1396775578396528731';

    if (!webhook) {
        const err = document.getElementById('pin-error');
        err.style.display = 'block';
        const popup = document.getElementById('pin-popup');
        popup.classList.add('shake');
        setTimeout(() => popup.classList.remove('shake'), 400);
        return;
    }

    saveToHistory('webhookHistory', webhook);
    populateDatalist('webhook-history', 'webhookHistory');

    document.getElementById('pin-popup').style.display = 'none';
    window.tempSubmissionData.webhook = webhook;
    window.tempSubmissionData.thread = threadId;
    processSubmission();
}

function clearWebhookData() {
    confirmClearFields();
}

function processSubmission() {
    const data = window.tempSubmissionData;
    const generatedID = randomID();
    const formattedDateTime = data.datetime.replace('T', ' ');

    const datetimeInput = document.getElementById('datetime');
    const originalInput = datetimeInput.cloneNode(true);
    const span = document.createElement('div');
    span.textContent = formattedDateTime;
    span.style = datetimeInput.style.cssText;
    datetimeInput.parentNode.replaceChild(span, datetimeInput);

    const toHide = [
        document.querySelector('.button-row'),
        document.querySelector('.header'),
        document.querySelector('#offenseInput'),
        ...document.querySelectorAll('.tag .remove')
    ];
    toHide.forEach(el => el && (el.style.display = 'none'));

    html2canvas(document.querySelector(".card"), {
        backgroundColor: null,
        scale: 2
    }).then(canvas => {
        span.parentNode.replaceChild(originalInput, span);
        toHide.forEach(el => el && (el.style.display = ''));

        canvas.toBlob(blob => {
            const embed = {
                title: "ARREST REPORT",
                color: 4737096,
                fields: [
                    { name: "> ID", value: `\u0060\u0060\u0060\n${generatedID}\n\u0060\u0060\u0060`, inline: true },
                    { name: "> DEFENDANT", value: `\u0060\u0060\u0060\n${data.defendant}\n\u0060\u0060\u0060`, inline: true },
                ],
                image: { url: "attachment://report.png" },
                footer: { text: "Department of Justice" },
                timestamp: new Date().toISOString()
            };

            const formData = new FormData();
            formData.append("payload_json", JSON.stringify({ embeds: [embed] }));
            formData.append("file", blob, "report.png");

            const threadQuery = data.thread ? `?thread_id=${data.thread}` : '';
            const webhookUrl = '__WEBHOOK_URL__';
            const finalURL = `${webhookUrl}${threadQuery}`;

            fetch(finalURL, {
                method: "POST",
                body: formData
            })
                .then(() => {
                    showPopup();
                    resetForm();
                })
                .catch(() => showAlert("Failed to Submit Report.", "❌ Error"));
        });
    });
}
const offenseInput = document.getElementById('offenseInput');
const offenseContainer = document.getElementById('offense-tags');
offenseInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && this.value.trim()) {
        e.preventDefault();
        addOffenseTag(this.value.trim());
        this.value = '';
    }
});
function addOffenseTag(text) {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `${text} <span class="remove">&times;</span>`;
    offenseContainer.insertBefore(tag, offenseInput);
    tag.querySelector('.remove').onclick = () => tag.remove();
}
function saveToHistory(key, value) {
    let history = JSON.parse(localStorage.getItem(key)) || [];
    if (!history.includes(value)) {
        history.push(value);
        localStorage.setItem(key, JSON.stringify(history));
    }
}
function removeFromHistory(key, value) {
    let history = JSON.parse(localStorage.getItem(key)) || [];
    history = history.filter(item => item !== value);
    localStorage.setItem(key, JSON.stringify(history));
}

function removeFromNamedThreadHistory(threadId) {
    let history = JSON.parse(localStorage.getItem('threadNamedHistory')) || [];
    history = history.filter(item => item.id !== threadId);
    localStorage.setItem('threadNamedHistory', JSON.stringify(history));
}
function saveThreadNamedHistory(name, id) {
    let history = JSON.parse(localStorage.getItem('threadNamedHistory')) || [];
    if (!history.find(entry => entry.name === name && entry.id === id)) {
        history.push({ name, id });
        localStorage.setItem('threadNamedHistory', JSON.stringify(history));
    }
}
function populateDatalist(id, key) {
    const datalist = document.getElementById(id);
    datalist.innerHTML = '';
    const history = JSON.parse(localStorage.getItem(key)) || [];
    history.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        datalist.appendChild(option);
    });
}
function populateThreadNameDatalist() {
    const datalist = document.getElementById('thread-history');
    datalist.innerHTML = '';
    const history = JSON.parse(localStorage.getItem('threadNamedHistory')) || [];
    history.forEach(entry => {
        const option = document.createElement('option');
        option.value = entry.name;
        option.dataset.id = entry.id;
        datalist.appendChild(option);
    });
    const threadInput = document.getElementById('thread-id');
    threadInput.addEventListener('change', () => {
        const selectedName = threadInput.value;
        const matchedOption = Array.from(datalist.options).find(opt => opt.value === selectedName);
        if (matchedOption) {
            threadInput.setAttribute('data-thread-id', matchedOption.dataset.id);
        }
    });
    function getThreadIdByName(name) {
        const history = JSON.parse(localStorage.getItem('threadNamedHistory')) || [];
        const entry = history.find(item => item.name === name);
        return entry ? entry.id : name;
    }
    document.addEventListener('DOMContentLoaded', () => {
        populateDatalist('webhook-history', 'webhookHistory');
        populateThreadNameDatalist();
    });
    document.addEventListener('DOMContentLoaded', () => {
        const threadIdInput = document.getElementById('thread-id');
        const threadNameInput = document.getElementById('thread-name');
        threadNameInput.style.display = 'none';
        threadIdInput.addEventListener('input', () => {
            if (threadIdInput.value.length > 1) {
                threadNameInput.style.display = '';
            } else {
                threadNameInput.style.display = 'none';
            }
        });
    });
};