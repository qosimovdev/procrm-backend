const router = require("express").Router();
const taskController = require("../controller/task.controller");
const auth = require("../middleware/auth.middleware");

router.post(
    "/projects/:projectId",
    auth,
    taskController.createTask
);

router.get(
    "/projects/:projectId",
    auth,
    taskController.getTasks
);

// MUHIM: :id dan oldin
router.get(
    "/my-tasks",
    auth,
    taskController.getMyTasks
);

router.patch(
    "/:id/status",
    auth,
    taskController.updateTaskStatus
);

router.patch(
    "/:id",
    auth,
    taskController.updateTask
);

router.delete(
    "/:id",
    auth,
    taskController.deleteTask
);

router.get(
    "/:id",
    auth,
    taskController.getTask
);

module.exports = router;