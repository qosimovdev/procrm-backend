const { Team } = require("../model");

exports.createTeam = async (data, user) => {
    const team = await Team.create({
        name: data.name,
        description: data.description,
        color: data.color || "#8B5CF6",
        status: "Active",
        companyId: user.companyId,
        leaderId: data.leaderId || null,
    });

    return team;
};

exports.getTeams = async (user) => {
    const teams = await Team.findAll({
        where: {
            companyId: user.companyId,
        },
    });

    return teams;
};

exports.getTeamById = async (id, user) => {
    const team = await Team.findOne({
        where: {
            id,
            companyId: user.companyId,
        },
    });

    if (!team) {
        throw new Error("Team not found");
    }

    return team;
};

exports.updateTeam = async (id, data, user) => {
    const team = await Team.findOne({
        where: {
            id,
            companyId: user.companyId,
        },
    });

    if (!team) {
        throw new Error("Team not found");
    }

    await team.update(data);

    return team;
};

exports.deleteTeam = async (id, user) => {
    const team = await Team.findOne({
        where: {
            id,
            companyId: user.companyId,
        },
    });

    if (!team) {
        throw new Error("Team not found");
    }

    await team.destroy();

    return true;
};