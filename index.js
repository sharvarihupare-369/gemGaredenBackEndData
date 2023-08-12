const express = require("express")
const connection = require("./db")
const app = express()
require("dotenv").config()
const cors = require("cors")
const userRouter = require("./routes/userRoute")


app.use(express.json())
app.use(cors())
app.use("/users",userRouter)

app.get("/",(req,res)=>{
    res.send("Welcome to Home Page!")
})


app.listen(process.env.PORT || 5000, async()=>{

    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is listening on port ${process.env.PORT}`)
})