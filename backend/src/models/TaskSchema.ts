import mongoose from 'mongoose';

export interface ITask extends mongoose.Document {
    title: String;
    completed: Boolean;
    priority: String;
}

const TaskSchema = new mongoose.Schema<ITask>(
    {
        title: { type: String, required: true, minlength: [1, 'Title must be at least 1 character long.!'] },
        completed: { type: Boolean, required: true, default: false },
        priority: { type: String, required: true }
    },
    { timestamps: true },

)

export const Task = mongoose.model<ITask>('Task', TaskSchema);
