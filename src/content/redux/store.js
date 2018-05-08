import cloneDeep from 'lodash.clonedeep';

import {
    createStore,
    applyMiddleware,
} from 'redux';

import reducers from './reducers';
// import { middlewares } from './middlewares';

import { accountsState } from './modules/accounts';

// import { getLogger, isReduxLoggerOn } from 'timyoDebug';

// const debug = getLogger('content/redux/store');

const contentAppState = {
    session: {
        currentUserEmail: '',
    },
    allAccounts: {},
};

let _store;

export function getState() {
    if (_store === undefined) throw new Error('Store is not initialized');

    const state = _store.getState();

    return state;
}

export function dispatch(action) {
    if (_store === undefined) throw new Error('Store is not initialized');

    _store.dispatch(action);
}

export default function initStore() {
    // let bindedMiddlewares = applyMiddleware(...middlewares);

    console.log('init store with default state', contentAppState);

    _store = createStore(
        reducers,
        contentAppState,
        // bindedMiddlewares
    );

    // if (isReduxLoggerOn()) {
    //     _store.subscribe(() =>
    //         debug('store.subscribe => %cstate: ', 'background-color: #80bfff;color: black;', _store.getState()) /* eslint no-console: "off" */
    //     );
    // }

    return _store;
}
