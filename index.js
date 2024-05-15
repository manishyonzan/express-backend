const express = require("express");

const app = express();
const loginRouter = require("./routes/login");
const AppError = require("./utils/appError");

// Middleware to parse URL-encoded bodies
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        message: "hello world",
    });
});
app.use("/test", loginRouter);


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


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`${PORT}`);
})

