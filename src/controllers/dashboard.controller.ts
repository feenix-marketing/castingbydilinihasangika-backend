import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../model";

// const createDishCategory = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const newCategory = await dishCategoryService.createDishCategory(req.body);
//     res.status(201).json({
//       data: newCategory,
//       message: "Dish category create successful",
//       error: null,
//       code: 201,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
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
        // const { id } = req.params;
        // const category = await dishCategoryService.getDishCategoryById(id);
        const usersFull = await User.findAndCountAll({
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
            message: "Dish category fetch successful",
            error: null,
            code: 200,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// const getAllDishCategories = async (
//   _: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const categories = await dishCategoryService.getAllDishCategory();
//     res.status(200).json({
//       data: categories,
//       message: "Dish categories fetch successful",
//       error: null,
//       code: 200,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const getAllDishCategoriesWithDishes = async (
//   _: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const categories = await dishCategoryService.getAllDishCategoryWithDishes();
//     res.status(200).json({
//       data: categories,
//       message: "Dish categories fetch successful",
//       error: null,
//       code: 200,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const updateDishCategory = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     const updatedCategory = await dishCategoryService.updateDishCategory(
//       id,
//       req.body
//     );
//     res.status(204).json({
//       data: updatedCategory,
//       message: "Dish categories update successful",
//       error: null,
//       code: 204,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteDishCategory = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     await dishCategoryService.deleteDishCategory(id);
//     res.status(204).json({
//       data: null,
//       message: "Dish categories delete successful",
//       error: null,
//       code: 204,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export default {
    getDashboard,
    // getDishCategoryById,
    // getAllDishCategories,
    // updateDishCategory,
    // deleteDishCategory,
    // getAllDishCategoriesWithDishes,
};
