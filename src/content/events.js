import { init as initAccount,
         loadAccounts,
         setTokens } from './redux/modules/accounts';

import { setEmail } from './redux/actions';

import { tryAuth } from './authenticate';

import { TO_CONTENT_RECEIVED_USER_EMAIL,
         TO_CONTENT_RECEIVED_TOKENS } from '../utils/messageCommands';

export default (store) => {
    setWindowListeners(store);
    setChromeListeners(store);
}

function setWindowListeners(store) {
    window.addEventListener('message', function (event) {
        if (event.data.type && (event.data.type === 'command') &&
            event.data.extension && (event.data.extension === 'emailEfficiency')) {
            console.log("emailEfficiency inline message");

            switch (event.data.command) {
                case TO_CONTENT_RECEIVED_USER_EMAIL: {
                    const userEmail = event.data.userEmail;
                    store.dispatch(setEmail(userEmail));
                    console.log("store state is ", store.getState());
                    loadAccountFromLocalStorage(store, userEmail)
                        .then((isAccountInitNeed) => {
                            console.log("store state is ", store.getState());
                            tryAuth(store, isAccountInitNeed);
                        }) 
                    break;
                }
                    
            }
        }
    }, false);
}

function setChromeListeners(store) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch(request.command) {   
            case TO_CONTENT_RECEIVED_TOKENS: {
                console.log(TO_CONTENT_RECEIVED_TOKENS);
                // const { session, accounts } = store.getState();
                
                break;
            }
            default: 
                return false;
        }
    
        return true; 
    });
}

function loadAccountFromLocalStorage(store, email) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("allAccounts", (result) => {
            if (!result[email]) {
                return resolve(false);
            }
            store.dispatch(loadAccounts(result.allAccounts));
            console.log("get from localstorage ", result.allAccounts);
        });
        return resolve(true);
    })  
    
}

