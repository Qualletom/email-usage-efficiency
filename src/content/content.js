import reduxWatch from 'redux-watch'

import { sendChromeMessage,
         saveToLocalstorage } from '../utils/utils';

import initEvents from './events';

import initStore, { getState } from './redux/store';
import initModal from './initModal';
import initMenu from './initMenu';

const store = initStore();

let w = reduxWatch(store.getState, 'allAccounts');
store.subscribe(w((newValue, oldValue, objectPath) => {
    saveToLocalstorage("allAccounts", newValue)
    console.log('%s changed from %s to %s', objectPath, oldValue, newValue);
  }))

init();

function injectScript(src) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.runtime.getURL(src);;
    (document.body || document.head || document.documentElement).appendChild(script);

    [
        '/css/trackOvldStyles.css',
    ].map((cssFilePath) => {
        return chrome.extension.getURL(cssFilePath);
    }).forEach((cssUrl) => {
        appendStyleFileToHead(cssUrl);
    });
}


function appendStyleFileToHead(url) {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = url;

    document.head.appendChild(style);
}

function init() {
    injectScript("/webpack/inline.bundle.js");
    initEvents(store);
    initMenu(store);
    initModal(store);  
}