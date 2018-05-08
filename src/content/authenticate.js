import { sendChromeMessage } from '../utils/utils';

export function isAuthNeed(store) {
    // const { session, 
    //         allAccounts } = store.getState();
    // const userEmail = session.currentUserEmail;
    // if (!allAccounts[userEmail])
    //     return true;
    
    // const allAccountsDetails = allAccounts[userEmail];
    // if (allAccountsDetails.)
    
}

export function startAuthetnicate(userEmail) {
     sendChromeMessage('toBackground:startAuthenticate', userEmail);
}