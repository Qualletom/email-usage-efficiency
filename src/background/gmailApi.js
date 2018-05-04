function loadScript(url) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status !== 200) {
            return;
        }

        eval(request.responseText);
    };

    request.open('GET', url);
    request.send();
}

let loaded = 'no';
let gapiClientInProgress;
export function getGAPIClient() {
    if (loaded === 'loaded') {
        return Promise.resolve(gapi);
    }
    if (loaded === 'inProgress') {
        console.log('gapi loading in progress - return');
        return gapiClientInProgress;
    }

    loaded = 'inProgress';
    console.log('loading in progress');
    const result = new Promise(function (resolve, reject) {
        console.log('set window.gapi_onload and load google api client js script');
        window.gapi_onload = () => {
            gapi.client.load('https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest').then(function () {
                console.log('gapi ready');
                loaded = 'loaded';
                resolve(gapi);
            });
        };

        loadScript('https://apis.google.com/js/client.js');
    });

    gapiClientInProgress = result;


    return result;
}

export const setAccessToken = async (accessToken) => {
    await getGAPIClient();

    //const isSameToken = (currentAccessToken === accessToken);
    //const noToken = ((accessToken === undefined) || (accessToken === ''));
    //if (isSameToken) return gapi;
    // if (noToken) {
    //     throw new Error('no token for google api js client!');
    // }

    gapi.auth.setToken({
        access_token: accessToken,
    });

    // currentAccessToken = accessToken;

    // return gapi;
};

export function init() {
    return getGAPIClient();
}