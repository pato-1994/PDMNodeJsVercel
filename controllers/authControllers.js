import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const USER = {
    username: "root",
    passwordHash: await bcrypt.hash('D@nue1990', 10) // Pre-hashed password
};
export const login = async (req, res) => {
    const { username, password } = req.body;

    if(username !== USER.username) {
        return res.status(401).json({ message: "Invalid username " });
    }

    const validPassword = await bcrypt.compare(password, USER.passwordHash)
    if(!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
};