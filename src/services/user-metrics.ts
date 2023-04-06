import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface UserMetricsServiceRequest {
  userId: string
}

interface UserMetricsServiceResponse {
  count: number
}

export class UserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: UserMetricsServiceRequest): Promise<UserMetricsServiceResponse> {
    const count = await this.checkInsRepository.countByUserId(userId)

    return { count }
  }
}
