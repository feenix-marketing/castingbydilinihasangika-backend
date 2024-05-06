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
  deleteOurWork,
};
