const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const PDF_PATH = path.join("/Public/Upload");

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
			maxLength: [250, "Please enter your github url max of 250 characters"],
		},
		linkedIn: {
			type: String,
			maxLength: [250, "Please enter your linkedIn url max of 250 characters"],
		},
		pdf_location: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

// Define the storage for uploaded files
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "..", PDF_PATH)); 
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});

userSchema.statics.uploadedPDF = multer({storage: storage}).single('pdf_location');
userSchema.statics.pdf_path = PDF_PATH;

// encrypt the password before saving to the database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) { 
		return next();
	}
	// hash the password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(this.password, salt);
	this.password = hashPassword;
	next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
