const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/errorHandling');
const { redirectOriginalUrl } = require('./controllers/shortenerControllers');
require('dotenv').config();
const app = express();
const connectdb = require('./config/dbConnection');
connectdb();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/shortner", require("./routes/shortenerRoutes"));
app.get("/:shortCode", redirectOriginalUrl);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});