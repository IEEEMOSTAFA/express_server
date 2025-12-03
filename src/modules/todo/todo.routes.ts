

import { Router } from "express";
import { todoControllers } from "./todo.controller";

let router = Router();

router.post("/",todoControllers.createTodo);
router.get("/",todoControllers.getTodos);
router.put("/:id",todoControllers.updateTodo);
router.delete("/:id",todoControllers.deleteTodo);

export const todoRoutes = router;