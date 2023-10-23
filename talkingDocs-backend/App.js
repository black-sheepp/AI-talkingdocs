// Import necessary modules
const express = require("express"); // Import the Express framework
const cors = require("cors"); // Import CORS middleware for cross-origin requests
const App = express(); // Create an Express application instance
const env = require("dotenv").config(); // Load environment variables from.env file
const port = process.env.PORT || 8080;
const db = require("./Config/mongoose"); // Connect to the database using Mongoose
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser"); 

// Middleware setup
App.use(express.json()); // Parse JSON request bodies
App.use(bodyParser.json());

App.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies with extended mode
App.use(cookieParser()); // Parse cookies in incoming requests
App.use(express.static("./Public")); // Serve static files from the 'Public' directory
App.use("/Public", express.static(__dirname + "/Public")); // Serve static files at the '/Public' URL path
App.use(cors()); // Enable CORS for cross-origin requests

// Routing setup
App.use("/", require("./Routes/index")); // Uses the index route for the main application routing

// Starts the server
App.listen(port, () => console.log("TalkingDocs listening on port: " + port)); // Listen on the specified port and log a message
