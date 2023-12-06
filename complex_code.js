/** filename: complex_code.js */

// This code is a complex implementation of a chat application using JavaScript

// Defining the Chat class
class Chat {
  constructor() {
    this.users = [];
    this.messages = [];
  }

  addUser(user) {
    this.users.push(user);
    this.notifyUserJoined(user);
  }

  removeUser(user) {
    const userIndex = this.users.indexOf(user);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      this.notifyUserLeft(user);
    }
  }

  sendMessage(user, messageText) {
    const message = new Message(user, messageText);
    this.messages.push(message);
    this.notifyNewMessage(message);
  }

  notifyUserJoined(user) {
    // Notify all users about a new user joining the chat
    for (const otherUser of this.users) {
      if (otherUser !== user) {
        otherUser.receiveNotification(`User ${user.getUsername()} has joined the chat.`);
      }
    }
  }

  notifyUserLeft(user) {
    // Notify all users about a user leaving the chat
    for (const otherUser of this.users) {
      if (otherUser !== user) {
        otherUser.receiveNotification(`User ${user.getUsername()} has left the chat.`);
      }
    }
  }

  notifyNewMessage(message) {
    // Notify all users about a new message
    for (const user of this.users) {
      user.receiveMessage(message);
    }
  }
}

// Defining the User class
class User {
  constructor(username) {
    this.username = username;
    this.notifications = [];
  }

  getUsername() {
    return this.username;
  }

  receiveNotification(notification) {
    this.notifications.push(notification);
  }

  receiveMessage(message) {
    console.log(`[${message.getUser().getUsername()}]: ${message.getText()}`);
  }

  showNotifications() {
    for (const notification of this.notifications) {
      console.log(notification);
    }
    this.notifications = [];
  }
}

// Defining the Message class
class Message {
  constructor(user, text) {
    this.user = user;
    this.text = text;
    this.timestamp = new Date();
  }

  getUser() {
    return this.user;
  }

  getText() {
    return this.text;
  }

  getTimestamp() {
    return this.timestamp;
  }
}

// Creating an instance of the Chat application
const chatApp = new Chat();

// Creating users and adding them to the chat
const user1 = new User("John");
const user2 = new User("Alice");
const user3 = new User("Bob");

chatApp.addUser(user1);
chatApp.addUser(user2);
chatApp.addUser(user3);

// Users sending messages
chatApp.sendMessage(user1, "Hello everyone!");
chatApp.sendMessage(user2, "Hey John, how are you?");
chatApp.sendMessage(user3, "Hi guys, what's the topic today?");

// Showing notifications to users
user1.showNotifications();
user2.showNotifications();
user3.showNotifications();