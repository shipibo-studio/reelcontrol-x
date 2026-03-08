const toggle = document.getElementById('enableToggle');
const toggleLabel = document.getElementById('toggleLabel');
const downloadToggle = document.getElementById('downloadToggle');
const downloadToggleLabel = document.getElementById('downloadToggleLabel');

function loadState() {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.get(['enabled', 'downloadEnabled'], (result) => {
      const enabled = result.enabled !== false;
      const downloadEnabled = result.downloadEnabled === true;
      toggle.checked = enabled;
      downloadToggle.checked = downloadEnabled;
      toggleLabel.textContent = enabled ? 'Enabled' : 'Disabled';
      downloadToggleLabel.textContent = downloadEnabled ? 'Download Enabled' : 'Download Disabled';
    });
  }
}

loadState();

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.set({ enabled });
  }
  toggleLabel.textContent = enabled ? 'Enabled' : 'Disabled';
  document.getElementById('status').textContent = enabled ? 'Enabled - refresh to apply' : 'Disabled';
});

downloadToggle.addEventListener('change', () => {
  const downloadEnabled = downloadToggle.checked;
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.set({ downloadEnabled });
  }
  downloadToggleLabel.textContent = downloadEnabled ? 'Download Enabled' : 'Download Disabled';
  document.getElementById('status').textContent = downloadEnabled ? 'Download enabled - refresh to apply' : 'Download disabled';
});

document.getElementById('refreshBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.reload(tab.id);
  document.getElementById('status').textContent = 'Reloading...';
});
