import { task } from "@prisma/client";
import prisma from "../Utils/database";

export default class TaskService {
    static async getAll(user_id: number)
    {
        return prisma.task.findMany({ where: { user_id } })
    }

    static async getById(id: number)
    {
        return prisma.task.findFirst({ where: { id } })
    }

    static async create(Task: task)
    {
        return prisma.task.create({ data: Task })
    }

    static async update(Task: task)
    {
        return prisma.task.update({ where: { id: Task.id }, data: Task })
    }

    static async delete(id: number)
    {
        return prisma.task.delete({ where: { id } })
    }
}