const { User, Task, ProjectMember, Project } = require("../model");
const createError = require("../createError");

exports.createTask = async (data, user, projectId) => {
    if (user.role !== "ADMIN") {
        throw createError(403, "Only Admin can create task");
    }
    const member = await ProjectMember.findOne({
        where: {
            projectId,
            userId: data.assignedTo,
        },
    });
    if (!member) {
        throw createError(
            400,
            "This user is not a member of the project"
        );
    }
    const task = await Task.create({
        title: data.title,
        description: data.description,
        status: data.status || "TODO",
        priority: data.priority || "MEDIUM",
        projectId,
        assignedTo: data.assignedTo,
        createdBy: user.id,
        deadline: data.deadline,
    });

    return task;
};

exports.getTasks = async (user, projectId) => {
    const where = { projectId };
    if (user.role !== "ADMIN") {
        const member = await ProjectMember.findOne({
            where: {
                projectId,
                userId: user.id,
            },
        });
        if (!member) {
            throw createError(
                403,
                "You are not a member of this project"
            );
        }
    }
    const tasks = await Task.findAll({
        where,
        include: [
            {
                model: User,
                as: "assignee",
                attributes: ["id", "fullName", "email"],
            },
            {
                model: User,
                as: "creator",
                attributes: ["id", "fullName", "email"],
            },
            {
                model: Project,
                as: "project",
                attributes: ["id", "projectName"],
            },
        ],
        order: [["created_at", "DESC"]],
    });

    return tasks;
};

exports.getTask = async (taskId, user) => {
    const task = await Task.findByPk(taskId, {
        include: [
            {
                model: User,
                as: "assignee",
                attributes: ["id", "fullName", "email"],
            },
            {
                model: User,
                as: "creator",
                attributes: ["id", "fullName", "email"],
            },
            {
                model: Project,
                as: "project",
                attributes: ["id", "projectName"],
            },
        ],
    });
    if (!task) {
        throw createError(404, "Task not found");
    }
    if (user.role !== "ADMIN") {
        const member = await ProjectMember.findOne({
            where: {
                projectId: task.projectId,
                userId: user.id,
            },
        });
        if (!member) {
            throw createError(
                403,
                "You are not a member of this project"
            );
        }
    }
    return task;
};

exports.updateTask = async (
    taskId,
    data,
    user
) => {
    if (user.role !== "ADMIN") {
        throw createError(403, "Access denied");
    }
    const task = await Task.findByPk(taskId);
    if (!task) {
        throw createError(404, "Task not found");
    }
    const member = await ProjectMember.findOne({
        where: {
            projectId: task.projectId,
            userId: data.assignedTo,
        },
    });
    if (!member) {
        throw createError(
            400,
            "This user is not a member of the project"
        );
    }
    await task.update({
        title: data.title,
        description: data.description,
        priority: data.priority,
        assignedTo: data.assignedTo,
        deadline: data.deadline,
    });
    return task;
};

exports.updateTaskStatus = async (
    taskId,
    status,
    user
) => {
    const task = await Task.findByPk(taskId);
    if (!task) {
        throw createError(404, "Task not found");
    }
    if (
        user.role !== "ADMIN" &&
        task.assignedTo !== user.id
    ) {
        throw createError(403, "Access denied");
    }
    task.status = status;
    await task.save();
    return task;
};

exports.getMyTasks = async (user) => {
    return Task.findAll({
        where: {
            assignedTo: user.id,
        },
        include: [
            {
                model: User,
                as: "assignee",
                attributes: ["id", "fullName", "email"],
            },
            {
                model: User,
                as: "creator",
                attributes: ["id", "fullName", "email"],
            },
            {
                model: Project,
                as: "project",
                attributes: ["id", "projectName"],
            },
        ],
        order: [["created_at", "DESC"]],
    });
};

exports.deleteTask = async (
    taskId,
    user
) => {
    if (user.role !== "ADMIN") {
        throw createError(403, "Access denied");
    }
    const task = await Task.findByPk(taskId);
    if (!task) {
        throw createError(404, "Task not found");
    }
    await task.destroy();
    return true;
};