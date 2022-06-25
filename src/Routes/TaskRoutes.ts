import { Router } from 'express'
const TaskRoutes = Router()

import TaskController from '../Controllers/TaskController'

TaskRoutes.get('/', TaskController.getAll)
TaskRoutes.get('/:id', TaskController.getById)
TaskRoutes.post('/', TaskController.create)
TaskRoutes.put('/:id', TaskController.update)
TaskRoutes.delete('/:id', TaskController.delete)

export default TaskRoutes