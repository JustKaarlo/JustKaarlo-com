const WEBHOOK_URL = "__WEBHOOK_URL__";
const THREAD_ID = "1396776491890507796";

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

const violationInput = document.getElementById('violationInput');
const violationContainer = document.getElementById('violation-tags');

violationInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
        e.preventDefault();
        addViolationTag(this.value.trim());
        this.value = '';
    }
});

function addViolationTag(text) {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `${text} <span class="remove">&times;</span>`;
    violationContainer.insertBefore(tag, violationInput);
    tag.querySelector('.remove').addEventListener('click', () => tag.remove());
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
    const name = document.getElementById('name').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const violations = [...document.querySelectorAll('.tag')].map(tag => tag.textContent.replace('×', '').trim());

    if (!location || !datetime || !name || !amount || violations.length === 0) {
        showErrorPopup();
        return;
    }

    if (WEBHOOK_URL === "NOT_WEBHOOK_URL" || !WEBHOOK_URL) {
        showAlert("Webhook URL not configured. Please set up the GitHub Pages secret.", "⚠️ Configuration Error");
        return;
    }

    processSubmission({ location, datetime, name, amount, violations });
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

    const elementsToHide = [
        document.querySelector('.button-row'),
        document.querySelector('.header'),
        document.querySelector('#violationInput'),
        ...document.querySelectorAll('.remove')
    ];
    elementsToHide.forEach(el => el && (el.style.display = 'none'));

    html2canvas(document.querySelector(".card"), {
        backgroundColor: null,
        scale: 2
    }).then(canvas => {
        span.parentNode.replaceChild(originalInput, span);
        elementsToHide.forEach(el => el && (el.style.display = ''));

        canvas.toBlob(blob => {
            const embed = {
                title: "CITATION REPORT",
                color: 4737096,
                fields: [
                    { name: "> ID", value: `\`\`\`\n${generatedID}\n\`\`\``, inline: true },
                    { name: "> NAME", value: `\`\`\`\n${data.name}\n\`\`\``, inline: true },
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

document.getElementById('amount').addEventListener('input', function () {
    let raw = this.value.replace(/[^\d]/g, '');
    if (raw === '') {
        this.value = '';
        return;
    }
    this.value = '$' + raw;
});