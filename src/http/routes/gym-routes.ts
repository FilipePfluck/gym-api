import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares/verify-jwt'
import { NearbyGym, createGym, searchGym } from '../controllers/gyms/gym'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', searchGym)
  app.get('/gyms/nearby', NearbyGym)

  app.post('/gyms', createGym)
}
