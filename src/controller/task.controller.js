const taskService = require("../services/task.service");

exports.createTask = async (req, res, next) => {
    try {
        const task = await taskService.createTask(
            req.body,
            req.user,
            req.params.projectId
        );
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task,
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};

exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await taskService.getTasks(
            req.user,
            req.params.projectId
        );
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};

exports.getTask = async (req, res, next) => {
    try {
        const task = await taskService.getTask(
            req.params.id,
            req.user
        );

        res.status(200).json({
            success: true,
            task,
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};

exports.getMyTasks = async (req, res, next) => {
    try {
        const tasks = await taskService.getMyTasks(req.user);

        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const task = await taskService.updateTask(
            req.params.id,
            req.body,
            req.user
        );

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};

exports.updateTaskStatus = async (req, res, next) => {
    try {
        const task = await taskService.updateTaskStatus(
            req.params.id,
            req.body.status,
            req.user
        );

        res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            task,
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        await taskService.deleteTask(
            req.params.id,
            req.user
        );

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};