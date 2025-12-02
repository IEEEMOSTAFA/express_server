import express,{NextFunction, Request,Response} from "express";

import config from "./config";
import initDB, { pool } from "./config/db";

import { logger } from "./middleware/logger";
import { useRoutes } from "./modules/user/user.routes";
const app = express();
const port = config.port;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Database function:



initDB();



app.use("/users",useRoutes)












// todo CRUD OPERATION::

// create:
app.post("/todos",logger, async(req:Request,res: Response) =>{
  const{user_id,tittle} = req.body;

  try{
    let result = await pool.query(`INSERT INTO todos(user_id,tittle) VALUES($1, $2) RETURNING *`,[user_id,tittle]);
    res.status(201).json({
      success:true,
      message:"Todo create things",
      data: result.rows[0]
    })
  }
  catch(err:any){
    res.status(500).json({
      success:false,
      message:err.message
    })

  }
})

// Read:
app.get("/todos",logger, async(req:Request,res: Response) => {
  
  // let {user_id,tittle} = req.body;

  try{
         let result = await pool.query(`SELECT* FROM todos`)
         res.status(200).json({
          success: true,
          message: "User find successfully..",
          data: result.rows
         })
  }
  catch(err:any){
    res.status(500).json({
      success:false,
      message:err.message,
      details: err

    })

  }
})

// Update : 
app.put("/todos/:id", logger, async(req: Request,res: Response) =>{
  let{user_id,tittle} = req.body;
  try{
   let result = await pool.query(`UPDATE todos SET user_id = $1,tittle = $2 WHERE id = $3 RETURNING* `,[user_id,tittle,req.params.id]);

   if(result.rows.length === 0){
    res.status(404).json({
      success:false,
      message:"User not found...",
    });

  }
   else{
    res.status(200).json({
      success: true,
      message: "User updated successfully....",
      data: result.rows[0]
    })
  }


  }
 catch(err:any){
    res.status(500).json({
      success:false,
      message:err.message,
      details: err

    })

  }
})

// Delete::

app.delete("/todos/:id", async (req: Request, res: Response) =>{
  let {user_id,tittle} = req.body;

  try{
    let result = await pool.query(`DELETE FROM todos WHERE id=$1`,[req.params.id]);

    if(result.rowCount === 0){
      res.status(404).json({
        success: false,
        message: "User not found........"
      })
    }
    else{{
      res.status(200).json({
        success: true,
        message: "user delete successfully..",
        data: result.rows
      })
    }}

  }
 catch(err:any){
  res.status(500).json({
    success:false,
    message: err.message
  })
}

})










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
