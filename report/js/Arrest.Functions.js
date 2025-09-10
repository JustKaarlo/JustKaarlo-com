const __WEBHOOK_URL__ = "__WEBHOOK_URL__";
const THREAD_ID = "1396775578396528731";

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

    if (__WEBHOOK_URL__ === "YOUR_DISCORD_WEBHOOK_URL_HERE" || !__WEBHOOK_URL__) {
        showAlert("Webhook URL not configured. Please set up the GitHub Pages secret.", "⚠️ Configuration Error");
        return;
    }

    processSubmission({ location, datetime, defendant, officer, offenses });
}

function processSubmission(data) {
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
                    { name: "> ID", value: `\`\`\`\n${generatedID}\n\`\`\``, inline: true },
                    { name: "> DEFENDANT", value: `\`\`\`\n${data.defendant}\n\`\`\``, inline: true },
                ],
                image: { url: "attachment://report.png" },
                footer: { text: "Department of Justice" },
                timestamp: new Date().toISOString()
            };

            const formData = new FormData();
            formData.append("payload_json", JSON.stringify({ embeds: [embed] }));
            formData.append("file", blob, "report.png");

            const threadQuery = THREAD_ID ? `?thread_id=${THREAD_ID}` : '';
            const finalURL = `${WEBHOOK_URL}${threadQuery}`;

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