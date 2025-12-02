import express,{NextFunction, Request,Response} from "express";
import {Pool} from "pg"
import config from ".";


export let pool = new Pool({
  connectionString: `${config.connection_str}`
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

export default initDB;