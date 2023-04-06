import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeRegisterService } from '@/services/factories/make-register-service'
import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerService = makeRegisterService()

    await registerService.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user

  const getUserProfile = makeGetUserProfileService()

  const { user } = await getUserProfile.execute({
    userId: sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: null,
    },
  })
}
