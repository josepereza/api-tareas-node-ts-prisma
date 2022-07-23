import express, { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import TaskRoutes from './Routes/TaskRoutes'
import AuthRoutes from './Routes/AuthRoutes'
import UserRoutes from './Routes/UserRoutes'

const app: Application = express()

const allow_origin = process.env.NODE_ENV === 'production'
    ? 'https://task-app-frontend-react.netlify.app'
    : 'http://127.0.0.1:5173'

export const CorsOptions = {
    origin: allow_origin,
    credentials: true,
    cors: true
}

app.use(cors(CorsOptions))
app.use(bodyParser.json())

app.use('/api/tasks', TaskRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/auth', AuthRoutes)

export default app