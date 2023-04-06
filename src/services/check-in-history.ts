import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface CheckinHistoryServiceRequest {
  userId: string
  page: number
}

interface CheckinHistoryServiceResponse {
  checkIns: CheckIn[]
}

export class CheckinHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: CheckinHistoryServiceRequest): Promise<CheckinHistoryServiceResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
