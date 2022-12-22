import express from 'express';
import mongoose from 'mongoose';
import cardRoutes from './routes/cardRoutes.js';
import customerRoutes  from './routes/customerRoutes.js';
import dotenv from 'dotenv';


dotenv.config({path : './config.env'});
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended : true}))
mongoose.set('strictQuery', true)

mongoose.connect(process.env.DB_LINK, {useNewUrlParser : true})
.then(() => console.log(`MongoDB URI conected successfully ✔`))
.catch(err => console.log(err.message));

app.use('/', customerRoutes)
app.use('/customers/cards', cardRoutes)

app.listen(PORT, () => {
    console.log(`Server @ 🚀 http://localhost:${PORT}`)
})