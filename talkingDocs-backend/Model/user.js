const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs"); 
const multer = require("multer"); 
const path = require("path"); 
const PDF_PATH = path.join("/Public/Upload"); 

// Create a Mongoose schema for a user
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter a name"], 
		},
		email: {
			type: String,
			required: [true, "Please enter an email address"], 
			unique: true, 
			trim: true, 
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Please enter a valid email address", 
			],
		},
		password: {
			type: String,
			required: [true, "Please enter a valid password"], 
			minLength: [6, "Please enter a valid password with at least 6 characters"], 
		},
		github: {
			type: String,
			maxLength: [250, "Please enter your GitHub URL with a maximum of 250 characters"], 
		},
		linkedIn: {
			type: String,
			maxLength: [250, "Please enter your LinkedIn URL with a maximum of 250 characters"], 
		},
		pdf_location: {
			type: String, // PDF file location
		},
	},
	{
		timestamps: true, 
	}
);

// Define the storage for uploaded PDF files using multer
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "..", PDF_PATH)); // Define the destination path for uploaded PDFs
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname); // Define the filename for uploaded PDFs
	},
});

// Add static methods to the schema so that they can be be accessed from outside directly
userSchema.statics.uploadedPDF = multer({ storage: storage }).single('pdf_location'); // Middleware for handling PDF uploads
userSchema.statics.pdf_path = PDF_PATH; // Static property for the PDF file path

// Encrypt the password before saving it to the database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next(); // If the password hasn't changed, move to the next middleware
	}
	// Hash the password using bcrypt
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(this.password, salt);
	this.password = hashPassword; // Set the hashed password
	next(); // Move to the next middleware
});

// Create a Mongoose model from the schema and export it
const User = mongoose.model("User", userSchema);
module.exports = User;
