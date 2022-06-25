import express, { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import TaskRoutes from './Routes/TaskRoutes'

const app: Application = express()

export const CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    cors: true
}

app.use(cors(CorsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/tasks', TaskRoutes)

export default app