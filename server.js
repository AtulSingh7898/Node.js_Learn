const express = require('express')
const connectDb = require('./middlewares/db')
let PORT = 3001
const app = express()


const userRouter = require('./routes/useRoutes')
const productRouter = require('./routes/productRoute')
const sellerRouter = require('./routes/sellerRoute')
// const uploadRouter = require('./routes/uploadRoute');

// body percel middiware 
app.use(express.json())
connectDb()

//routes
// app.use('/user', userRouter)
// app.use("/upload", uploadRouter);
app.use("/user", userRouter);
app.use("/product", productRouter)
app.use('/seller', sellerRouter)


app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})