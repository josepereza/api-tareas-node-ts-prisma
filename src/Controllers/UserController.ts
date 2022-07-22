import { user } from '@prisma/client'
import { Request, Response } from 'express'
import UserService from '../Services/UserService'
import Middleware from './Middleware'

const NOT_FOUND = "User not found"

class UserController {
    static async getAll(req: Request, res: Response): Promise<Response>
    {
        try {
            const users = await UserService.getAll()
            return res.status(200).json(users)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async getById(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = parseInt(req.params.id)
            const user = await UserService.getById(id)
            if(!user) return res.status(404).json(NOT_FOUND)
            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async getByToken(req: Request, res: Response): Promise<Response>
    {
        try {
            const token = Middleware.getToken(req)
            const user = await UserService.getByToken(token)
            if(!user) return res.status(404).json(NOT_FOUND)
            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async update(req: Request, res: Response): Promise<Response>
    {
        try {
            const id = parseInt(req.params.id)
            let updatedUser = req.body as user
            updatedUser.id = id
            const user = await UserService.update(updatedUser)
            if(!user) return res.status(404).json(NOT_FOUND)
            return res.status(200).json(user)
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
            const user = await UserService.getById(id)
            if(!user) return res.status(404).json(NOT_FOUND)
            await UserService.delete(user.id)
            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}

export default UserController