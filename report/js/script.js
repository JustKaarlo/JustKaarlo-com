// Report Configuration - Set in each HTML file
window.ReportConfig = window.ReportConfig || {};

// Default values if not set
const DEFAULT_CONFIG = {
  WEBHOOK_URL: "__WEBHOOK_URL__",
  THREAD_ID: "",
  REPORT_TYPE: "REPORT",
  REPORT_FOOTER: "Department",
  REPORT_COLOR: 4737096
};

function getConfig() {
  return { ...DEFAULT_CONFIG, ...window.ReportConfig };
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

function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

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

function createTagInput(inputId, containerId) {
  const inp = document.getElementById(inputId);
  const ctr = document.getElementById(containerId);
  
  if (!inp || !ctr) return;

  inp.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
      e.preventDefault();
      addTag(this.value.trim(), ctr, inp);
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

function resetForm() {
  // Reset all form inputs except readonly ones
  document.querySelectorAll('input:not([readonly]), textarea, select').forEach(el => {
    if (el.type === 'checkbox') {
      el.checked = false;
    } else {
      el.value = '';
    }
  });
  
  // Remove all tags
  document.querySelectorAll('.tag').forEach(tag => tag.remove());
  
  // Reset auto-grow textareas
  document.querySelectorAll('.autogrow').forEach(el => autoGrow(el));
  
  // Reset suspect list if present (for prison transport)
  const suspectList = document.getElementById('suspectList');
  if (suspectList) {
    suspectList.innerHTML = '';
    if (typeof addSuspect === 'function') addSuspect();
  }
  
  // Set exam date to today if present (for coroner report)
  const examDate = document.getElementById('exam_date');
  if (examDate) {
    const today = new Date().toISOString().split('T')[0];
    examDate.value = today;
  }
}

function validateForm() {
  const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
  const allInputs = document.querySelectorAll('input:not([readonly]):not([type="checkbox"]), select, textarea');
  
  // If no specific required fields, check all non-checkbox inputs
  const inputs = requiredInputs.length > 0 ? requiredInputs : allInputs;
  
  for (let input of inputs) {
    if (!input.value.trim()) {
      return false;
    }
  }
  
  // Check tags if present
  const tagContainers = document.querySelectorAll('.tag-container');
  for (let container of tagContainers) {
    const tags = container.querySelectorAll('.tag');
    if (tags.length === 0) {
      return false;
    }
  }
  
  // Check checkboxes in required groups
  const checkboxGroups = document.querySelectorAll('.checkbox-group');
  for (let group of checkboxGroups) {
    const checkedBoxes = group.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedBoxes.length === 0) {
      return false;
    }
  }
  
  return true;
}

function submitForm() {
  if (!validateForm()) {
    showErrorPopup();
    return;
  }
  
  const config = getConfig();
  
  // Check if webhook URL is configured
  if (config.WEBHOOK_URL === "NOT_WEBHOOK_URL" || !config.WEBHOOK_URL) {
    showAlert("Webhook URL not configured. Please set up the webhook.", "⚠️ Configuration Error");
    return;
  }
  
  processSubmission();
}

function processSubmission() {
  const config = getConfig();
  const generatedID = randomID();
  const card = document.querySelector('.card');
  
  // Find datetime input and format it
  const datetimeInput = document.querySelector('input[type="datetime-local"]');
  let originalInput = null;
  let span = null;
  
  if (datetimeInput && datetimeInput.value) {
    const formattedDateTime = datetimeInput.value.replace('T', ' ');
    originalInput = datetimeInput.cloneNode(true);
    span = document.createElement('div');
    span.textContent = formattedDateTime;
    span.style = datetimeInput.style.cssText;
    datetimeInput.parentNode.replaceChild(span, datetimeInput);
  }
  
  // Hide elements for screenshot
  const elementsToHide = [
    document.querySelector('.button-row'),
    document.querySelector('.header'),
    document.querySelector('.logo'),
    document.querySelector('#violationInput'),
    document.querySelector('#offenseInput'),
    document.querySelector('#unitInput'),
    ...document.querySelectorAll('.remove'),
    ...document.querySelectorAll('button')
  ].filter(el => el !== null);
  
  elementsToHide.forEach(el => {
    el.style.display = 'none';
  });
  
  html2canvas(card, {
    backgroundColor: null,
    scale: 2,
    useCORS: true
  }).then(canvas => {
    // Restore elements
    if (originalInput && span) {
      span.parentNode.replaceChild(originalInput, span);
    }
    elementsToHide.forEach(el => {
      el.style.display = '';
    });
    
    canvas.toBlob(blob => {
      const embed = {
        title: config.REPORT_TYPE,
        color: config.REPORT_COLOR,
        fields: [
            { name: "> ID", value: `\`\`\`\n${generatedID}\n\`\`\``, inline: true }
        ],
        image: { url: "attachment://report.png" },
        footer: { text: config.REPORT_FOOTER },
        timestamp: new Date().toISOString()
      };
      
      // Add specific fields based on form type
      addSpecificFields(embed);
      
      const formData = new FormData();
      formData.append("payload_json", JSON.stringify({ embeds: [embed] }));
      formData.append("file", blob, "report.png");
      
      const threadQuery = config.THREAD_ID ? `?thread_id=${config.THREAD_ID}` : '';
      const finalURL = `${config.WEBHOOK_URL}${threadQuery}`;
      
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

function addSpecificFields(embed) {
  // Add specific fields based on what's available in the form
  const nameField = document.getElementById('name') || document.getElementById('defendant');
  if (nameField && nameField.value) {
    embed.fields.push({
      name: nameField.id === 'defendant' ? "> DEFENDANT" : "> NAME",
      value: `\`\`\`\n${nameField.value}\n\`\`\``,
      inline: true
    });
  }
  
  const ownerField = document.getElementById('owner');
  if (ownerField && ownerField.value) {
    embed.fields.push({
      name: "> REGISTERED OWNER",
      value: `\`\`\`\n${ownerField.value}\n\`\`\``,
      inline: true
    });
  }
}

// Amount input formatting (for citation reports)
function formatAmountInput(input) {
  input.addEventListener('input', function () {
    let raw = this.value.replace(/[^\d]/g, '');
    if (raw === '') {
      this.value = '';
      return;
    }
    this.value = '$' + raw;
  });
}

// Suspect management for prison transport
function addSuspect() {
  const container = document.getElementById('suspectList');
  if (!container) return;
  
  const suspectCard = document.createElement('div');
  suspectCard.className = 'suspect-container';
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
    </div>`;
  container.appendChild(suspectCard);
  updateSuspectListNumbers();
}

function removeSuspect(btn) {
  const card = btn.closest('.suspect-container');
  if (card) card.remove();
  updateSuspectListNumbers();
}

function updateSuspectListNumbers() {
  const containers = document.querySelectorAll('.suspect-container');
  containers.forEach((c, i) => {
    const no = c.querySelector('.no-box');
    const del = c.querySelector('.delete-btn');
    no.textContent = `Suspect #${i + 1}`;
    if (i === 0) {
      del.disabled = true;
      del.style.backgroundColor = '#3a3a3a';
      del.style.cursor = 'not-allowed';
      del.title = 'Cannot remove the first suspect';
    } else {
      del.disabled = false;
      del.style.backgroundColor = '';
      del.style.cursor = 'pointer';
      del.title = '';
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Setup auto-grow textareas
  document.querySelectorAll('.autogrow').forEach(el => {
    autoGrow(el);
    el.addEventListener('input', () => autoGrow(el));
  });
  
  // Setup tag inputs
  createTagInput('violationInput', 'violation-tags');
  createTagInput('offenseInput', 'offense-tags');
  createTagInput('unitInput', 'unit-tags');
  
  // Setup amount formatting
  const amountField = document.getElementById('amount');
  if (amountField) formatAmountInput(amountField);
  
  // Set exam date to today if present
  const examDate = document.getElementById('exam_date');
  if (examDate) {
    const today = new Date().toISOString().split('T')[0];
    examDate.value = today;
  }
  
  // Initialize suspect list if present
  if (document.getElementById('suspectList')) {
    addSuspect();
  }
});