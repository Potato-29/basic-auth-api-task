const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const Session = require("../models/Session");
module.exports = {
  registerUser: async (username, email, password) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("A user with this email already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return user;
  },

  loginUser: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("We can't find an account with this email");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("The password you entered is incorrect");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const session = new Session({
      sessionId: uuidv4(),
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    await session.save();

    return { token, sessionId: session.sessionId };
  },

  getUserInfo: async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("We can't find your account");
    }
    return { username: user.username, email: user.email, id: user._id };
  },
};
