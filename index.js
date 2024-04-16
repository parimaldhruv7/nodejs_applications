import express from "express";
import bodyParser from "body-parser";
import userRouter from "./usercrud.js";
const app=express();
const port=process.env.PORT || 4000;
app.use(bodyParser.json());
app.get("/",(req,res)=>{
    res.send("<p> Welcome to Home Page");

})
app.use("/user",userRouter)
app.listen(port,()=>{
    console.log(`Server is running in:http://localhost: ${port}`)
})