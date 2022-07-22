import { task } from '@prisma/client'
import { Request, Response } from 'express'
import TaskService from '../Services/TaskService'
import Middleware from './Middleware'

const NOT_FOUND = "Task not found"

class TaskController {
    static async getAll(req: Request, res: Response): Promise<Response>
    {
        try {
            const user = await Middleware.getUserByToken(Middleware.getToken(req))
            if(!user) return res.status(404).json("User not found")
            const tasks = await TaskService.getAll(user.id)
            if(!tasks) return res.status(404).json(NOT_FOUND)
            return res.status(200).json(tasks)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async getById(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = parseInt(req.params.id)
            const task = await TaskService.getById(id)
            if(!task) return res.status(404).json(NOT_FOUND)
            return res.status(200).json(task)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async create(req: Request, res: Response): Promise<Response>
    {
        try {
            let task = req.body as task

            const user = await Middleware.getUserByToken(Middleware.getToken(req))
            if(!user) return res.status(404).json("User not found")

            task = { ...task, user_id: user.id }

            const newTask = await TaskService.create(task)
            return res.status(200).json(newTask)
        }
        catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async update(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = parseInt(req.params.id)
            let updatedTask = req.body as task
            updatedTask.id = id
            const task = await TaskService.update(updatedTask)
            if(!task) return res.status(404).json(NOT_FOUND)
            return res.status(200).json(task)
        }
        catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async delete(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = parseInt(req.params.id)
            const task = await TaskService.getById(id)
            if(!task) return res.status(404).json(NOT_FOUND)
            await TaskService.delete(task.id)
            return res.status(200).json(task)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}

export default TaskController