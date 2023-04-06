import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymService } from './create-gym'

let usersRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Gym service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(usersRepository)
  })

  it('should be able to register a gym', async () => {
    const { gym } = await sut.execute({
      description: '',
      latitude: 0,
      longitude: 0,
      name: 'Gym 01',
      phone: '',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
