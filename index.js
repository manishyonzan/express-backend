const express = require("express");

const app = express();
const loginRouter = require("./routes/login");
const orderRouter = require("./routes/order");
const productRouter = require('./routes/product');
const reviewRouter = require("./routes/review");
const couponRouter = require("./routes/coupon");
const AppError = require("./utils/appError");
const cron = require('node-cron');
const { resetRateLimits } = require("./middleware/rateLimitter");

// Middleware to parse URL-encoded bodies
// app.use(express.urlencoded({ extended: true }));


app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        message: "hello world",
    });
});
app.use("/auth", loginRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/review", reviewRouter);
app.use("coupon",couponRouter);

app.all("*", (req, res, next) => {
    const err = new AppError(`Requested URL ${req.path} not found`, 404);
    next(err);
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack
    })
})

// cron.schedule('*/1 * * * *',resetRateLimits);
cron.schedule('*/1 * * * *',()=>{
    console.log("running", new Date().getSeconds());
    resetRateLimits();
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`${PORT}`);
})

