importScripts("js/func.js");

onStartup(() => {});
chrome.action.onClicked.addListener(openGame);
chrome.runtime.onInstalled.addListener(e => {
  "install" === e.reason && openGame()
});
alarm();
