 import express,{NextFunction, Request,Response} from "express";
// import { pool } from "../../config/db";
// import { pool } from "../../config/db";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

  let createUser = async (req:Request,res:Response)=>{
  console.log("Request Body is :",req.body);

  let {name, email,password} = req.body;

  try{
    let result = await userServices.createUser(req.body)
    // console.log(result.rows[0]);
    // res.send({message: "data inserted...."})
    res.status(201).json({
    success:true,
    message:"Data Inserted Successfully...",
    data: result.rows[0]
  });

  }
  catch(err: any){
    res.status(500).json({
      success:false,
      message:err.message
    });

  }
  // res.json(req.body);
  
}

let getUser = async (req :Request, res : Response) => {
  // res.send('next level programmer...........!')
  try{
    let result = await userServices.getUser();
    res.status(200).json({
      success:true,
      message: "Users Retrieved Successfully..",
      data: result.rows
    });
  }
  catch(err:any){
   res.status(500).json({
     success: false,
     message:err.message,
     details: err
   })
  }
}


let getSingleUser = async (req :Request, res : Response) => {
  
 try{
  let result = await userServices.getSingleUser(req.params.id as string);
  if (result.rows.length === 0){
    res.status(404).json({
      success:false,
      message:"User not found...",
    });

  }
  else{
    res.status(200).json({
      success: true,
      message: "User fetch successfully....",
      data: result.rows[0]
    })
  }

 }
  catch(err:any){
   res.status(500).json({
     success: false,
     message:err.message,
     details: err
   })
  }

}

let updateUser = async (req :Request, res : Response) => {

  const {name,email} = req.body;
  
 try{
  let result = await userServices.updateUser(name,email,req.params.id!)
  if (result.rows.length === 0){
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
     success: false,
     message:err.message,
     details: err
   })
  }

}


let deleteUser  = async (req :Request, res : Response) => {
  
 try{
  let result = await userServices.deleteUser(req.params.id!)
  if (result.rowCount === 0){
    res.status(404).json({
      success:true,
      message:"User not found...",
    });

  }
  else{
    res.status(200).json({
      success: true,
      message: "User deleted successfully....",
      data: result.rows
    })
  }

 }
  catch(err:any){
   res.status(500).json({
     success: false,
     message:err.message,
     details: err
   })
  }

}


export  const userControllers ={
    createUser,getUser,getSingleUser,updateUser,deleteUser
}