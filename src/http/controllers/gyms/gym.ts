import { makeCreateGymService } from '@/services/factories/make-create-gym-service'
import { makeSearchGyms } from '@/services/factories/make-search-gyms-service'
import { makeFetchNearbyGymsService } from '@/services/factories/make-search-nearby-gyms-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createGym(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { description, latitude, longitude, name, phone } =
    createGymBodySchema.parse(request.body)

  const createGymService = makeCreateGymService()

  await createGymService.execute({
    description,
    latitude,
    longitude,
    name,
    phone,
  })

  return reply.status(201).send()
}

export async function searchGym(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQueryParams = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { page, q } = searchGymsQueryParams.parse(request.query)

  const searchGymService = makeSearchGyms()

  const { gyms } = await searchGymService.execute({
    page,
    query: q,
  })

  return reply.status(200).send({
    gyms,
  })
}

export async function NearbyGym(request: FastifyRequest, reply: FastifyReply) {
  const NearbyGymsQueryParams = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = NearbyGymsQueryParams.parse(request.query)

  const NearbyGymService = makeFetchNearbyGymsService()

  const { gyms } = await NearbyGymService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
