const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Service Desk System",
  });
});

// Routes
app.use("/api/users", require("./routes/userRoute"));

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is now running on ${PORT}`));
