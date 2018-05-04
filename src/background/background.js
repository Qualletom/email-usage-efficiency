import authenticate from './authenticate';
import { init as initGmailApi } from './gmailApi';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';    

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(request) {
        case 'content:startAuthenticate': {
            authenticate();
            break;
        }
        default: 
            return false;
    }

    return true; 
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
