const jwt = require("jsonwebtoken");
const { User, Company } = require("../model");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");


exports.register = async (data) => {
    const existingUser = await User.findOne({
        where: {
            email: data.email.toLowerCase(),
            isDeleted: false,
        },
    });
    if (existingUser) {
        throw new Error("Email already exists");
    }
    // 1. CREATE COMPANY FIRST (ownerId yo'q hali)
    const company = await Company.create({
        name: data.companyName,
        email: data.email,
    });
    // 2. CREATE ADMIN USER
    const user = await User.create({
        fullName: data.fullName,
        userName: data.userName,
        email: data.email.toLowerCase(),
        password: data.password,
        role: "ADMIN",
        companyId: company.id,
    });
    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
            companyId: user.companyId,
            permissions: user.permissions,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES }
    );
    // 3. UPDATE COMPANY WITH OWNER
    await company.update({
        ownerId: user.id,
    });
    const {
        password: _,
        ...safeUser
    } = user.toJSON();
    return {
        user: safeUser,
        company,
        token,
    };
}

exports.login = async (email, password) => {
    const user = await User.findOne({
        where: {
            email: email.toLowerCase(),
            isDeleted: false,
        },
    });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    if (user.isDeleted) {
        throw new Error("Account has been deleted");
    }
    if (user.status === "Blocked") {
        throw new Error(
            "Your account has been blocked"
        );
    }
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    user.lastLogin = new Date();
    await user.save();
    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
            companyId: user.companyId,
            permissions: user.permissions,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES }
    );
    const {
        password: _,
        ...safeUser
    } = user.toJSON();
    return {
        user: safeUser,
        token,
    };
};