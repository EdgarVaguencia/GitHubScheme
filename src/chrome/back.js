var currentSyntax;
var tabId;
chrome.webNavigation.onDOMContentLoaded.addListener(function(details)  {
  tabId = details.tabId;
  chrome.storage.sync.get('gitHubSchemeSyntax', function(item){ currentSyntax = item.gitHubSchemeSyntax !== undefined ? item.gitHubSchemeSyntax : 'default'; updateCss(); });
});

function updateCss() {
  chrome.tabs.insertCSS(tabId, { file: 'css/'+ currentSyntax +'.css', runAt: 'document_start'});
}