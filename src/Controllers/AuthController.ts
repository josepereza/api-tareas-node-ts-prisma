import { user } from "@prisma/client"
import { Request, Response } from "express"
import User from "../Models/User"
import UserService from "../Services/UserService"
import Middleware from "./Middleware"

export default class AuthController {
    static async login(req: Request, res: Response): Promise<Response>
    {
        try {
            const { email, password } = req.body as user

            const user = await UserService.login(email)
            if(!user) return res.status(404).json("User not found")

            if(!await User.comparePassword(password, user.password)) return res.status(404).json("User not found")

            const { token, token_expiration_date } = Middleware.createToken(user.id)

            user.token = token
            user.token_expiration_date = token_expiration_date

            await UserService.update(user)

            return res.status(200).json(token)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async register(req: Request, res: Response): Promise<Response>
    {
        try {
            const newUser = req.body as user

            const exists = await UserService.getByEmail(newUser.email)
            if(exists) return res.status(400).json("Email already exists")

            newUser.password = await User.hashPassword(newUser.password)
            const user = await UserService.create(newUser)

            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    static async logout(req: Request, res: Response): Promise<Response>
    {
        try {
            const user = await UserService.getByToken(Middleware.getToken(req))
            if(!user) return res.status(404).json("User not found")

            user.token = null
            user.token_expiration_date = null

            await UserService.update(user)

            return res.status(200).json("Logged out")
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}