const express = require("express")
const app = express();
const dotenv =  require("dotenv");
dotenv.config();
const dbEmployee = require("./employee")

const port = process.env.PORT || 6001;
app.use (express.json());

app.get("/",async(req,res)=>{
    try {
        res.send("hello dosto kaise ho")
        
    } catch (error) {
        console.log(error);
        
    }
})

app.post("/add", dbEmployee.createEmployee )
app.get("/all", dbEmployee.getEmployee )
app.get("/:id", dbEmployee.getEmployeeById )
app.put("/:id", dbEmployee.updateEmployee )
app.delete("/:id", dbEmployee.deleteEmployee )

app.listen(port,()=>{
    console.log(`serever is running is on port ${port}`)
})