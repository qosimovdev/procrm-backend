const express = require("express")
const cors = require("cors")
const path = require("path");

const app = express()
app.use(express.json())
app.use(cors())

const authRoutes = require("./routes/auth.route")
const userRoutes = require("./routes/user.routes")
const projectRoutes = require("./routes/project.routes")
const taskRoutes = require("./routes/task.route")
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)



app.get("/", (req, res) => {
    res.send("CRM API running...");
});
app.use("/uploads", express.static("uploads"));

module.exports = app