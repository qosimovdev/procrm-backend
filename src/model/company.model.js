module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define(
        "Company",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            slug: {
                type: DataTypes.STRING,
                unique: true,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },

            phone: {
                type: DataTypes.STRING,
            },

            website: {
                type: DataTypes.STRING,
            },

            logo: {
                type: DataTypes.STRING,
                defaultValue: "/default-company.png",
            },

            industry: {
                type: DataTypes.STRING,
            },

            size: {
                type: DataTypes.ENUM(
                    "1-10",
                    "11-50",
                    "51-100",
                    "101-500",
                    "500+"
                ),
            },

            address: {
                type: DataTypes.STRING,
            },

            description: {
                type: DataTypes.TEXT,
            },

            status: {
                type: DataTypes.ENUM(
                    "Active",
                    "Inactive"
                ),
                defaultValue: "Active",
            },
            ownerId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
        },
        {
            timestamps: true,
        }
    );

    return Company;
};