import { TO_BACKGROUND_START_AUTHENTICATE } from '../utils/messageCommands';
import { sendChromeMessage } from '../utils/utils';
import { openModal } from './redux/modules/modal';
import { init as initAccount } from './redux/modules/accounts';

export function isAuthNeed(store) {
    const { session, 
            allAccounts } = store.getState();
    const userEmail = session.currentUserEmail;

    if (!allAccounts[userEmail])
        return true;
    
    const accountDetails = allAccounts[userEmail];
    if (!accountDetails.notUpgrade && !accountDetails.isLogged) {
        return true;
    }

    return false;    
}

export function tryAuth(store, isAccountInitNeed) {
    const userEmail = store.getState().session.currentUserEmail;
    if (!isAccountInitNeed) {
        store.dispatch(initAccount(userEmail)); 
    }

    if (isAuthNeed(store)) {
        store.dispatch(openModal('SECURITY'));
        console.log("open security modal");
    }
}

export function startAuthetnicate(userEmail) {
     sendChromeMessage(TO_BACKGROUND_START_AUTHENTICATE, userEmail);
}