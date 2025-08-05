import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import cloudinary from "../lib/cloudinary.js";



//signup new user
export const signup = async (req, res) => {
    const { fullname, email, password, profilepic, bio } = req.body;
    try {
        if (!fullname || !email || !password || !profilepic || !bio) {
            return res.json({ success: false, })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            fullname, email, password: hashedPassword, profilepic, bio
        });
        const token = generateToken(newUser._id);
        res.json({
            success: true, userData: newUser,
            token, message: "User created successfully"
        });
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });
    }
}
//controller for user login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid credentials" })
        }
        const token = generateToken(userData._id);
        res.json({
            success: true, userData,
            token, message: "User logged in successfully"
        });

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });

    }
}
//controller to check if user is authenticated
export const checkAuth = async (req, res) => {
    res.json({ success: true, user: req.user });
}

//controller to update user profile details
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, profilepic, bio } = req.body;
        const userId = req.user._id;
        let updatedUser;
        if (!profilepic) {
            updatedUser = await User.findByIdAndUpdate(userId, { bio, fullname }, { new: true });

        } else {
            const upload = await cloudinary.uploader.upload(profilepic);

            updatedUser = await User.findByIdAndUpdate(userId, { bio, fullname, profilepic: upload.secure_url },
                { new: true });
        }
        res.json({success: true, user: updatedUser});
    }catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}