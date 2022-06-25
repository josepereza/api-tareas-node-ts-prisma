import { Request, Response } from 'express'
import prisma from '../Utils/database'

import { ITask } from '../Models/Task'

const NOT_FOUND = "Task not found"

class TaskController {
    static async getAll(req: Request, res: Response): Promise<Response>
    {
        try {
            const tasks = await prisma.task.findMany()
            if(!tasks) return res.status(404).json(NOT_FOUND)
            return res.json(tasks)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async getById(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = parseInt(req.params.id)
            const task = await prisma.task.findMany({ where: {id} })
            if(!task) return res.status(404).json(NOT_FOUND)
            return res.json(task[0])
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async create(req: Request, res: Response): Promise<Response>
    {
        try {
            const task = await prisma.task.create({ data: {...req.body} })
            return res.json(task)
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    static async update(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = parseInt(req.params.id)
            const task = await prisma.task.update({ where: {id}, data: {...req.body} })
            if(!task) return res.status(404).json(NOT_FOUND)
            return res.json(task)
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    static async delete(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = parseInt(req.params.id)
            const task = await prisma.task.delete({ where: {id} })
            if(!task) return res.status(404).json(NOT_FOUND)
            return res.json("Deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default TaskController