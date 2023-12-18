import { Router } from "express";

import { UserController } from "@/controllers/user.controller";
import { UserService } from "@/services/user.service";
import validate from "@/middlewares/validate-schema";
import { createUserSchema, deleteUserSchema, getOneUserSchema, updateUserSchema } from "@/schemas/user.schema";

const userService = new UserService();
const userController = new UserController(userService);

const userRoutes = Router();

userRoutes.get("/:id", 
    validate(getOneUserSchema),
    userController.getOne
);

userRoutes.get("/", 
    userController.getAll
);

userRoutes.post("/", 
    validate(createUserSchema),
    userController.create
);

userRoutes.patch("/:id",
    validate(updateUserSchema),
    userController.update
);

userRoutes.delete("/:id",
    validate(deleteUserSchema),
    userController.delete
);

export { userRoutes };

