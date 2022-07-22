import { user } from "@prisma/client";
import prisma from "../Utils/database";

const select_user_data = {
    id: true,
    name: true,
    email: true,
    password: false,
    token: true,
    token_expiration_date: true,
    created_at: true,
    updated_at: true
} 

export default class UserService {
    static async getAll()
    {
        return prisma.user.findMany({ select: select_user_data })
    }

    static async getById(id: number)
    {
        return prisma.user.findFirst({ where: { id }, select: select_user_data })
    }

    static async getByEmail(email: string)
    {
        return prisma.user.findFirst({ where: { email }, select: select_user_data })
    }

    static async getByToken(token: string)
    {
        return prisma.user.findFirst({ where: { token }, select: select_user_data })
    }

    static async login(email: string)
    {
        return prisma.user.findFirst({ where: { email }, select: { ...select_user_data, password: true } })
    }

    static async create(User: user)
    {
        return prisma.user.create({ data: User, select: select_user_data })
    }

    static async update(User: user)
    {
        return prisma.user.update({ where: { id: User.id }, data: User, select: select_user_data })
    }

    static async delete(id: number)
    {
        return prisma.user.delete({ where: { id }, select: select_user_data })
    }
}