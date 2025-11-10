Real-Time Chat Application

This is a full-stack, real-time chat application designed for instant communication. It features user authentication, private messaging, and a modern, responsive user interface.

Project Overview

This application provides a seamless chatting experience where users can sign up, log in, find other users, and engage in real-time private conversations. The backend is built as a robust API to handle authentication, message storage, and real-time events, while the client-side provides a dynamic and interactive user experience.

Tech Stack

Client-Side: (HTML/CSS/JS)

Server-Side: ( Node.js, Express.js, pug)

Database: (MongoDB)

Real-Time: (WebSockets using Socket.io)

Authentication: (JSON Web Tokens (JWT), OAuth)

Deployment: (...)

Implemented Features

As of now, the following core features are implemented and functional:

User Authentication:

Secure user Signup with encrypted password storage.

User Login and session management (e.g., using JWT).

Basic Message Sending:

Authenticated users can send text messages.

Messages are successfully stored in the database, linked to both the sender and receiver.

Development Roadmap (Future Features)

This project is in active development. The following features are planned for upcoming releases, following a phased development roadmap.

Phase 1: Core Chat Experience

[ ] Real-Time Messaging: Implement WebSocket (or similar) connection for instant message delivery without refreshing.

[ ] Sent/Received UI: Differentiate messages with distinct styling and alignment for "sent" (right-aligned) vs. "received" (left-aligned).

[ ] Auto-Scroll: Automatically scroll the chat window to the newest message.

Phase 2: App & User Management

[ ] User/Contact List: Display a list of all registered users to start conversations with.

[ ] 1-on-1 Chat Selection: Allow users to select a contact to open a private chat window and view their specific message history.

Phase 3: Polish & Profiles

[ ] User Profiles: Allow users to set a displayName and upload a profile picture.

[ ] Display Avatars: Show user avatars in the contact list and next to messages.

[ ] Message Timestamps: Display a human-readable timestamp for every message.

Phase 4: Advanced Features

[ ] Online/Offline Status: Show a presence indicator (e.g., a green dot) for users who are currently online.

[ ] Typing Indicators: Show a "User is typing..." message when the chat partner is writing a reply.

[ ] Read Receipts: Implement "Seen" or "Read" status for messages.

[ ] Group Chats: Add functionality to create, join, and chat in multi-user groups.

[ ] Media Sharing: Allow users to send images and files.

Phase 5: Deployment

[ ] Push Notifications: Notify users of new messages even when the app is in the background.

[ ] Full Deployment: Deploy the client and server to a live production environment.

Setup & Installation

(This is a template for you to fill out later)

Clone the repository:

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

Install Backend Dependencies:

cd server
npm install

Install Frontend Dependencies:

cd client
npm install

Set up Environment Variables:

Create a .env file in the /server directory.

Add your DATABASE_URL, JWT_SECRET, and any other required keys.

Run the Application:

Run the backend: npm run dev (in /server)

Run the frontend: npm start (in /client)
