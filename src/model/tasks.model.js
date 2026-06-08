module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM(
                    "TODO",
                    "IN_PROGRESS",
                    "REVIEW",
                    "DONE"
                ),
                defaultValue: "TODO",
            },
            priority: {
                type: DataTypes.ENUM(
                    "LOW",
                    "MEDIUM",
                    "HIGH",
                    "URGENT"
                ),
                defaultValue: "MEDIUM",
            },
            projectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            assignedTo: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            deadline: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            timestamps: true,
        }
    );
    return Task
}