const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const cors = require('cors');

const app = express();
app.use(cors());
dotenv.config();
const port = 8080;

connectDB();

app.use(express.json());

app.use('/', userRoutes);
app.use('/', adminRoutes);


app.get('/', (req, res) => {
    res.send("hi");
});

app.listen(port, () => {
    console.log("Port is listening on", port);
});
