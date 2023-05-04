const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./mongodb/connect.js');
const userRoutes = require('./routes/userRoutes.js');
const movieRoutes = require('./routes/movieRoutes.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/movie', movieRoutes);

app.get('/', async (req, res) => {
    res.send('Test!');
})

const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port 8080'));
    } catch (error) {
        console.log(error);
    }

}

startServer();