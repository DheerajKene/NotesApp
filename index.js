const express = require('express')
require("dotenv").config()
const connection = require("./config/db");
const UserRouter = require('./route/user.route');
// const cors = require('cors')
const NoteRouter = require('./route/note.route');
const auth = require('./middleware/auth.middleware')


const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use("/user", UserRouter);
app.use('/note', auth, NoteRouter)
// app.use(cors());


app.get('/', (req, res)=>{
    res.send("welcome to the home page...");
});

app.get('/about', (req, res)=>{
    res.send("welcome to the about page...");
});


app.listen(PORT, async ()=>{
    try {
        await connection;
        console.log(`Server is running on port ${PORT} and the DB is also connected Successfully`);
    } catch (error) {
        console.log(`Error found ${error}`);
    }
});