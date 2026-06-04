module.exports = (sequelize, DataTypes) => {
    const ProjectMember = sequelize.define("ProjectMember",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            projectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM(
                    "Manager",
                    "Developer",
                    "Tester"
                ),
                defaultValue: "Developer",
            },
        },
        {
            timestamps: true,
        }
    );

    return ProjectMember;
};