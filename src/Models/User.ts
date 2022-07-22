import { compare, hash } from 'bcrypt'

export default class User {
    static async hashPassword(password: string): Promise<string>
    {
        return hash(password, 10)
    }

    static async comparePassword(password: string, hash: string): Promise<boolean>
    {
        return await compare(password, hash)
    }
}