const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user.route');
const adminRoutes = require('./routes/admin/user.route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/auth', userRoutes);
app.use('/auth', adminRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the rest api!');
});

module.exports = app;