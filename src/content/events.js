import { sendChromeMessage } from '../utils/utils';

export default () => {
    window.addEventListener('message', function (event) {
        if (event.data.type && (event.data.type === 'command') &&
            event.data.extension && (event.data.extension === 'emailEfficiency')) {
            console.log("emailEfficiency message");

            switch (event.data.command) {
                case 'inline:receivedUserEmail': {
                    sendChromeMessage('content:startAuthenticate');
                    break;
                }
                    
            }
        }
    }, false);
}

