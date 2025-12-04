import express,{NextFunction, Request,Response} from "express";

import config from "./config";
import initDB, { pool } from "./config/db";

import { logger } from "./middleware/logger";
import { useRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Database function:



initDB();
// "/" -> localhost:5000/
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});
// users operation:
app.use("/users",useRoutes);

// todo CRUD OPERATION::
app.use("/todos",todoRoutes);

//   AUTH ROUTES:

app.use("/auth", authRoutes);




// Not Found Route Operation:

app.use((req,res) =>{
  res.status(404).json({
    success: false,
    message: "Not Found....Wrong Attack",
    path: req.path
  })
})


export default app;