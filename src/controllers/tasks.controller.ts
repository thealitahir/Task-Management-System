import { Request, Response, NextFunction } from 'express';
import { TaskDto } from '../dto/task.request.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import Task from '../models/tasks.model'


// make a controller for get all tasks
const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { skip, limit } = req['pagination'];
    const taskQuery = { ...req['taskQuery'] };

    if (req.query.userName && taskQuery.assignTo === '') {
      return res.status(200).json({
        status: true,
        message: "Get all tasks successfully.",
        data: [],
      });
    }
    const tasks = await Task.find(taskQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: true,
      message: "Get all tasks successfully.",
      data: tasks,
    });
  } catch (error: any) {
    res.status(422).json({ status: false, error: error.message });
  }
};

// make a controller for get a task
const getTask = async (req: Request, res: Response) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      res.status(403).json({ status: false, error: `No Task with id: ${taskId}` });
    } else {
      res.status(200).json({
        status: true,
        message: "Get a task successfully.",
        data: task,
      });
    }
  } catch (error: any) {
    res.status(422).json({ status: false, error: error.message });
  }
};

// make a controller for create a task
const createTask = async (req: any, res: Response) => {
  try {
    const newTask = plainToClass(TaskDto, req.body); // Convert request data to TaskDto instance
    const errors = await validate(newTask);

    if (errors.length > 0) {
      return res.status(422).json({ status: false, error: errors });
    }
    if(req.user) {
      Object.assign(newTask,{assignTo:req.user.userId})
    }
    const task = new Task({
      ...newTask
    });

    // Save the new Task instance to the database
    await task.save();
    return res.status(200).json({
      status: true,
      message: "Create a new task successfully.",
      data: task
    });
  } catch (error: any) {
    res.status(422).json({ status: false, error: error.message });
  }
};

// make a controller for update a task
const updateTask = async (req: Request, res: Response) => {
  try {
    const newTask = plainToClass(TaskDto, req.body); // Convert request data to TaskDto instance
    const errors = await validate(newTask);

    if (errors.length > 0) {
      return res.status(422).json({ status: false, error: errors });
    }

    const { id } = req.params;
    const taskPayload = {
      ...newTask
    };
    const task = await Task.findByIdAndUpdate({ _id: id }, taskPayload, { new: true, runValidators: true });

    if (!task) {
      res.status(403).json({ status: false, error: `No task with id: ${id}` });
    } else {
      res.status(200).json({
        status: true,
        message: `Task with id: ${id} updated successfully.`,
        data: task,
      });
    }
  } catch (error: any) {
    res.status(422).json({ status: false, error: error.message });
  }
};

// make a controller for delete a task
const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(403).json({ status: false, error: `No task with id: ${taskId}` });
    } else {
      res.status(200).json({
        status: true,
        message: `Task with id: ${taskId} deleted successfully.`,
        data: task,
      });
    }
  } catch (error: any) {
    res.status(422).json({ status: false, error: error.message });
  }
};

export { getAllTasks, getTask, createTask, updateTask, deleteTask }
