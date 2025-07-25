import express from 'express';
import { getTasks, toggleComplete, updateTask, deleteTask, createTask } from '../controllers/TaskControllers';

const router = express.Router();

router.get('/allTasks', getTasks)
router.post('/createTask', createTask);
router.put('/toggle/:id', toggleComplete);
router.patch('/updateTask/:id', updateTask);
router.delete('/deleteTasks/:id', deleteTask);

export default router;
