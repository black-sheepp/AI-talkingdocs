# Project README: ReactJS with Vite Framework, MongoDB, JWT, Node.js, and More

## Project Challenges

For the front-end part, I used Vite ReactJS along with Tailwind CSS to make the user interface look good, and I used Styled Module CSS to style components. I also added some Shadcn components like Profile Menu, buttons, forms, and input fields to make them look nice.

On the back-end, I used Node.js with Express.js for handling requests and MongoDB to store user information and manage user logins. To keep things secure, I used JSON Web Tokens for user authentication, making sure that only authorized users could access certain parts of the project.

For handling PDF files, I used a tool called Multer to store the files and their locations in the database. Then, I processed the uploaded PDFs, breaking them into smaller parts and storing them in a HNSW Vector Store provided by Langchain. This journey expanded my skills and gave me a better understanding of the possibilities offered by advanced technology like Langchain and RAG.


## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Setup and Configuration](#setup-and-configuration)
4. [Project Structure](#project-structure)
5. [Authentication and Authorization](#authentication-and-authorization)
6. [Data Storage](#data-storage)
7. [File Upload](#file-upload)
8. [Frontend and UI](#frontend-and-ui)
9. [API Endpoints](#api-endpoints)

## Introduction

My project is a PDFChat application built using ReactJS Vite Framework, MongoDB for data storage, JWT for user authentication and authorization, and Node.js with Express.js for the backend. It also utilizes various libraries and tools for efficient development, including dotenv for environment variable management, Langchain and its vector store for language processing, Multer for file uploads, and Axios for making requests to the backend. The project is styled with Tailwind CSS and Shadcn Framework for a sleek user interface.

## Technologies Used

- **ReactJS**: A popular JavaScript library for building user interfaces.
- **Vite Framework**: A fast build tool and development server for modern web development.
- **MongoDB**: A NoSQL database for storing user information.
- **JWT (JSON Ib Tokens)**: Used for secure authentication and authorization.
- **Node.js**: A JavaScript runtime for building the backend.
- **Express.js**: A minimal and flexible Node.js application framework for handling routes.
- **dotenv**: For managing environment variables, including OpenAI API keys, MongoDB Atlas credentials, and JWT secrets.
- **Langchain**: For language processing and text analysis.
- **Multer**: A middleware for handling file uploads.
- **Axios**: A promise-based HTTP client for making requests to the backend.
- **Tailwind CSS**: A utility-first CSS framework for styling the frontend.
- **Shadcn Framework**: For enhancing the UI with shadows and effects.

## Setup and Configuration

Before running the project, you need to set up  environment and configuration variables:

1. **Clone the Repository**: Start by cloning this repository to  local machine.

2. **Frontend Setup**:
   - Navigate to the frontend directory and run `npm install` to install frontend dependencies.
   - Use `npm run dev` to start the frontend.

3. **Backend Setup**:
   - Navigate to the backend directory and run `npm install` to install backend dependencies.
   - Create a `.env` file in the backend directory and set the following variables:
     - `PORT`: Port number on server will run.(By default 8080)
     - `username`:  MongoDB Atlas connection username.
     - `password`:  MongoDB Atlas connection password.
     - `JWT_SECRET`:  secret for JWT token generation.
     - `OPENAI_API_KEY`:  OpenAI API key.

4. **Database Setup**:
   - Configure  MongoDB database using the providing your own credentials in dotenv.

5. **Start the Backend**:
   - Run `npm start` to start the backend server.

6. **Access the Application**:
   - Visit `http://localhost:5173` in  browser to access the application.
   - Open Default `http://localhost:8080` or `http://localhost:PORT` in  your terminal to access the backend part application.

## Project Structure

The project structure is organized into two main directories:

- `frontend`: Contains all the ReactJS code for the frontend with typescript.
- `backend`: Contains the Node.js server using Express.js for the backend logic.

## Authentication and Authorization

I have used JWT (JSON web Tokens) for user authentication and authorization. When users register or log in, they receive a token that must be sent with subsequent requests to access authorized routes.

## Data Storage

User information is stored in MongoDB, a flexible NoSQL database. User data is securely stored and retrieved as needed for user interactions.

## File Upload

I have used Multer, a middleware for handling file uploads, allowing users to upload files like images or documents. This feature enhances the user experience by supporting multimedia content.

## Frontend and UI
The frontend is designed with a user-friendly interface using Tailwind CSS and the Shadcn Framework. It offers a responsive and visually appealing experience for users.

## API Endpoints

The backend provides various API endpoints to manage user data, authentication, and file uploads. These endpoints are documented in the code, and you can find more details in the backend's codebase.

<img width="1680" alt="Screenshot 2023-10-27 at 5 06 37 PM" src="https://github.com/black-sheepp/fullstack-talkingdocs/assets/53144060/6ade8be0-ffee-4bd4-aa42-75ec425c3c38">
<img width="1680" alt="Screenshot 2023-10-27 at 5 01 13 PM" src="https://github.com/black-sheepp/fullstack-talkingdocs/assets/53144060/ca270f41-ca89-4c8d-844e-08c57f8a840e">
<img width="1680" alt="Screenshot 2023-10-27 at 5 01 24 PM" src="https://github.com/black-sheepp/fullstack-talkingdocs/assets/53144060/06406733-250f-40d7-bfd3-26347100d172">
<img width="1680" alt="Screenshot 2023-10-27 at 5 02 12 PM" src="https://github.com/black-sheepp/fullstack-talkingdocs/assets/53144060/76e46926-24f8-41ba-a5bc-4f48bb738a83">
<img width="1680" alt="Screenshot 2023-10-27 at 5 02 30 PM" src="https://github.com/black-sheepp/fullstack-talkingdocs/assets/53144060/cf0d01bb-66ac-403a-a1a4-993fa13d5307">
<img width="1680" alt="Screenshot 2023-10-27 at 5 02 54 PM" src="https://github.com/black-sheepp/fullstack-talkingdocs/assets/53144060/6ab96faa-52f5-4dc0-8ef2-4f19b74288f5">
<img width="1680" alt="Screenshot 2023-10-27 at 5 03 15 PM" src="https://github.com/black-sheepp/fullstack-talkingdocs/assets/53144060/7ddfd9d0-8c71-4c8d-a2fb-aeb1c9ffb0e9">
<img width="1680" alt="Screenshot 2023-10-27 at 5 04 45 PM" src="https://github.com/black-sheepp/fullstack-talkingdocs/assets/53144060/614127d9-c181-4537-bc6e-ec7294efa745">
<img width="1680" alt="Screenshot 2023-10-27 at 5 05 24 PM" src="https://github.com/black-sheepp/fullstack-talkingdocs/assets/53144060/f8d535ec-3313-4096-9fb1-4dfdc60c25fe">
<img width="1680" alt="Screenshot 2023-10-27 at 5 05 31 PM" src="https://github.com/black-sheepp/fullstack-talkingdocs/assets/53144060/72e30e22-f520-44b1-9d0c-f0746802b811">
<img width="1680" alt="Screenshot 2023-10-27 at 5 06 09 PM" src="https://github.com/black-sheepp/fullstack-talkingdocs/assets/53144060/66ce2c33-9c97-4c03-9db4-19d9ec102735">
<img width="1680" alt="Screenshot 2023-10-27 at 5 08 06 PM" src="https://github.com/black-sheepp/fullstack-talkingdocs/assets/53144060/7e0a6c55-ec13-482a-a2d8-861e30dd6378">
<img width="1680" alt="Screenshot 2023-10-27 at 5 07 53 PM" src="https://github.com/black-sheepp/fullstack-talkingdocs/assets/53144060/398a437e-7c4f-4aeb-b994-dbe57fe56a01">


