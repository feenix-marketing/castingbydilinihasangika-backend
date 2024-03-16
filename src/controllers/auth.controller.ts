import { NextFunction, Request, Response } from "express";
import { authService } from "../service";
import { User } from "../model";

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = req.body;
        const tokens = await authService.registerUser(body);

        res.status(201).json({
            data: tokens!.accessToken,
            message: "Successfully registered to the system",
            error: null,
            code: 201,
        });
        res.status(201).json();
    } catch (error) {
        next(error);
    }
};

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        const tokens = await authService.loginUser(email, password);

        if (!tokens?.accessToken) {
            res.status(401).json({
                data: null,
                message: "Login failed. Invalid Credentials",
                error: "Login failed. Invalid Credentials",
                code: 401,
            });
            return;
        }

        res.status(200).json({
            data: tokens.accessToken,
            message: "Successfully logged in to the system",
            error: null,
            code: 200,
        });
    } catch (error) {
        next(error);
    }
};

const myProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user } = req;

        res.status(200).json({
            data: user,
            message: "User details",
            error: null,
            code: 200,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
    myProfile,
};
