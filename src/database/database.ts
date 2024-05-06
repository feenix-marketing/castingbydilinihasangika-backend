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
const config = require(path.join(
  __dirname,
  "..",
  "..",
  "config",
  "config.json"
));

const configFinal = config["development"];
// const configFinal = config["production"]; //FIXME: production on

const sequelize = new Sequelize(
  configFinal.database,
  configFinal.username,
  configFinal.password,
  {
    host: configFinal.host,
    dialect: "mysql",
    logging: false,
    port: 3306,
  }
);

initializeUser(sequelize);
initializeCareers(sequelize);
initializeOurWorks(sequelize);
initializeUserCategory(sequelize);

sequelize
  .sync({ force: false }) //FIXME: force => false
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((error: any) => {
    console.error("Error synchronizing models:", error);
  });

export { sequelize };
