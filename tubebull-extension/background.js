// background.js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && tab.url && tab.url.startsWith('https://www.youtube.com/')) {
    if (changeInfo.status === 'complete') {
      setTimeout(() => {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files : [ "Inject.js" ],
        });
      }, 1000);};
      }
  });