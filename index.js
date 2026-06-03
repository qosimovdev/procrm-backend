require("dotenv").config()
const app = require("./src/app")
const { sequelize } = require("./src/model")

const PORT = process.env.PORT || 5577

sequelize
    .sync()
    .then(() => {
        console.log("Db ulandi");
        app.listen(PORT, () => {
            console.log(`Server shu portda ishladi: ${PORT}`);
        })
    })
    .catch((err) => console.error("Db error: ", err))