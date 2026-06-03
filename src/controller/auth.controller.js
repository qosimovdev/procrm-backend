const authService = require("../services/auth.service");
const {
    registerValidation,
} = require("../validation/auth.validation");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email or password invalid",
            });
        }
        const { user, token } =
            await authService.login(email, password);
        res.status(200).json({
            message: "Login success",
            token,
            user,
        });
    } catch (err) {
        console.error("Login error:", err);

        res.status(401).json({
            message: err.message || "Unauthorized",
        });
    }
};

exports.register = async (req, res) => {
    try {
        const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details.map((e) => e.message),
            });
        }
        const { user, token, company } =
            await authService.register(req.body);

        res.status(201).json({
            message: "Register success",
            user,
            token,
            company,
        });

    } catch (err) {
        console.error("Register error:", err);

        res.status(500).json({
            message: err.message,
        });
    }
};