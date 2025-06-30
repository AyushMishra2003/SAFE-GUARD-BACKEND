import User from "../models/user.model.js";
import AppError from "../utils/error.utlis.js";

// CREATE - Add a new user
export const addUser = async (req, res, next) => {
    try {
        const { fullName, email, password, phoneNumber, gender } = req.body;

        if (!fullName || !email || !password || !phoneNumber) {
            return next(new AppError("All fields are required", 400));
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(new AppError("User already exists", 400));
        }

        const user = new User({
            fullName,
            email,
            password,
            phoneNumber,
            gender,
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// READ - Get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            
            data: users,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// READ - Get a single user by ID
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(new AppError("User not found", 404));

        res.status(200).json({
            success: true,
            message:"Get User by Id",
            data: user,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// UPDATE - Update a user by ID
export const updateUser = async (req, res, next) => {
    try {
        const { fullName, phoneNumber, gender } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { fullName, phoneNumber, gender },
            { new: true, runValidators: true }
        );

        if (!updatedUser) return next(new AppError("User not found", 404));

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// DELETE - Delete a user by ID
export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) return next(new AppError("User not found", 404));

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
