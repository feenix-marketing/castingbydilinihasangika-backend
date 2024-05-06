import { NextFunction, Request, Response } from "express";
import { dishService } from "../service";

const createUserCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Assuming Plate will be assign to one category
    const { title } = req.body;
    const newDish = await dishService.createCategory(title);
    res.status(201).json({
      data: newDish,
      message: "Category create successful",
      error: null,
      code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await dishService.deleteCategory(id);
    res.status(204).json({
      data: null,
      message: "Category delete successful",
      error: null,
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dishesList = await dishService.getAllCategory();
    res.status(200).json({
      data: dishesList,
      message: "Categories fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createUserCategory,
  deleteCategory,
  getAllCategory,
};
