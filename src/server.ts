import dotenv from 'dotenv'
import express,{NextFunction, Request,Response} from "express";
import {Pool} from "pg"
import path  from 'path';
dotenv.config({ path: path.join(process.cwd(), ".env") });
const app = express()
const port = 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Database function:

let pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`
});

let logger = (req: Request,res: Response,next: NextFunction) =>{
console.log(`[${new Date().toDateString()}] ${req.method} ${req.path}  \n`);
next();
}

let initDB = async() =>{
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(140) NOT NULL,
    age INT,
    phone VARCHAR,
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS  todos(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      tittle VARCHAR(200) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      due_date DATE,
      created_at  TIMESTAMP DEFAULT NOW(),
      updated_at  TIMESTAMP DEFAULT NOW()
      )
      `);
};

initDB();















// CRUD operation:





// Create Operation
app.post("/users",logger,async (req:Request,res:Response)=>{
  console.log("Request Body is :",req.body);

  let {name, email} = req.body;

  try{
    let result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
      [name,email]
    );
    // console.log(result.rows[0]);
    // res.send({message: "data inserted...."})
    res.status(201).json({
    success:false,
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
  
});


// Read Operation:
app.get("/users",logger, async (req :Request, res : Response) => {
  // res.send('next level programmer...........!')
  try{
    let result = await pool.query(`SELECT * FROM users`)
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
})


// single read operation:
app.get("/users/:id",logger, async (req :Request, res : Response) => {
  
 try{
  let result = await pool.query(`SELECT * FROM users WHERE id = $1`,[
    req.params.id
  ]);
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

)
// Update operation:
app.put("/users/:id",logger, async (req :Request, res : Response) => {

  const {name,email} = req.body;
  
 try{
  let result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING * `,[name,email, req.params.id]);
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

)


// DELETE operation:
app.delete("/users/:id",logger, async (req :Request, res : Response) => {
  
 try{
  let result = await pool.query(`DELETE FROM users WHERE id = $1`,[
    req.params.id
  ]);
  if (result.rowCount === 0){
    res.status(404).json({
      success:false,
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

)









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
   let result = await pool.query(`SELECT users SET user_id = $1,tittle = $2 WHERE id = $3 RETURNING* `,[user_id,tittle,req.params.id]);

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
    let result = await pool.query(`DELETE FROM todos WHERE id=$1`)

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
  catch{

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
