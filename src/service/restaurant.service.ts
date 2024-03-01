import { sequelize } from "../database/database";
import { CustomError } from "../middleware/error.middleware";
import { Dish, DishCategory, Careers } from "../model";

const createCareer = async (data: any) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const newRestaurant = await Careers.create(data);

    await transaction.commit();
    return newRestaurant;
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    throw new CustomError("Restaurant create failed", 400);
  }
};

const getAllCareers = async () => {
  try {
    const restaurants = await Careers.findAll();
    return restaurants;
  } catch (error) {
    throw new CustomError("Restaurant fetch failed", 400);
  }
};

const getRestaurantById = async (id: string) => {
  try {
    const restaurant = await Careers.findByPk(id);
    if (!restaurant) {
      throw new CustomError("Restaurant not found", 404);
    }
    return restaurant;
  } catch (error) {
    throw new CustomError("Restaurant fetch failed", 400);
  }
};

const updateRestaurant = async (id: string, title: string, jd: string) => {
  try {
    const restaurant = await Careers.findByPk(id);
    if (!restaurant) {
      throw new CustomError("Restaurant not found", 404);
    }

    await restaurant.update({
      title,
      jd,
    });

    return restaurant;
  } catch (error) {
    throw new CustomError("Restaurant update failed", 400);
  }
};

const deleteRestaurant = async (id: string) => {
  try {
    const restaurant = await Careers.findByPk(id);
    if (!restaurant) {
      throw new CustomError("Careers not found", 404);
    }
    await restaurant.destroy();
  } catch (error) {
    console.log(error);
    throw new CustomError("Careers delete failed", 400);
  }
};

export default {
  createCareer,
  getAllCareers,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
