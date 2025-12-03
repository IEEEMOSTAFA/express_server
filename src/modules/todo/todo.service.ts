import { pool } from "../../config/db";


const createTodo = async(payload: Record<string,unknown>) =>{
 const { user_id,tittle} = payload;

 let result = await pool.query(`INSERT INTO todos(user_id,tittle) VALUES($1, $2) RETURNING *`,[user_id,tittle]);

 return result;
}

const getTodos = async() =>{
     let result = await pool.query(`SELECT* FROM todos`);
     return result;
}


const updateTodo = async(payload: Record<string,unknown>,id:string) =>{

    let{tittle,completed} = payload;
    let result = await pool.query(`UPDATE todos SET tittle = $1,completed = $2 WHERE id = $3 RETURNING* `,[tittle,completed,id]);
    return result;
}


const deleteTodo = async(id: string) =>{
    let result = await pool.query(`DELETE FROM todos WHERE id=$1`,[id]);
     return result;
}

export const todoService = {
    createTodo,getTodos,updateTodo,deleteTodo
}