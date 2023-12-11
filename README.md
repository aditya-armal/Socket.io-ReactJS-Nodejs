## Chat Application with Node.js, Express, Socket.io, and Reactjs

This repository contains a simple chat application built using Node.js, Express, Socket.io for the backend, and React for the frontend. Users can join different chat rooms by entering room numbers and engage in real-time chatting with each other.

Prerequisites
Make sure you have the following installed on your machine:

Node.js: https://nodejs.org/
npm (Node Package Manager): Included with Node.js installation.
Getting Started
Clone this repository:

```
git clone https://github.com/your-username/chat-app.git
```

Navigate to the project directory:

```
cd chat-app
```

Install dependencies for the server:

```
cd server
npm install
```

Install dependencies for the client:

```
cd ../client
npm install
```

Running the Application
Start the Server
In the server directory, create a .env file with the following content:

```
PORT=3001
```

Adjust the port number if needed.

Run the server:

```
npm start
Start the Client
```
In the client directory, create a .env file with the following content:

```
REACT_APP_SERVER_URL=http://localhost:3001
```

Update the server URL if you are using a different port.

Run the client:

```
npm start
```

Usage
Open your browser and navigate to http://localhost:3000.

Enter a room number and a username to join the chat room.

Start chatting with other users in real-time!

Features
Real-time chat using Socket.io.
Multiple chat rooms with unique room numbers.
Basic and intuitive user interface.

Contributing
Feel free to contribute to this project by opening issues or submitting pull requests. Your feedback and contributions are highly appreciated.
