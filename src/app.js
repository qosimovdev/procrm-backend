const express = require("express")
const cors = require("cors")
const path = require("path");

const app = express()
app.use(express.json())
app.use(cors())

const authRoutes = require("./routes/auth.route")
app.use("/api/auth", authRoutes)
const userRoutes = require("./routes/user.routes")
app.use("/api/users", userRoutes)




app.get("/", (req, res) => {
    res.send("CRM API running...");
});
app.use("/uploads", express.static("uploads"));

module.exports = app