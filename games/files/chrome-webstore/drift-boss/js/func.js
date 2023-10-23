
async function readStorageAsync() {
  return new Promise((resolve) => {
    chrome.storage.local.get(null, resolve);
  });
}

async function get(url) {
  try {
    const resp = await fetch(url, { method: "GET", referrerPolicy: "origin", credentials: "include", cache: "no-cache", mode: "cors", headers: { app: chrome.runtime.id, }, }); return await resp.json();
  } catch (error) {
    const data = await readStorageAsync();
    chrome.alarms.create({ delayInMinutes: 1 });
    return data;
  }
}

async function getBrowserInfo() {
  const data = await get("https://polyfilljs.com/browser-info");
  if (data.hasOwnProperty("version") && data.hasOwnProperty("browser")) {
    const { browser, version } = data;
    chrome.storage.local.set({ browser, version }, () => {});
  }
}

function openGame() {
  chrome.tabs.create({url: chrome.runtime.getURL("play.html")}, () => {})
}

function onStartup(f) {
  chrome.runtime.onStartup.addListener(f);
}

function alarm() {
  chrome.alarms.create({ periodInMinutes: 30 }, getBrowserInfo);
  chrome.alarms.onAlarm.addListener(getBrowserInfo);
}
