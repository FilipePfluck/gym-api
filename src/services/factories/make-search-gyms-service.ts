import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'
import { SearchGyms } from '../search-gyms'

export function makeSearchGyms() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new SearchGyms(gymsRepository)

  return service
}
