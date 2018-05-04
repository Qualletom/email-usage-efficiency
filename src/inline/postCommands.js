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
    const message = new Message('inline:receivedUserEmail');
    message.user_email = userEmail;
    window.postMessage(message, 'https://mail.google.com');
}
