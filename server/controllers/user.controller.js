import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";
import db from '../index.js';
const User = db.users;

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send({
            message: "Username, email and password are required!",
        });
    }

    try {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { username }]
            }
        });

        if (existingUser) {
            return res.status(400).send({
                message: "User already exists!",
            });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        res.status(201).send({
            message: "User registered successfully!",
            user: { username: user.username, email: user.email },
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message || "An error occurred while registering the user!",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            message: "Email and password are required!",
        });
    }

    try {
        const user = await User.findOne({
            where: { email },
        });

        if(!user) {
            return res.status(400).send({
                message: "Invalid username or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).send({
                message: "Invalid username or password",
            });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).send({
            message: "Successfully logged in!",
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message || "Something went wrong while logging in!",
        });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).send({
                message: "User not found!",
            });
        }

        res.status(200).send({
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message || "An error occurred while fetching the user profile.",
        });
    }
};