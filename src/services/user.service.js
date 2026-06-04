const createError = require("../createError");
const { User, Company } = require("../model");

exports.createUser = async (data, admin) => {
    if (admin.role !== "ADMIN") {
        throw createError("Only Admin can create users", 403);
    }
    const existingUser = await User.findOne({
        where: {
            email: data.email.toLowerCase(),
            companyId: admin.companyId,
            isDeleted: false,
        },
    });
    if (existingUser) {
        throw createError("Email already exists", 409);
    }
    const user = await User.create({
        fullName: data.fullName,
        userName: data.userName,
        email: data.email.toLowerCase(),
        password: data.password,
        role: data.role || "Developer",
        department: data.department,
        position: data.position,
        phone: data.phone,
        companyId: admin.companyId,
    });
    return user;
};
exports.getUsers = async (admin) => {
    return await User.findAll({
        where: {
            companyId: admin.companyId,
            isDeleted: false
        },
        attributes: {
            exclude: ["password"],
        },
    });
};

exports.me = async (userId) => {
    const user = await User.findOne({
        where: {
            id: userId,
            isDeleted: false,
        },
        attributes: {
            exclude: ["password"],
        },
        include: [
            {
                model: Company,
                as: "company",
                attributes: ["id", "name"],
            },
        ],
    });
    if (!user) {
        return null;
    }
    const teamMember = await User.count({
        where: {
            companyId: user.companyId,
            isDeleted: false,
        },
    });
    return {
        ...user.toJSON(),
        teamMember,
    };
};

exports.updateMe = async (userId, data) => {
    const user = await User.findOne({
        where: {
            id: userId,
            isDeleted: false,
        },
    });
    if (!user) {
        throw createError("User not found");
    }
    await user.update(data);
    return user;
};

exports.updateAvatar = async (userId, file) => {
    const user = await User.findOne({
        where: { id: userId, isDeleted: false },
    });
    if (!user) throw createError("User not found");
    if (!file) throw createError("No file uploaded");
    const avatarUrl = `/uploads/${file.filename}`;
    await user.update({
        avatar: avatarUrl,
    });
    return user;
};

exports.deleteUser = async (userId, admin) => {
    const user = await User.findOne({
        where: {
            id: userId,
            companyId: admin.companyId,
            isDeleted: false,
        },
    });
    if (!user) {
        throw createError("User not found", 404);
    }
    await user.update({
        isDeleted: true,
        deletedBy: admin.id,
        deletedAt: new Date(),
    });
    return user;
};

exports.changePassword = async (userId, data) => {
    const {
        currentPassword,
        newPassword,
        confirmPassword,
    } = data;
    const user = await User.findOne({
        where: {
            id: userId,
            isDeleted: false,
        },
    });
    if (!user) {
        throw createError("User not found", 404);
    }
    const isMatch = await user.checkPassword(
        currentPassword
    );
    if (!isMatch) {
        throw createError(
            "Current password is incorrect",
            400
        );
    }
    if (newPassword !== confirmPassword) {
        throw createError(
            "Passwords do not match",
            400
        );
    }
    if (newPassword.length < 8) {
        throw createError(
            "Password must be at least 8 characters",
            400
        );
    }
    const samePassword = await user.checkPassword(
        newPassword
    );
    if (samePassword) {
        throw createError(
            "New password must be different from current password",
            400
        );
    }
    await user.update({
        password: newPassword,
    });
    return {
        message: "Password changed successfully",
    };
};