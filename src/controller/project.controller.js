const projectService = require("../services/project.service")

exports.createProject = async (req, res) => {
    console.log(req.body);
    try {
        const project = await projectService.createProject(
            req.body,
            req.user
        );
        res.status(201).json({
            message: "Project created succesfuly",
            project
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await projectService.getProjects(req.user);
        res.status(200).json({
            success: true,
            data: projects,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};

exports.getProject = async (req, res) => {
    try {
        const project = await projectService.getProject(
            req.params.id,
            req.user
        );
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};