const bcrypt = require("bcrypt");
const permissionsMap = require("../hooks/permissionsMap")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            role: {
                type: DataTypes.ENUM("Admin", "Manager", "Developer"),
                defaultValue: "Developer",
            },
            permissions: {
                type: DataTypes.JSON,
                defaultValue: ["view_project"],
            },
            department: DataTypes.STRING,
            position: DataTypes.STRING,
            avatar: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.ENUM(
                    "Active",
                    "Inactive",
                    "Blocked",
                ),
                defaultValue: "Active",
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            projectCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            completedTasks: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            pendingTasks: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            lastLogin: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            teamMember: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            socials: {
                type: DataTypes.JSON,
                defaultValue: {
                    github: "",
                    linkedin: "",
                    telegram: "",
                },
            },
            bio: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            companyId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Companies",
                    key: "id",
                },
                onDelete: "CASCADE",
                index: true,
            },
        },
        {
            timestamps: true,
        });
    // Parolni tekshirish metodi
    User.prototype.checkPassword = function (password) {
        return bcrypt.compare(password, this.password);
    };
    // Parolni saqlashdan oldin hash qilish
    User.beforeCreate(async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        user.setDataValue(
            "permissions",
            permissionsMap[user.role]
        );
    });
    // Parolni yangilashda ham hash qilish
    User.beforeUpdate(async (user) => {
        if (user.changed("password")) {
            const isHashed = user.password.startsWith("$2b$");
            if (!isHashed) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
        if (user.changed("role")) {
            user.permissions = permissionsMap[user.role];
        }
    });
    return User;
};