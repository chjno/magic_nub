var page = chrome.extension.getURL('popup/ps.html');
var win = window.open(page, "ps", "width=300, height=322");
var reopened = false;
var prevTab;

chrome.browserAction.onClicked.addListener(function (tab){
  if (win.closed){
    reopened = true;
    prevTab = currentTabId;
    win = window.open(page, "ps", "width=300, height=322");
  }
});

var currentTabId = 0;
chrome.tabs.onActivated.addListener(function (activeInfo){
  if (reopened){
    currentTabId = prevTab;
    reopened = false;
  } else {
    currentTabId = activeInfo.tabId;
    chrome.tabs.sendMessage(currentTabId, coords);
  }

});

var coords = {type: 'coords'};
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.type == 'coords'){
    coords = msg;
  } else if (msg.type == 'getCoords'){
    chrome.tabs.sendMessage(currentTabId, coords);
  } else if (msg.type == 'openLink'){
    chrome.tabs.update(currentTabId, {url: msg.url});
  } else {
    chrome.tabs.sendMessage(currentTabId, msg);
  }
});
