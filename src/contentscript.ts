// Storage key
const KEY = "enabled";
const HOTKEY = "c";
// Zoom needed to fill edge to edge 16:9 content on 21:9 screen
const SCALE = 21 / 9 / (16 / 9);

function doTheThing() {
  for (let vidEl of document.querySelectorAll('video')) {
    vidEl.style.transform = `scale(${SCALE})`
  }
}

function undoTheThing() {
  for (let vidEl of document.querySelectorAll('video')) {
    vidEl.style.transform = ''
  }
}

window.onload = () => {
  let enabled = false;

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.altKey && e.key == HOTKEY) {
      enabled = !enabled;
      chrome.storage.local.set({ [KEY]: enabled });
    }
  });
  chrome.storage.local.get(KEY, (items) => {
    enabled = !!items[KEY];
  });
  chrome.storage.onChanged.addListener((changes) => {
    const isFullscreen = !!document.fullscreenElement;
    if (enabled && isFullscreen) {
      doTheThing();
    } else {
      undoTheThing()
    }
  });
};
