import { NextFunction, Request, Response } from "express";
import { careerService } from "../service";
// import { validateRequest } from "./ajv-schema";
// import { restaurantBodyInterfaceSchema } from "./ajv-schema/schema";
import { validate } from "uuid";

export const createCareer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await careerService.createCareer(req.body);
    res.status(201).json({
      message: "Career create successful",
      error: null,
      code: 201,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCareers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const careers = await careerService.getAllCareers();
    res.status(200).json({
      data: careers,
      message: "Careers fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const getCareersById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { careersId } = req.params;

  try {
    const careers = await careerService.getCareersById(careersId);
    res.status(200).json({
      data: careers,
      message: "Careers fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCareers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { careersId } = req.params;
  try {
    const { title, jd } = req.body;

    const updatedCareers = await careerService.updateCareers(
      careersId,
      title,
      jd
    );

    res.status(204).json({
      data: updatedCareers,
      message: "Careers fetch successful",
      error: null,
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCareer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await careerService.deleteRestaurant(id);
    res.status(204).json({
      data: null,
      message: "Careers delete successful",
      error: null,

      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createCareer,
  getAllCareers,
  getCareersById,
  updateCareers,
  deleteCareer,
};
