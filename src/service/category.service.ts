import { title } from "process";
import { Dish, UserCategory, DishCategory, DishRating } from "../model";

/*
@@@ Dish Service
*/

const createCategory = async (title: string): Promise<UserCategory> => {
  return await UserCategory.create({
    title,
  });
};

const deleteCategory = async (id: string) => {
  return await UserCategory.destroy({ where: { id } });
};

const getAllCategory = async () => {
  return await UserCategory.findAll();
};

export default {
  createCategory,
  deleteCategory,
  getAllCategory,
};
