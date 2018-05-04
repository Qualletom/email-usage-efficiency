import { setAccessToken } from './gmailApi';

const manifest = chrome.runtime.getManifest();

const CLIENT_ID = manifest.oauth2.client_id;

const path = 'https://accounts.google.com/o/oauth2/auth?' +
        'access_type=offline' +
        '&approval_prompt=force' +
        '&client_id=' + CLIENT_ID +
        '&redirect_uri=urn:ietf:wg:oauth:2.0:oob' + 
        '&response_type=code' +
        '&scope=https://mail.google.com/ email profile'


const left = Math.round((screen.width / 2) - (800 / 2));
const top = Math.round((screen.height / 2) - (500 / 1.4));

export default () => {
    chrome.tabs.create({
        url: path,
        active: false
    }, createPopup);
}

let authenticationTab;

function createPopup(currentTab) {
    authenticationTab = currentTab;
    chrome.windows.create({
        tabId: authenticationTab.id,
        type: 'popup',
        focused: true,
        width: 500,
        height: 700,
        top: top,
        left: left
    });
    chrome.tabs.onUpdated.addListener(extractCode);

    chrome.tabs.onRemoved.addListener(function onRemoved() {
        chrome.tabs.onUpdated.removeListener(extractCode);
        chrome.tabs.onRemoved.removeListener(onRemoved);
    })

}

const RESULT_PREFIX = ['Success', 'Denied', 'Error'];
function extractCode(tabId, changeInfo, tab) {
    if (tabId === authenticationTab.id) {
        const titleParts = tab.title.split(' ', 2);

        const result = titleParts[0];
        if (titleParts.length == 2 && RESULT_PREFIX.indexOf(result) >= 0) {
            chrome.tabs.onUpdated.removeListener(extractCode);
            chrome.tabs.remove(tabId);

            const response = titleParts[1];
            switch (result) {
                //code=.......
                case 'Success': {
                    console.log(response);
                    fetchAccessToken(response);
                    break;
                }
                case 'Denied':
                    console.log(response);
                break;
                case 'Error':
                    console.log(response);
                break;
            }
        }
    }
}

function fetchAccessToken(codeParam) {
    const xhr = new XMLHttpRequest();
    
    const params =  codeParam + 
                    "&client_id=" + CLIENT_ID + 
                    "&redirect_uri=urn:ietf:wg:oauth:2.0:oob" + 
                    "&grant_type=authorization_code";

    const url = `https://www.googleapis.com/oauth2/v4/token?${params}`;
    xhr.responseType = 'json';
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            const accessToken = xhr.response["access_token"];
            const refreshToken = xhr.response["refresh_token"]
            setAccessToken(accessToken);
        }
    }
    xhr.send();s
}