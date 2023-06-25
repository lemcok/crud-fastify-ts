import { number, object, z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const productsSchema = {
   productId: z.number(),
   qty: z.number()
}

const ventaInput = {
   tipoPago: z.string(),
   state: z.string(),
   products: z.array(z.object({...productsSchema}))  
}

const createVentaSchema = z.object({
   ...ventaInput
})

export type CreateVentaInput = z.infer<typeof createVentaSchema>

export const {schemas: ventaSchemas, $ref} = buildJsonSchemas({
   createVentaSchema
},{$id: 'VentaSchema'})