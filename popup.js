const toggle = document.getElementById('enableToggle');
const toggleLabel = document.getElementById('toggleLabel');

function loadState() {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.get(['enabled'], (result) => {
      const enabled = result.enabled !== false;
      toggle.checked = enabled;
      toggleLabel.textContent = enabled ? 'Enabled' : 'Disabled';
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

document.getElementById('refreshBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.reload(tab.id);
  document.getElementById('status').textContent = 'Reloading...';
});
