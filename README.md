# social-anxiety-connection-18
A social network API - using MongoDB/Express/Mongoose

## Table of Content

- [Description](#description)
- [Usage](#usage)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Walkthrough Video](#walkthrough-video)
- [Acknowledgements](#acknowledgements)
- [License](#license)
- [Features](#features-1)

## Description
The `social-anxiety-connection-18` is a social network API designed to allow users to share thoughts, react to friends' thoughts, and manage a friend list efficiently. Built with MongoDB for its flexibility with large amounts of unstructured data and Express.js for routing, this project demonstrates a powerful backend setup that can handle the dynamic needs of a modern social network platform.

## Usage
To use the social network API, users can perform various actions such as creating, updating, and deleting user profiles and thoughts, adding and removing friends, and posting reactions to thoughts. This API serves as the backend foundation for a social media startup aiming to manage large amounts of unstructured data seamlessly.

### Prerequisites
- Node.js
- MongoDB
- Mongoose
- Express.js

### Installation
1. Clone the repository to your local machine:

git clone https://github.com/yourusername/social-anxiety-connection-18.git

2. Navigate into the project directory:

cd social-anxiety-connection-18

3. Install the required npm packages:

npm install


### Running the Application
To start the server, run the following command in your terminal:

npm start

The server will start, and the Mongoose models will sync to the MongoDB database.

### Walkthrough Video
A walkthrough video that demonstrates the functionality of the social media API and the technical acceptance criteria is available at [Insert Link Here].

## Acknowledgements
Referenced following websites:
- https://stackoverflow.com
- https://www.w3schools.com
- https://forum.codewithmosh.com/

Special thanks to Xpert, the AI Learning Assistant, for providing valuable assistance and guidance.

## License
---MIT License

Copyright (c) [2023] [Christopher Robert Naro]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Features
- User Creation and Management: Create, update, and delete user profiles.
- Thought Posting: Users can post, update, and delete thoughts.
- Reactions: Users can post and delete reactions to thoughts.
- Friend List Management: Users can add and remove friends.
- Data Formatting: Uses Mongoose and potentially a JavaScript date library to format