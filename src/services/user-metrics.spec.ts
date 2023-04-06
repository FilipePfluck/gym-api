import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { UserMetricsService } from '@/services/user-metrics'
import { expect, describe, it, beforeEach } from 'vitest'

let checkInRepository: InMemoryCheckInsRepository

let sut: UserMetricsService

describe('Check in history service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new UserMetricsService(checkInRepository)
  })

  it('should be able to get number of check-ins of a user', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { count } = await sut.execute({
      userId: 'user-01',
    })

    expect(count).toBe(2)
  })
})
