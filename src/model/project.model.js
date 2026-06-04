module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("Project",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            projectName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM(
                    "Planning",
                    "In Progress",
                    "Testing",
                    "Completed",
                    "Blocked"
                ),
                defaultValue: "Planning",
            },
            priority: {
                type: DataTypes.ENUM("Low", "Medium", "High"),
                defaultValue: "Medium",
            },
            category: {
                type: DataTypes.ENUM(
                    "Web App",
                    "Mobile App",
                    "CRM",
                    "ERP",
                    "SaaS",
                    "E-Commerce"
                )
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            deadline: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            progress: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            githubUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            liveUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            thumbnail: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            tags: {
                type: DataTypes.JSON, // ["crm", "react", "node"]
                defaultValue: [],
            },
            budgetTotal: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },
            budgetSpent: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },
            currency: {
                type: DataTypes.STRING,
                defaultValue: "USD",
            },
            client: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // RELATIONS
            ownerId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "SET NULL",
            },
            companyId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Companies",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            isArchived: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            timestamps: true,
        }
    );

    return Project;
};