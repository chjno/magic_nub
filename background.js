var page = chrome.runtime.getURL('popup/ps.html');
var win;
chrome.windows.create({ url: page, type: 'popup', width: 300, height: 322, focused: true }, (w) => win = w);

var currentTabId = 0;
chrome.tabs.onActivated.addListener(function (activeInfo) {
  if (activeInfo.windowId != win.id) {
    currentTabId = activeInfo.tabId;
    chrome.tabs.sendMessage(currentTabId, coords);
  }
});

chrome.windows.onRemoved.addListener(function (windowId) {
  if (windowId == win.id) {
    chrome.windows.create({ url: page, type: 'popup', width: 300, height: 322, focused: true }, (w) => win = w);
  }
})

var coords = { type: 'coords' };
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.type == 'coords') {
    coords = msg;
  } else if (msg.type == 'getCoords') {
    chrome.tabs.sendMessage(currentTabId, coords);
  } else if (msg.type == 'openLink') {
    if (msg.url) {
      chrome.tabs.update(currentTabId, { url: msg.url });
    }
  } else {
    chrome.tabs.sendMessage(currentTabId, msg);
  }
});
