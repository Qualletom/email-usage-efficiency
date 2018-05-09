import { TO_CONTENT_RECEIVED_USER_EMAIL } from '../utils/messageCommands';

export function Message(command) {
    this.type = 'command';
    this.command = command;
    this.extension = "emailEfficiency"
}

// export function postCommand(cmd) {
//     const message = new Message(cmd);
//     window.postMessage(message, 'https://mail.google.com');
// }

export function postUsername(userEmail) {
    console.log("postUsername");
    const message = new Message('toContent:receivedUserEmail');
    message.userEmail = userEmail;
    window.postMessage(message, 'https://mail.google.com');
}
