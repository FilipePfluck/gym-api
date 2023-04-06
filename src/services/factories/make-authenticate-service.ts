import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateService(usersRepository)

  return authenticateUseCase
}
