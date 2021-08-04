const express = require("express");
const morgon = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanatize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(mongoSanatize());
app.use(xss());
// app.use(
//   hpp({
//     whitelist: [
//       "duration",
//       "ratingsQuantity",
//       "ratingsAverage",
//       "maxGroupSize",
//       "difficulty",
//       "price",
//     ],
//   })
// );

app.use(morgon("dev"));

app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: "Too Many requests from your IP, Please try again in 1 hour",
});
app.use("/api", limiter);

// const tourRouter = require("./routes/tourRoutes");
const adminRoutes = require("./routes/admin/authRoutes");
const userRoutes = require("./routes/authRoutes");
const catagoryRoutes = require("./routes/catagory");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialRoutes = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/pageRoutes")
const addressRoutes = require("./routes/address"); 
const orderRoutes = require("./routes/order"); 
const adminOrderRoutes = require("./routes/admin/order.admin")
const searchRoute = require("./routes/search")




//static path for images
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api", adminRoutes);
app.use("/api", userRoutes); 
app.use("/api", catagoryRoutes);
app.use("/api", productRoutes);   
app.use("/api", cartRoutes);
app.use("/api", initialRoutes);  
app.use("/api", pageRoutes);  
app.use("/api", addressRoutes); 
app.use("/api", orderRoutes); 
app.use("/api", adminOrderRoutes);    
app.use("/api",searchRoute)
 
 
 



app.all("*", (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on this server`);
  (err.status = "fail"), (err.statusCode = 404);

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

//......... exporting app to be get imported in server.js file
module.exports = app;
