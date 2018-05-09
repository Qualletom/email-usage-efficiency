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
    meta: {
        localStorage: {
            set: {
                name: 'SET_TMP_TIMYO_UUID',
            }
        },
    },
});

export const loadAccounts = (accounts = {}) => ({
    type: LOAD_ACCOUNTS,
    payload: {
        ...accounts,
    },
});

export const setTokens = (tokens = {}, email) => ({
    type: SET_TOKENS,
    payload: {
        tokens,
        email
    },
});

export const deleteTokens = (email) => ({
    type: DELETE_TOKENS,
    payload: {
        email
    },
});

export const updateAccessToken = (newAccessToken = '') => ({
    type: UPDATE_ACCESS_TOKEN,
    payload: {
        accessToken: newAccessToken,
        email
    },
});

export const disableAccount = (email) => ({
    type: DISABLE_ACCOUNT,
    payload: {
        email,
    },
});

export const enableAccount = (email) => ({
    type: ENABLE_ACCOUNT,
    payload: {
        email,
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

    switch (action.type) { 
        case INIT:
            return {
                [email]: {
                    ...defaultAccountState,
                }
            }
        case SET_TOKENS:
            return {
                [email]: {
                    ...payload.tokens,
                }
            }
        case DELETE_TOKENS:
            return {
                [email]: {
                    accessToken: '',
                    refreshToken: '',
                }
            }
        case UPDATE_ACCESS_TOKEN:
            return {
                [email]: {
                    accessToken: payload.accessToken,
                }
            }
        case DISABLE_ACCOUNT:
            return {
                [email]: {
                    notUpgrade: true,
                }
            }
        case ENABLE_ACCOUNT:
            return {
                [email]: {
                    notUpgrade: false,
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
