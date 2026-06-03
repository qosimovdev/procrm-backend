const router = require("express").Router()
const userController = require("../controller/user.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");

router.get("/me", auth, userController.me)
router.patch("/me/avatar", auth, upload.single("avatar"), userController.updateAvatar)
// router.patch(
//     "/me/avatar",
//     auth,
//     upload.single("avatar"),
//     (req, res, next) => {
//         console.log("MIDDLEWARE WORKING");
//         console.log(req.file);
//         next();
//     },
//     userController.updateAvatar
// );
router.post("/", auth, role("Admin"), userController.createUser);
router.get("/", auth, role("Admin"), userController.getUsers);
router.patch("/me", auth, userController.updateMe)
router.delete("/:id", auth, role("Admin"), userController.deleteUser)
router.patch("/change-password", auth, userController.changePassword)

module.exports = router;