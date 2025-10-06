const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
mongoose.pluralize(null); // Disable pluralization globally

const { notFound } = require('./middlewares/notFound');

const errorHandler = require('./middlewares/errorHandler.middleware.js');
const productCategoryRoutes = require('./routes/productCategories.routes');
const {UPLOADS_ROOT}=require("./middlewares/upload.js");
const productRoutes=require("./routes/product.routes.js");
const contactInfoRoutes=require("./routes/contactInfo.routes.js")
const teamMembersRoutes=require("./routes/teamMembers.routes.js");
const currenciesRoutes=require("./routes/currencies.routes.js");
const productUnitsRoutes=require("./routes/productUnits.routes.js");
const unitQunatitiesRoutes=require("./routes/unitQuantities.routes.js")
const blogsCategoryRoutes=require("./routes/blogsCategory.routes.js");
const blogsRoutes=require("./routes/blogs.routes.js")
const usersRoutes=require("./routes/users.routes.js");

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
// app.use(cors({
//   origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
//   credentials: true
// }));


app.use(cors({
  origin:[ 'https://www.euryfox.com','https://euryfox.com','https://admin.euryfox.com','https://www.admin.euryfox.com','http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
}));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));



app.use("/eury/fox/uploads", express.static(UPLOADS_ROOT, {
  setHeaders: (res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  }
}));


app.use(morgan('combined'));


app.use('/eury/fox/product-categories', productCategoryRoutes);
app.use("/eury/fox/products",productRoutes);
app.use("/eury/fox/contact-info",contactInfoRoutes)
app.use("/eury/fox/team-members",teamMembersRoutes)
app.use("/eury/fox/currencies",currenciesRoutes);
app.use("/eury/fox/product-units",productUnitsRoutes);
app.use("/eury/fox/unit-quantities",unitQunatitiesRoutes)
app.use("/eury/fox/blogs-category",blogsCategoryRoutes);
app.use("/eury/fox/blogs",blogsRoutes);
app.use("/eury/fox/users",usersRoutes);

app.use(notFound);

app.use(errorHandler);

module.exports = app;


