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


module.exports = db;