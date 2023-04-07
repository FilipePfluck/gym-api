import { FastifyInstance } from 'fastify'
import { profile, register } from '../controllers/users/user'
import { authenticate } from '../controllers/users/authenticate'
import { verifyJWT } from '../middlewares/verify-jwt'
import { refresh } from '../controllers/users/refresh'

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
