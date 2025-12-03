import { pool } from "../../config/db";
import { Request, Response } from "express";
import { todoService } from "./todo.service";


const createTodo =  async(req:Request,res: Response) =>{
//   const{user_id,tittle} = req.body;

  try{
    let result = await todoService.createTodo(req.body);
    res.status(201).json({
      success:true,
      message:"Todo created",
      data: result.rows
    })
  }
  catch(err:any){
    res.status(500).json({
      success:false,
      message:err.message
    })

  }
}


const getTodos =  async(req:Request,res: Response) => {
  
//   // let {user_id,tittle} = req.body;

  try{
         let result = await todoService.getTodos();
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
}


const updateTodo = async(req: Request,res: Response) =>{
  let{user_id,tittle} = req.body;
  try{
   let result = await todoService.updateTodo(req.body,req.params.id!);

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
}


const deleteTodo = async (req: Request, res: Response) =>{
  let {user_id,tittle} = req.body;

  try{
    let result = await todoService.deleteTodo(req.params.id!);

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

}

export const todoControllers = {
    createTodo,getTodos,updateTodo,deleteTodo
}