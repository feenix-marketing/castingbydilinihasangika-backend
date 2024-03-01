import express from "express";
import {
  authRouter,
  dashboardRouter,
  userCategory,
  restaurantRouter,
  dishReviewRouter,
  ourWorksRouter,
  reportsRouter,
} from "./routes";
import morgan from "morgan";
require("dotenv").config({ path: ".env.local" });
import cors from "cors";
import cookieSession from "cookie-session";
import errorHandlerMiddleware from "./middleware/error.middleware";

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/career", restaurantRouter);
app.use("/api/user-category", userCategory);
app.use("/api/our-works", ourWorksRouter);
app.use("/api/upload", reportsRouter);
app.use("/api/dashboard", dashboardRouter);
// app.use("/api/dish-review", dishReviewRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🏁 ✅`);
});
