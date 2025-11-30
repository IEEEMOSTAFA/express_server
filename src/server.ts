import dotenv from 'dotenv'
import express,{Request,Response} from "express";
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
app.get("/", (req :Request, res : Response) => {
  res.send('next level programmer...........!')
})

app.post("/",(req:Request,res:Response)=>{
  console.log("Request Body is :",req.body);
  // res.json(req.body);
  res.status(201).json({
    success:true,
    message:"API is working....!"
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
