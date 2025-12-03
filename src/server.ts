import express,{NextFunction, Request,Response} from "express";

import config from "./config";
import initDB, { pool } from "./config/db";

import { logger } from "./middleware/logger";
import { useRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
const app = express();
const port = config.port;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Database function:



initDB();


// users operation:
app.use("/users",useRoutes);

// todo CRUD OPERATION::
app.use("/todos",todoRoutes);






// Not Found Route Operation:

app.use((req,res) =>{
  res.status(404).json({
    success: false,
    message: "Not Found....Wrong Attack",
    path: req.path
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
