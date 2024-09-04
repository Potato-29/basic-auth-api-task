const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controller/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getUser);

module.exports = router;
