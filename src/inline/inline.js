console.log("Extension loading...");
import $ from 'jquery';
import GmailFactory from 'gmail-js';
import { postUsername } from './postCommands';

const gmail = new GmailFactory.Gmail($);
window.gmail = gmail;

gmail.observe.on("load", () => {
    const userEmail = gmail.get.user_email();
    postUsername(userEmail);
    console.log("Hello, " + userEmail + ". This is your extension talking!");
});