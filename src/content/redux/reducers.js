import { combineReducers } from 'redux';

import { SET_EMAIL,
         LOAD_ACCOUNTS } from './actions';

import menu from './modules/menu';
import modal from './modules/modal';
import allAccounts from './modules/accounts';

export function session(session = {}, action) {
    switch (action.type) {
        case SET_EMAIL:
            return {
                ...action.payload
            };
        default:
            return session;
    }
}

const contentTimyoApp = combineReducers({
    menu,
    modal,
    allAccounts,
    session,
});

export default contentTimyoApp;