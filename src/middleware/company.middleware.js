module.exports = (req, res, next) => {
    if (!req.user.companyId) {
        return res.status(403).json({
            message: "Company not found",
        });
    }
    next();
};