const express = require('express')
const connectDb = require('./middlewares/db')
const cors = require('cors')
let PORT = 3001
const app = express()



const userRouter = require('./routes/useRoutes')
const productRouter = require('./routes/productRoute')
const sellerRouter = require('./routes/sellerRoute')
// const uploadRouter = require('./routes/uploadRoute');


app.use(cors({
    origin:"http://localhost:5173/",
    credentials:true
}))
// body percel middiware 
app.use(express.json())
connectDb()

app.get('/',(req,res)=>{
    res.send('this is the home');
})

//routes
// app.use("/upload", uploadRouter);
app.use("/user", userRouter);
app.use("/product", productRouter)
app.use('/seller', sellerRouter)
// app.use('/seller', sellerRouter)


app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})