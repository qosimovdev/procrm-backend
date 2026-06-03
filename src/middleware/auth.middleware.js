const jwt = require("jsonwebtoken");
const { User } = require("../model");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }
        if (user.status === "Blocked") {
            return res.status(403).json({
                message: "User is blocked",
            });
        }
        req.user = {
            id: user.id,
            role: user.role,
            companyId: user.companyId,
            permissions: user.permissions,
        };
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};