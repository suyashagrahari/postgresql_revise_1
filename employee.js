const Pool = require("pg").Pool;

// creating a connection 
const pool = new Pool({
    user: process.env.user,
    host : 'localhost',
    database : 'postgres-api',
    password : process.env.password,
    port : 5432

})

const createEmployee = (req,res)=>{
    const {name,email} = req.body;
    pool.query('insert into employees (name,email) values ($1,$2) returning *',[name,email],(err,result)=>{
        if(err){
            console.log(err);
        }

        res.status(200).json({
            message : "Data created successfully",
            data : result.rows[0]
        })
    })
}

const getEmployee = (req,res)=>{
   pool.query('select * from employees',(err,result)=>{
    if(err){
        console.log(err)
    }
    res.status(200).json({
        message : "Data getting successfully",
        data : result.rows
    })
   })
}

const getEmployeeById = (req,res)=>{
    let id = parseInt(req.params.id)
    pool.query('select * from employees where id=$1',[id],(err,result)=>{
     if(err){
         console.log(err)
     }
     res.status(200).json({
         message : "Data getting successfully",
         data : result.rows
     })
    })
 }

const updateEmployee = (req,res)=>{
    let id = parseInt(req.params.id);
    const {name,email} = req.body;
    pool.query('update employees set name=$1 , email=$2 where id=$3',[name,email,id],(err,result)=>{
        if(err){
            console.log(err);
        }
        res.status(200).json({
            message : "updated successfully!",
            data : result.row
        })
    })
}

const deleteEmployee = (req,res)=>{
    const id = parseInt(req.params.id)
    pool.query('delete from employees where id=$1',[id],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        res.status(200).json({
            message : "deleted successfully!",
            data : result.row
        })
    })
}

module.exports = {
    createEmployee,
    getEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
}