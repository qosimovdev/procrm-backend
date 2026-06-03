const route = require("express").Router()
const authController = require("../controller/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")

route.post("/register", authController.register)
route.post("/login", authController.login)

module.exports = route