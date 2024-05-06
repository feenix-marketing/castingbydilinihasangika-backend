import { Dish, OurWorks } from "../model";
import { sequelize } from "../database/database";
import { Transaction } from "sequelize";
import { CustomError } from "../middleware/error.middleware";

interface OrderDetails {
  id: string;
  quantity: string;
}

const createOurWork = async (ourWorkDetails: any) => {
  let transaction: Transaction;
  try {
    transaction = await sequelize.transaction();

    // Create new order
    const newOrder = await OurWorks.create(ourWorkDetails, { transaction });

    await transaction.commit();

    return newOrder;
  } catch (error) {
    if (transaction!) {
      await transaction.rollback();
    }

    throw new CustomError("Our Works create failed", 400);
  }
};

const getOurWorks = async (): Promise<any> => {
  return await OurWorks.findAll();
};

const getOrderById = async (orderId: string): Promise<any> => {
  return await OurWorks.findByPk(orderId);
};

const completeOrder = async (orderId: string): Promise<any> => {
  const order = await OurWorks.findByPk(orderId);

  if (!order) {
    return null;
  }

  // order.status = true;
  await order.save();
  return order;
};

export default { createOurWork, getOurWorks, getOrderById, completeOrder };
