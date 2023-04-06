import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'
import { FetchNearbyGymsService } from '../search-nearby-gyms'

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new FetchNearbyGymsService(gymsRepository)

  return service
}
