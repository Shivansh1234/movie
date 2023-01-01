const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT || 8000;

// Mongodb connection
connectDB();

// cors middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// nested routes
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);

// custom middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Example app listening on PORT - ${PORT}`);
});
