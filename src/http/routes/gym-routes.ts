import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares/verify-jwt'
import { NearbyGym, createGym, searchGym } from '../controllers/gyms/gym'
import { onlyAdmin } from '../middlewares/only-admin'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', searchGym)
  app.get('/gyms/nearby', NearbyGym)

  app.post('/gyms', { onRequest: [onlyAdmin] }, createGym)
}
