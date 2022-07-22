import { Router } from 'express'
const AuthRoutes = Router()

import AuthController from '../Controllers/AuthController'
import Middleware from '../Controllers/Middleware'

AuthRoutes.post('/login', AuthController.login)
AuthRoutes.post('/register', AuthController.register)
AuthRoutes.get('/logout', [Middleware.isValidToken], AuthController.logout)

export default AuthRoutes