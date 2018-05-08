import { init as initAccount,
         loadAccounts,
         setTokens } from './redux/modules/accounts';

import { setEmail } from './redux/actions';

import { isAuthNeed } from './authenticate';
import { openModal } from './redux/modules/modal';

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
                case 'toContent:receivedUserEmail': {
                    const userEmail = event.data.userEmail;
                    store.dispatch(setEmail(userEmail));
                    store.dispatch(initAccount(userEmail));
                    console.log("store state is ", store.getState());
                    loadAccountsFromLocalStorage(store);

                    if (isAuthNeed(store)) {
                        store.dispatch(openModal('SECURITY'));
                        console.log("open security modal");
                    }
                    break;
                }
                    
            }
        }
    }, false);
}

function setChromeListeners(store) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch(request.command) {   
            case 'toContent:receivedTokens': {
                console.log("toContent:receivedTokens");
                // const { session, accounts } = store.getState();
                
                break;
            }
            default: 
                return false;
        }
    
        return true; 
    });
}

function loadAccountsFromLocalStorage(store) {
    chrome.storage.local.get("allAccounts", (accounts) => {
        store.dispatch(loadAccounts(accounts));
        console.log("get from localstorage ", accounts);
    });
}

