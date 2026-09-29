// create server
const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')

const app = express();
app.use(cookieParser()); // use as middleware for jwt
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/api/auth', authRoutes);

module.exports = app;