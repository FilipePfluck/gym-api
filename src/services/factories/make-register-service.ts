import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { RegisterService } from '../register'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterService(usersRepository)

  return registerUseCase
}
