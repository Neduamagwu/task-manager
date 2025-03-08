const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = []; // Temporary user storage (Use DB in production)

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered!" });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
};

module.exports = { registerUser, loginUser };
