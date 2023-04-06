import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'
import { CheckinService } from '../checkin'

export function makeCheckinService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const service = new CheckinService(checkInsRepository, gymsRepository)

  return service
}
