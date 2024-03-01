import express from "express";
import authController from "../controllers/auth.controller";
import authenticateToken from "../middleware/auth.middleware";
import { User } from "../model";

const router = express.Router();

// Registration user route
router.post("/register", authController.register);

// Login user route
router.post("/login", authController.login);

router.get("/user/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(`${id}`);
        console.log(id);

        res.status(200).json({
            data: user,
            message: "User details",
            error: null,
            code: 200,
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll();

        const newUsers = users.map((user) => {
            user.password = "";
            return user;
        });

        res.status(200).json({
            data: newUsers,
            message: "User details",
            error: null,
            code: 200,
        });
    } catch (e) {
        next(e);
    }
});

router.patch("/:id", async (req, res, next) => {
    try {
        const { action } = req.body;
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (action === "personalInfo") {
            user!.first_name = req.body.first_name;
            user!.last_name = req.body.last_name;
            user!.nic = req.body.nic;
            user!.dob = req.body.dob;
        }

        if (action === "contactInfo") {
            user!.contact_number = req.body.contact_number;
            user!.whatsapp_number = req.body.whatsapp_number;
            user!.address = req.body.address;
            user!.direct_city = req.body.direct_city;
        }

        if (action === "measurementsInfo") {
            user!.height = req.body.height;
            user!.shoe_size = req.body.shoe_size;
            user!.dress_size = req.body.dress_size;
            user!.pant_size = req.body.pant_size;
            user!.top_size = req.body.top_size;
            user!.hair_color = req.body.hair_color;
            user!.eye_color = req.body.eye_color;
        }

        if (action === "socialInfo") {
            user!.facebook_url = req.body.facebook_url;
            user!.instagram_url = req.body.instagram_url;
            user!.youtube_url = req.body.youtube_url;
            user!.tiktok_url = req.body.tiktok_url;
        }

        if (action === "experienceInfo") {
            user!.acting_experience = req.body.acting_experience;
            user!.past_two_year_experience = req.body.past_two_year_experience;
        }

        if (action === "skillsInfo") {
            user!.special_skills = req.body.special_skills;
        }

        if (action === "adminInfo") {
            user!.special_notes_admin = req.body.special_notes_admin;
            user!.user_category_admin = req.body.user_category_admin;
        }

        if (action === "imageInfo") {
            user!.showcase_images = req.body.showcase_images;
            user!.profile_picture = req.body.profile_picture;
        }

        await user!.save();

        user!.password = "";

        res.status(200).json({
            data: user,
            message: "User updated successfully",
            error: null,
            code: 200,
        });
    } catch (e) {
        next(e);
    }
});

router.patch("/approve/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        user!.approved_admin = "1";
        await user?.save();
        res.status(200).json({
            data: user,
            message: "User approved successfully",
            error: null,
            code: 200,
        });
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        await user?.destroy();
        res.status(204).json({
            data: null,
            message: "Successfully deleted",
            error: null,
            code: 204,
        });
    } catch (e) {
        next(e);
    }
});

router.use(authenticateToken);

router.post("/my-profile", authController.myProfile);

export default router;
