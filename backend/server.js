const express = require('express');
require('dotenv').config();
const app = express();
const connectdb = require('./config/dbConnection');
connectdb();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/shortner", require("./routes/shortenerRoutes"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});