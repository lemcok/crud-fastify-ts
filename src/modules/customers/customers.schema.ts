import { buildJsonSchemas } from 'fastify-zod'
import {z} from 'zod'

//::CUSTOMER SCHEMAS

const customers = {
   name: z.string(),
   email: z.string().optional(),
   dni: z.string().optional(),
   ruc: z.string().optional(),
   state: z.string()
}
