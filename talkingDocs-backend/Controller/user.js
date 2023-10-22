const User = require("../Model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};
let verifyToken = "";

module.exports.signUp = async function (req, res) {
	const { name, email, password, linkedIn, github } = req.body;

	if (!email || !password || !linkedIn || !github || !name) {
		return res.status(403).json({ message: "Please enter all details." });
	}

	if (password.length < 6) {
		return res.status(403).json({ message: "Password must be at least 6 characters" });
	}

	const emailExists = await User.findOne({ email });
	if (emailExists) {
		return res.status(403).json({ message: "Email already exists" });
	}

	const user = await User.create({
		name: name,
		email: email,
		password: password,
		github: github,
		linkedIn: linkedIn,
	});

	// generate token
	const token = generateToken(user._id);
	verifyToken = token;

	// send http-only cookie as response to bearer side _ postman testing
	res.cookie("token", token, {
		path: "/",
		httpOnly: true,
		expires: new Date(Date.now() + 1000 * 86400),
		sameSite: "none",
		secure: true,
	});

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

module.exports.signIn = async function (req, res) {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	// validate request parameters
	if (!email || !password) {
		return res.status(403).json({ message: "Please enter a valid email/password." });
	}

	// if user exists
	const userExists = await User.findOne({ email });
	if (!userExists) {
		return res.status(403).json({ message: "User does not exist. Please Sign up." });
	}

	// if user exists and password is correct
	if (user) {
		const correctPassword = await bcrypt.compare(password, user.password);

		// generate token
		const token = generateToken(user._id);
		verifyToken = token;

		// send http-only cookie as response to bearer side
		res.cookie("token", token, {
			path: "/",
			httpOnly: true,
			expires: new Date(Date.now() + 1000 * 86400),
			sameSite: "none",
			secure: true,
		});

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

module.exports.logout = async function (req, res) {
	// send expired http-only cookie as response to bearer side for logout
	res.cookie("token", "", {
		path: "/",
		httpOnly: true,
		expires: new Date(0),
		sameSite: "none",
		secure: true,
	});
	return res.status(200).json({ message: "User logged Out successfully" });
};

module.exports.getToken = async function (req, res) {
	console.log(verifyToken);
	return res.status(200).end(verifyToken);
};
