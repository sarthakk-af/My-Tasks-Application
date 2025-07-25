import { Request, Response } from 'express';
import { Task } from '../models/TaskSchema';


//to see all tasks
export const getTasks = async (req: Request, res: Response): Promise<any> => {
    try {

        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);

    } catch (error) {
        console.error('Error in getTasks');
        return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
}

//to create new tasks
export const createTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const { title, priority } = req.body;

        if (!title || !priority) {
            return res.status(400).json({ error: 'Title and priority are required.' });
        }
        const newTask = new Task({ title, priority });
        await newTask.save();
        res.status(201).json(newTask);

    } catch (error) {
        console.error("Error in createTask");
        return res.status(400).json({ error: 'Failed to create tasks' })
    }
}

//to update existing tasks
export const updateTask = async (req: Request, res: Response): Promise<any> => {
    try {

        const { title, completed, priority } = req.body
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, completed, priority },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);

    } catch (error) {
        console.error('Error in updateTask');
        return res.status(400).json({ error: 'Failed to update tasks' });
    }
}

//to delete tasks
export const deleteTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted succesfully' });

    } catch {
        console.error('Error in deleteTask');
        return res.status(500).json({ error: 'Failed to delete task' });
    }
};

//to toggle between complete and incomplete tasks
export const toggleComplete = async (req: Request, res: Response): Promise<any> => {
    try {

        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        task.completed = !task.completed;
        await task.save();
        res.json(task);
    } catch (error) {
        console.error('Error in toggleComplete')
        return res.status(500).json({ error: 'Failed to update complete/incomplete task.' });
    }
}