const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../service/auth.service");
const { validateCredentials } = require("../validation");
module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    const { error } = validateCredentials(email, password);
    console.log(error);
    if (error) {
      return res.status(400).json({ error });
    }
    try {
      const user = await registerUser(username, email, password);
      res.status(201).json({ msg: "User registered successfully", user });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const { error } = validateCredentials(email, password);
    if (error) {
      return res.status(400).json({ error });
    }
    try {
      const { token, sessionId } = await loginUser(email, password);
      res.cookie("token", token);
      res.json({ msg: "Login successful", sessionId });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const userId = req.user;
      const user = await getUserInfo(userId);
      res.json({ user });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
};
