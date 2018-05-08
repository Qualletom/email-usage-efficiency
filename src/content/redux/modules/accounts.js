export const INIT = 'INIT';
export const SET_TOKENS = 'SET_TOKENS';
export const DELETE_TOKENS = 'DELETE_TOKENS';
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN';
export const DISABLE_ACCOUNT = 'DISABLE_ACCOUNT';
export const ENABLE_ACCOUNT = 'ENABLE_ACCOUNT';
export const LOAD_ACCOUNTS = 'LOAD_ACCOUNTS';

export const init = (email) => ({
    type: INIT,
    payload: {
        email,
    },
});

export const loadAccounts = (accounts = {}) => ({
    type: LOAD_ACCOUNTS,
    payload: {
        ...accounts,
    },
});

export const setTokens = (tokens = {}) => ({
    type: SET_TOKENS,
    payload: {
        ...tokens,
    },
});

export const deleteTokens = () => ({
    type: DELETE_TOKENS,
    payload: {
        accessToken: '',
        refreshToken: ''
    },
});

export const updateAccessToken = (newAccessToken = '') => ({
    type: UPDATE_ACCESS_TOKEN,
    payload: {
        accessToken: newAccessToken,
    },
});

export const disableAccount = () => ({
    type: DISABLE_ACCOUNT,
    payload: {
        notUpgrade: true,
    },
});

export const enableAccount = () => ({
    type: ENABLE_ACCOUNT,
    payload: {
        notUpgrade: false,
    },
});

const defaultAccountState = {
    expireTime: undefined,
    accessToken: '',
    refreshToken: '',
    notUpgrade: false,
    isLogged: false
};

export default (allAccounts = { }, action) => {
    const { payload = {} } = action;
    const { email } = payload;
    // const accountData = allAccounts[email] || {};

    switch (action.type) { 
        case INIT:
            return {
                [email]: {
                    ...defaultAccountState,
                }
            }
        case SET_TOKENS:
        case DELETE_TOKENS:
        case UPDATE_ACCESS_TOKEN:
        case DISABLE_ACCOUNT:
        case ENABLE_ACCOUNT:
            return {
                [email]: {
                    ...payload,
                }
            }
        case LOAD_ACCOUNTS:
            return {
                ...payload,
            }
        default:
            return allAccounts;
    }
};
