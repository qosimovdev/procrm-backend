const router = require("express").Router()
const projectController = require("../controller/project.controller")
const auth = require("../middleware/auth.middleware")
const role = require("../middleware/role.middleware")

router.post("/", auth, role("ADMIN"), projectController.createProject)
router.get("/:id", auth, projectController.getProject)
router.get("/", auth, projectController.getProjects)

module.exports = router