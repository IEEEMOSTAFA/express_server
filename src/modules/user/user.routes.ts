import express,{NextFunction, Request,Response} from "express";
// import { pool } from "../../config/db";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
import { logger } from "../../middleware/logger";
import { auth } from "../../middleware/auth";

let router = express.Router();

router.post("/",userControllers.createUser);
router.get("/",logger,auth("admin"), userControllers.getUser);
router.get("/:id",logger,auth("users","admin"),userControllers.getSingleUser);
router.put("/:id",userControllers.updateUser);
router.delete("/:id",userControllers.deleteUser);


export const useRoutes = router;