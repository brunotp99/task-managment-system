import { Request, Response, Router } from "express";

import { userRoutes } from "./user.routes";
import { taskRoutes } from "./task.routes";

const routes = Router();

routes.use("/api/users", userRoutes)
routes.use("/api/tasks", taskRoutes)

routes.get("/", (req: Request, res: Response) => {
    return res.send("I'm alive!")
});

export { routes };