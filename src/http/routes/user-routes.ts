import { FastifyInstance } from 'fastify'
import { profile, register } from '../controllers/users/user'
import { authenticate } from '../controllers/users/authenticate'
import { verifyJWT } from '../middlewares/verify-jwt'

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
