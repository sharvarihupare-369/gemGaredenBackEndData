const express = require("express")
const connection = require("./db")
const app = express()
require("dotenv").config()
const cors = require("cors")
const userRouter = require("./routes/userRoute")
const cartRouter = require("./routes/cartRoute")
const paymentRouter = require("./routes/paymentRoute")


app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/cart",cartRouter) 
app.use("/pay",paymentRouter) 

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