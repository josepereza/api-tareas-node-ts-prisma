import { NextFunction, Request, Response } from "express";
import { sign, verify } from 'jsonwebtoken'

import UserService from "../Services/UserService";

export default class Middleware {
    static getToken(req: Request): string
    {
        const token = req.headers.authorization
        if(!token || !token.toLowerCase().startsWith("bearer ")) return ""

        return token.split(" ")[1]
    }

    static createToken(id: number)
    {
        const token = sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "1d" })
        const token_expiration_date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        return { token, token_expiration_date }
    }

    static async isValidToken(req: Request, res: Response, next: NextFunction)
    {
        try {
            const token = Middleware.getToken(req)
            // if(!verify(token, process.env.JWT_SECRET as string)) return res.status(401).json("Unauthorized")

            const user = await UserService.getByToken(token)
            if(!user) return res.status(401).json("Unauthorized")
            if(!user.token_expiration_date || user.token_expiration_date < new Date()) return res.status(401).json("Unauthorized")

            return next()
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)   
        }
    }

    static async getUserByToken(token: string)
    {
        const user = await UserService.getByToken(token)
        if(!user) return null
        
        return user
    }
}