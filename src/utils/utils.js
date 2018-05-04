// Util: Wait until the dom is ready be before invocation of function
export function invokeAfterDomIsReady(context, selector, time, func) {
    if (context.querySelector(selector) != null) {
        func();
    } else {
        setTimeout(function () {
            invokeAfterDomIsReady(context, selector, time, func);
        }, time);
    }
}

export function sendChromeMessage(text) {
    console.log("sendChromeMessage");
    chrome.runtime.sendMessage(text, (response) => {
        console.log(response);
    });
    
}