const TAB_URL = '*://mail.google.com/*';

export function sendMessageToContent(message) {
    chrome.tabs.query({url: TAB_URL}, (tabs) => {
        for (let i = tabs.length - 1; i > -1; i--) {
            chrome.tabs.sendMessage(tabs[i].id, {message}, function(response) {
                console.log(response);
                });
            if (!(tabs[i].active)) {
                chrome.tabs.update(tabs[i].id);
            }
        }
    });
}

