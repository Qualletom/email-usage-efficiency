import authenticate from './OAuth';
import { init as initGmailApi } from './gmailApi';
import { sendMessageToContent } from './utils';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';    

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(request.command) {   
        case 'toBackground:startAuthenticate': {
            authenticate(request.userEmail);
            break;
        }
        default: 
            return false;
    }

    return true; 
});

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
        chrome.tabs.query({}, function (tabs) {
            // reuse last openened gmail tab if found
            for (let i = tabs.length - 1; i > -1; i--) {
                if (tabs[i].url.indexOf('mail.google.com') > -1) {
                    chrome.tabs.reload(tabs[i].id);
                    chrome.tabs.update(tabs[i].id, {active: true});
                    return;
                }
            }
            // open a new gmail tab
            chrome.tabs.create({url: gmailURL, active: true});
        });
    } 
});

/* here are some utility functions for making common gmail requests */
function getThreads(query, labels){
  return gapi.client.gmail.users.threads.list({
		userId: 'me',
		q: query, //optional query
		labelIds: labels //optional labels
	}); //returns a promise
}

//takes in an array of threads from the getThreads response
function getThreadDetails(threads){
  var batch = new gapi.client.newBatch();

	for(var ii=0; ii<threads.length; ii++){
		batch.add(gapi.client.gmail.users.threads.get({
			userId: 'me',
			id: threads[ii].id
		}));
	}

	return batch;
}

function getThreadHTML(threadDetails){
  var body = threadDetails.result.messages[0].payload.parts[1].body.data;
	return B64.decode(body);
}

function archiveThread(id){
  var request = gapi.client.request(
		{
			path: '/gmail/v1/users/me/threads/' + id + '/modify',
			method: 'POST',
			body: {
				removeLabelIds: ['INBOX']
			}
		}
	);

    request.execute();
}

const initBackground = async () => {
    // debug('initBackground start');
    // initUpdateStat();

    console.log('init google api client');
    await initGmailApi();
    console.log('google api client are inited');
//    debug('initGmailClient done');
};

initBackground().then(() => {
    console.log('initBackground done!');
});
