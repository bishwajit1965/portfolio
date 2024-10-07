const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const admin = require("firebase-admin"); // Firebase Admin SDK for verifying Firebase token
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const getCurrentUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userModel = new User();
    const user = await userModel.findUserById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ email: user.email, role: user.role });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid token", error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { email, password, role = "user" } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userModel = new User();
    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.createUser({
      email,
      password: hashedPassword, // Store hashed password
      role,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Exclude password from user object before sending it back
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed, please try again later." });
  }
};

const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the Firebase token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Check if the user exists in your database
    const userModel = new User();
    let user = await userModel.findUserByEmail(decodedToken.email);

    if (!user) {
      // Create the user if they don't exist
      const newUser = await userModel.createUser({
        email: decodedToken.email,
        password: "", //Google users do not need to provide password
        role: "user", // Default role
      });

      // Return a JWT token for the user
      const jwtToken = jwt.sign(
        { id: newUser._id, email: newUser.email, role: newUser.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      // Send the JWT token and user data to the frontend
      res.status(200).json({ token: jwtToken, user: newUser });
    }
    // If user exists, generate and return JWT
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET
    );
    return res.status(200).json({ token: jwtToken, user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Google login failed", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userModel = new User();
    const user = await userModel.findUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid user credentials" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Compare hashed password
    const isMatch = await bcrypt.compare(hashedPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Passwords do not match" });
    } else {
      hashedPassword = user.password;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed, please try again later." });
  }
};

module.exports = { getCurrentUser, registerUser, googleLogin, loginUser };
