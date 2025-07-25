import express , {Request , Response} from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import TasksRoutes from './routes/TaskRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/',(req:Request , res:Response)=>{
     res.send('My Tasks API is working with typescript');
});

app.use('/tasks', TasksRoutes);


mongoose
.connect(process.env.MONGO_URL as string)
.then(()=>
{
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>{
        console.log(`Server is running at http://localhost:${PORT}`);
    });
})
.catch((error)=>{
    console.error('MongoDB connection error',error);
});