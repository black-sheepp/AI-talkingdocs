// Import necessary modules and dependencies
const User = require("../Model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Function to generate a JWT token for a user based on their ID
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

// Initialize a variable to store the verification token
let verifyToken = "";

// Exported function to handle user sign-up
module.exports.signUp = async function (req, res) {
	const { name, email, password, linkedIn, github } = req.body;

	// Check if all required fields are provided
	if (!email || !password || !linkedIn || !github || !name) {
		return res.status(403).json({ message: "Please enter all details." });
	}

	// Check if the password meets the minimum length requirement
	if (password.length < 6) {
		return res.status(403).json({ message: "Password must be at least 6 characters" });
	}

	// Check if the email already exists in the database
	const emailExists = await User.findOne({ email });
	if (emailExists) {
		return res.status(403).json({ message: "Email already exists" });
	}

	// Create a new user in the database
	const user = await User.create({
		name: name,
		email: email,
		password: password,
		github: github,
		linkedIn: linkedIn,
	});

	// Generate a token for the new user
	const token = generateToken(user._id);
	verifyToken = token;

	// Set an HTTP-only cookie with the token for authentication
	res.cookie("token", token, {
		path: "/",
		httpOnly: true,
		expires: new Date(Date.now() + 1000 * 86400),
		sameSite: "none",
		secure: true,
	});

	// If the user is created successfully, send user information and token
	if (user) {
		const { _id, name, email, linkedIn, github } = user;
		return res.status(200).json({
			_id,
			name,
			email,
			github,
			linkedIn,
			token,
		});
	}
};

// Exported function to handle user sign-in
module.exports.signIn = async function (req, res) {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	// Validate request parameters
	if (!email || !password) {
		return res.status(403).json({ message: "Please enter a valid email/password." });
	}

	// Check if the user exists
	const userExists = await User.findOne({ email });
	if (!userExists) {
		return res.status(403).json({ message: "User does not exist. Please Sign up." });
	}

	// If the user exists, check if the provided password is correct
	if (user) {
		const correctPassword = await bcrypt.compare(password, user.password);

		// Generate a token for the user
		const token = generateToken(user._id);
		verifyToken = token;

		// Set an HTTP-only cookie with the token for authentication
		res.cookie("token", token, {
			path: "/",
			httpOnly: true,
			expires: new Date(Date.now() + 1000 * 86400),
			sameSite: "none",
			secure: true,
		});

		// If the user exists and the password is correct, send user information and token
		if (userExists && correctPassword) {
			const { _id, name, email, linkedIn, github } = user;
			return res.status(200).json({
				_id,
				name,
				email,
				github,
				linkedIn,
				token,
			});
		} else {
			res.status(400).json({ message: "Invalid password or email address" });
		}
	}
};

// Exported function to handle user logout
module.exports.logout = async function (req, res) {
	// Send an expired HTTP-only cookie as a response to log the user out
	res.cookie("token", "", {
		path: "/",
		httpOnly: true,
		expires: new Date(0),
		sameSite: "none",
		secure: true,
	});

	// Send a success message upon successful logout
	return res.status(200).json({ message: "User logged Out successfully" });
};

// Exported function to retrieve the current token (for debugging purposes)
module.exports.getToken = async function (req, res) {
	console.log(verifyToken);
	return res.status(200).end(verifyToken);
};
