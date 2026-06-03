const userService = require("../services/user.service");

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(
            req.body,
            req.user
        );
        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers(req.user);
        res.status(200).json({
            message: "Users fetched successfully",
            users,
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};

exports.me = async (req, res) => {
    try {
        const user = await userService.me(req.user.id);
        res.status(200).json({
            message: "User fetched successfully",
            user,
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};

exports.updateMe = async (req, res) => {
    try {
        const user = await userService.updateMe(
            req.user.id,
            req.body
        );
        res.status(200).json({
            message: "Profile updated successfully",
            user,
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};

exports.updateAvatar = async (req, res) => {
    try {
        const userId = req.user.id;
        const file = req.file;
        const user = await userService.updateAvatar(userId, file);
        console.log(req.file);
        console.log(req.user);
        res.status(200).json({
            success: true,
            message: "Avatar updated successfully",
            user,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(
            req.params.id,
            req.user
        );
        res.status(200).json({
            message: "User deleted successfully",
            user,
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const result = await userService.changePassword(
            req.user.id,
            req.body
        );
        res.status(200).json(result);
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};