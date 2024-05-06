import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../model";

const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const startDate = new Date();
    startDate.setDate(1); // Set the day to the first day of the month
    startDate.setHours(0, 0, 0, 0); // Set the time to midnight

    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + 1); // Set the day to the first day of the next month
    endDate.setDate(endDate.getDate() - 1); // Set the time to the last millisecond of the last day of the month

    const users = await User.findAll({
      where: {
        [Op.and]: [
          {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          },
          {
            user_type: "user",
          },
        ],
      },
    });

    const usersFull = await User.findAll({
      where: {
        user_type: "user",
      },
    });
    const data = {
      monthUsers: users.length,
      users: usersFull,
    };
    res.status(200).json({
      data: data,
      message: "Dashboard fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default {
  getDashboard,
};
