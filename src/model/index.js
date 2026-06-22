const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS
db.User = require("./user.model")(
    sequelize,
    Sequelize.DataTypes
);

db.Company = require("./company.model")(
    sequelize,
    Sequelize.DataTypes
);

db.Project = require("./project.model")(
    sequelize,
    Sequelize.DataTypes
)

db.ProjectMember = require("./projectMember.model")(
    sequelize,
    Sequelize.DataTypes
);

db.Task = require("./tasks.model")(sequelize, Sequelize.DataTypes)
// ASSOCIATIONS

// Company -> Users
db.Company.hasMany(db.User, {
    foreignKey: "companyId",
    as: "users",
});

db.User.belongsTo(db.Company, {
    foreignKey: "companyId",
    as: "company",
});

db.Project.belongsTo(db.User, {
    foreignKey: "ownerId",
    as: "owner",
});

db.User.hasMany(db.Project, {
    foreignKey: "ownerId",
    as: "ownedProjects",
});

db.Project.belongsToMany(db.User, {
    through: db.ProjectMember,
    foreignKey: "projectId",
    as: "members",
});

db.User.belongsToMany(db.Project, {
    through: db.ProjectMember,
    foreignKey: "userId",
    as: "projects",
});

// Project -> Tasks
db.Project.hasMany(db.Task, {
    foreignKey: "projectId",
    as: "tasks",
});

db.Task.belongsTo(db.Project, {
    foreignKey: "projectId",
    as: "project",
});

// User (assigned) -> Tasks
db.User.hasMany(db.Task, {
    foreignKey: "assignedTo",
    as: "assignedTasks",
});

db.Task.belongsTo(db.User, {
    foreignKey: "assignedTo",
    as: "assignee",
});

// User (creator) -> Tasks
db.User.hasMany(db.Task, {
    foreignKey: "createdBy",
    as: "createdTasks",
});

db.Task.belongsTo(db.User, {
    foreignKey: "createdBy",
    as: "creator",
});

db.Company.hasMany(db.Task, {
    foreignKey: "companyId",
    as: "tasks",
});

db.Task.belongsTo(db.Company, {
    foreignKey: "companyId",
    as: "company",
});

module.exports = db;