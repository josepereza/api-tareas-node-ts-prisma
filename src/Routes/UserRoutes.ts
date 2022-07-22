import { Router } from 'express'
import Middleware from '../Controllers/Middleware'
const UserRoutes = Router()

import UserController from '../Controllers/UserController'

// UserRoutes.get('/', [Middleware.isValidToken], UserController.getAll)
UserRoutes.get('/:id', [Middleware.isValidToken], UserController.getById)
UserRoutes.get('/data/me', [Middleware.isValidToken], UserController.getByToken)
UserRoutes.put('/:id', [Middleware.isValidToken], UserController.update)
UserRoutes.delete('/:id', [Middleware.isValidToken], UserController.delete)

export default UserRoutes