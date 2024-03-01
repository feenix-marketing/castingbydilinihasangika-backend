import { NextFunction, Request, Response } from "express";
import { orderService } from "../service";
import { UserAttributes } from "../typings/express";
import { OurWorks } from "../model";

export const createOurWork = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const ourWorksDetails = req.body;
    // const userId = (req.user as UserAttributes).id;
    const newOrder = await orderService.createOurWork(ourWorksDetails);
    res.status(201).json({
      data: newOrder,
      message: "Our work create successful",
      error: null,
      code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const getOurWorks = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await orderService.getOurWorks();
    res.status(200).json({
      data: orders,
      message: "Our works fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      res.status(404).json({
        data: order,
        message: "Order not Found",
        error: "Order not Found",
        code: 404,
      });
      return;
    }
    res.status(200).json({
      data: order,
      message: "Orders fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const completeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const order = await orderService.completeOrder(orderId);
    if (!order) {
      res.status(404).json({
        data: order,
        message: "Order not Found",
        error: "Order not Found",
        code: 404,
      });
      return;
    }
    res.status(204).json({
      data: order,
      message: "Orders status change successful",
      error: null,
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOurWork = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    await OurWorks.destroy({ where: { id } });

    res.status(204).json({
      data: null,
      message: "Our Work delete successful",
      error: null,
      code: 204,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export default {
  createOurWork,
  getOurWorks,
  getOrderById,
  completeOrder,
  deleteOurWork,
};
