import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins-repository'
import { CheckinHistoryService } from '../check-in-history'

export function makeCheckinHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new CheckinHistoryService(checkInsRepository)

  return service
}
