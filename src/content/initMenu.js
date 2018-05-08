import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/menu';
import { invokeAfterDomIsReady } from '../utils/utils';
import { Provider } from 'react-redux';

const ACCOUNT_ELEM_ID = '#gbsfw';

export default (store) => {
    invokeAfterDomIsReady(document, ACCOUNT_ELEM_ID, 400, (el) => {
        const domEl = document.querySelector(ACCOUNT_ELEM_ID);
        const { parentElement } = domEl;
        const { parentElement: gmailToolbar } = parentElement || {};
        const rootElem = document.createElement('div');

        rootElem.className = 'trackOvld-menu-container';
        gmailToolbar.insertBefore(rootElem, gmailToolbar.lastChild);

        ReactDOM.render(
            <Provider store={store}><Menu /></Provider>,
            rootElem
        );
    });
};
