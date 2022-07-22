import { Router } from 'express'
import Middleware from '../Controllers/Middleware'
const TaskRoutes = Router()

import TaskController from '../Controllers/TaskController'

TaskRoutes.get('/', [Middleware.isValidToken], TaskController.getAll)
TaskRoutes.get('/:id', [Middleware.isValidToken], TaskController.getById)
TaskRoutes.post('/', [Middleware.isValidToken], TaskController.create)
TaskRoutes.put('/:id', [Middleware.isValidToken], TaskController.update)
TaskRoutes.delete('/:id', [Middleware.isValidToken], TaskController.delete)

export default TaskRoutes