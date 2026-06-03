const Joi = require("joi");

exports.registerValidation = (data) => {
    const schema = Joi.object({
        fullName: Joi.string()
            .min(3)
            .max(50)
            .required(),
        userName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .max(30)
            .required(),
        phone: Joi.string()
            .allow("", null),
        role: Joi.string()
            .valid("Admin", "Manager", "User"),
        department: Joi.string().valid(
            "Engineering",
            "Design",
            "Product",
            "QA",
            "HR",
            "Finance"
        ),
        position: Joi.string().valid(
            "Frontend Developer",
            "Backend Developer",
            "UI/UX Designer",
            "Project Manager",
            "QA Engineer",
            "DevOps Engineer",
            "HR Manager",
            "Marketing Specialist",
            "Full-Stack Developer"
        ),
        avatar: Joi.string()
            .uri()
            .allow("", null),
        status: Joi.string().valid(
            "Active",
            "Inactive",
            "Blocked"
        ),
        address: Joi.string()
            .max(255)
            .allow("", null),
        bio: Joi.string()
            .max(500)
            .allow("", null),
        socials: Joi.object({
            github: Joi.string()
                .allow("", null),

            linkedin: Joi.string()
                .allow("", null),

            telegram: Joi.string()
                .allow("", null),
        }),
        projectCount: Joi.number(),
        completedTasks: Joi.number(),
        pendingTasks: Joi.number(),
        companyName: Joi.string().required()
    });
    return schema.validate(data, {
        abortEarly: false,
    });
};