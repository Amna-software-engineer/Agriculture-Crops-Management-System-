
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/auth.model.js";
dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "someaccesssecret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "somerefreshsecret";


// Login Contoller
export const Login = async (req, res) => {
    const {email,password}=req.body;
    
            try {
                if (!email || !password) {
                    return res.status(401).json({
                        success: false,
                        message: "Please provide all the fields",
                    });
                    
                }
                const user = await UserModel.findOne({ email });
                if (!user) {
                    return res .status(404) .json( { 
                        success: false,
                         message: "email or user does not found"
                     }); }
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const accessToken = jwt.sign(
                        { name: user.name, emial: user.email },
                        JWT_ACCESS_SECRET,
                    );
                    const refreshToken = jwt.sign(
                        { name: user.name, email: user.email },
                        JWT_REFRESH_SECRET,
                    );
                    res.status(200).json({
                        success: true,
                        message: "Login Successfully",
                        accessToken,
                        refreshToken,
                        user: {
                            _id: user._id,
                            email: user.email,
                            name: user.name,
                            role: user.role,
                        },
                    });
                }
            } catch (error) {
                console.log(error);
                return res.status(400).json({ success:false, message: ["Invalid Credentials"] });
            }

        }

export const Register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(401).json({
                success: false,
                message: "Please provide all the fields",
            });
        }

        const existingEmailWithRole = await UserModel.findOne({ email, role });

        if (existingEmailWithRole) {
            return res.status(401).json({
                success: false,
                message: "Email with role already exists.",
            });
        }

        const user = await UserModel.create({
            name,
            email,
            role,
            password,
        });

        if (user) {
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
            });
        }
    } catch (error) {
        console.log("Error in Register Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
};