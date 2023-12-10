const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/key").MONGODB_URI;
const passport = require("passport");
const users = require("./routes/api/user");
const helpRouter = require('./routes/api/help');
const search = require("./routes/api/search");
const payment = require("./routes/api/payment");
const cors = require("cors");
const savedVehiclesRoute = require('./routes/api/savedVehicles');
const profileRoute = require('./routes/api/profile')
const app = express();

// CORS Middleware
app.use(cors());

// Bodyparser Middlewares
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log(error));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

app.use("/api/search", search);

app.use("/api/payment", payment);
app.use("/api/help", helpRouter);
app.use('/api/savedVehicles', savedVehiclesRoute);
app.use('/api/profile', profileRoute);
// Server listening check
app.listen(process.env.PORT || 4000, () =>
  console.log(`Server running on port ${process.env.PORT}!!`)
);
