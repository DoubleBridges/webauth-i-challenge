import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import apiRouter from './routers/api-router'

const server = express()

server.use(express.json())

server.use(cors())
server.use(helmet())
server.use(morgan('dev'))

server.use('/api', apiRouter)

server.get('/', (req, res) => {
  res.end('Server is working')
})

export default server