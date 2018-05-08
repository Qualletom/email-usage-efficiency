// Util: Wait until the dom is ready be before invocation of function
export function invokeAfterDomIsReady(context = document, selector, time = 400, func) {
    const domEl = context.querySelector(selector);
    if (!domEl) {
        setTimeout(() => {
            invokeAfterDomIsReady(context, selector, time, func);
        }, time);
    } else {
        func(domEl);
    }
}

export function sendChromeMessage(command, userEmail) {
    console.log("sendChromeMessage");
    chrome.runtime.sendMessage({command, userEmail}, (response) => {
        console.log(response);
    });
}

export function saveToLocalstorage(key, value) {
    chrome.storage.local.set({[key]: value}, () => {
        console.log("saved to localstorage ", {[key]: value});
    });
}

export function getFromLocalstorage(key) {
    let value;
    chrome.storage.local.get([key], (res) => {
        value = res.key;
        console.log("get from localstorage ", res.key);
    });
    return value;
}