import { sendChromeMessage } from '../utils/utils';
import initEvents from './events';

// sendChromeMessage("test");

initEvents();

function injectScript(src) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.runtime.getURL(src);;
    (document.body || document.head || document.documentElement).appendChild(script);
}

injectScript("/webpack/inline.bundle.js");