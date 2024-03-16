import { NextFunction, Request, Response } from "express";
import { careerService } from "../service";
// import { validateRequest } from "./ajv-schema";
// import { restaurantBodyInterfaceSchema } from "./ajv-schema/schema";
import { validate } from "uuid";

export const createCareer = async (req: Request, res: Response, next: NextFunction) => {
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

export const getAllCareers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const careers = await careerService.getAllCareers();
        res.status(200).json({
            data: careers,
            message: "Restaurants fetch successful",
            error: null,
            code: 200,
        });
    } catch (error) {
        next(error);
    }
};

export const getRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
    const { restaurantId } = req.params;

    try {
        const restaurant = await careerService.getRestaurantById(restaurantId);
        res.status(200).json({
            data: restaurant,
            message: "Restaurant fetch successful",
            error: null,
            code: 200,
        });
    } catch (error) {
        next(error);
    }
};

export const updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const { restaurantId } = req.params;
    try {
        // validateRequest(
        //   req.body,
        //   restaurantBodyInterfaceSchema,
        //   "Restaurant fields are missing. Please try again",
        //   400
        // );
        const { title, jd } = req.body;

        const updatedRestaurant = await careerService.updateRestaurant(restaurantId, title, jd);

        res.status(204).json({
            data: updatedRestaurant,
            message: "Restaurant fetch successful",
            error: null,
            code: 204,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCareer = async (req: Request, res: Response, next: NextFunction) => {
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
    getRestaurantById,
    updateRestaurant,
    deleteCareer,
};
