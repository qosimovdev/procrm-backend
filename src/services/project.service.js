const createError = require("../createError");
const { Project, ProjectMember, User, Task } = require("../model");

exports.createProject = async (data, admin) => {
    if (admin.role !== "ADMIN") {
        throw createError("Only Admin can create projects", 403);
    }
    const {
        projectName,
        description,
        client,
        budget,
        currency,
        startDate,
        deadline,
        status,
        priority,
        category,
        githubUrl,
        liveUrl,
        tags,
        thumbnail,
        members = [],
    } = data;
    if (!projectName) {
        throw createError("Project name is required", 400);
    }
    if (!client) {
        throw createError("Client is required", 400);
    }
    const project = await Project.create({
        projectName,
        description,
        client,
        budgetTotal: Number(budget) || 0,
        budgetSpent: 0,
        currency: currency || "USD",
        startDate: startDate || null,
        deadline: deadline || null,
        status: status || "Planning",
        priority: priority || "Medium",
        category: category || "",
        githubUrl: githubUrl || "",
        liveUrl: liveUrl || "",
        tags: Array.isArray(tags) ? tags : [],
        thumbnail: thumbnail || "",
        ownerId: admin.id,
        companyId: admin.companyId,
    });

    if (members.length > 0) {
        await ProjectMember.bulkCreate(
            members.map((userId) => ({
                projectId: project.id,
                userId,
            }))
        );
    }
    return project;
};
exports.getProjects = async (user) => {
    const projects = await Project.findAll({
        where: {
            companyId: user.companyId,
            isArchived: false,
        },
        include: [
            {
                model: User,
                as: "members",
                attributes: [
                    "id",
                    "fullName",
                    "avatar",
                ],
                through: {
                    attributes: [],
                },
            },
            {
                model: Task,
                as: "tasks",
                attributes: ["id", "status"],
            },
        ],
        order: [["createdAt", "DESC"]],
    });
    const result = projects.map((project) => {
        const totalTasks =
            project.tasks?.length || 0;
        const tasksCompleted =
            project.tasks?.filter(
                (task) => task.status === "DONE"
            ).length || 0;
        const progress =
            totalTasks > 0
                ? Math.round(
                    (tasksCompleted / totalTasks) * 100
                )
                : 0;
        return {
            ...project.toJSON(),
            totalTasks,
            tasksCompleted,
            progress,
        };
    });
    return result;
};

exports.getProject = async (projectId, user) => {
    return await Project.findOne({
        where: {
            id: projectId,
            companyId: user.companyId,
            isArchived: false,
        },
        include: [
            {
                model: User,
                as: "members",
                attributes: ["id", "fullName", "avatar"],
                through: {
                    attributes: [],
                },
            },
            {
                model: Task,
                as: "tasks",
            },
        ],
    });
};