import { setAccessTokenForGAPI } from './gmailApi';
import { sendMessageToContent } from './utils';
import { saveToLocalstorage } from '../utils/utils';
import { TO_CONTENT_RECEIVED_TOKENS } from '../utils/messageCommands';

const manifest = chrome.runtime.getManifest();

const CLIENT_ID = manifest.oauth2.client_id;

const left = Math.round((screen.width / 2) - (800 / 2));
const top = Math.round((screen.height / 2) - (500 / 1.4));

let userEmail;

export default (email) => {
    userEmail = email;
    chrome.tabs.create({
        url: generatePath(CLIENT_ID),
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
            const tokens = {
                accessToken: xhr.response["access_token"],
                refreshToken: xhr.response["refresh_token"]
            }
            setAccessTokenForGAPI(tokens.accessToken);
            saveTokensToLocalStorage(tokens);
            // sendMessageToContent(TO_CONTENT_RECEIVED_TOKENS);
        }
    }
    xhr.send();
}

function generatePath(clientId) {
    const path = 'https://accounts.google.com/o/oauth2/auth?' +
                  'access_type=offline' +
                  '&approval_prompt=force' +
                  '&client_id=' + clientId +
                  '&redirect_uri=urn:ietf:wg:oauth:2.0:oob' + 
                  '&response_type=code' +
                  '&scope=https://mail.google.com/ email profile' + 
                  '&user_id=' + userEmail;
    return path;
}

function saveTokensToLocalStorage(tokens) {
    chrome.storage.local.get("allAccounts", (result) => {
        const accounts = result.allAccounts;
        accounts[userEmail].accessToken = tokens.accessToken;
        accounts[userEmail].refreshToken = tokens.refreshToken;
        accounts[userEmail].isLogged = true;
        accounts[userEmail].notUpgrade = true;

        chrome.storage.local.set({"allAccounts" : accounts}, () => {
            console.log("saved to localstorage ", accounts);
        });
    });
}