import { Model, Sequelize } from "sequelize";
import {
    // initializeCategory,
    initializeDishCategory,
    initializeDishRating,
    initializeDishes,
    initializeOurWorks,
    initializeUserCategory,
    initializeCareers,
    initializeUser,
} from "../model";

import * as path from "path";

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "..", "config", "config.json"))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: "mysql",
    logging: false,
    port: 2000,
});

initializeUser(sequelize);
initializeCareers(sequelize);
initializeOurWorks(sequelize);
initializeUserCategory(sequelize);

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("All models were synchronized successfully.");
    })
    .catch((error: any) => {
        console.error("Error synchronizing models:", error);
    });

export { sequelize };
