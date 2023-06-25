import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductInput } from "./products.schema";
import { createProduct, getOneProduct, getProducts, searchProductByName } from "./products.service";

export async function createProductHandler(
   request: FastifyRequest<{Body: CreateProductInput}> ,
   reply: FastifyReply
) {
   const productInput = request.body
   const product = await createProduct({
      ...productInput,
      ownerId: request.user.id
   });
   return product
}

export async function getAllProductsHandler(
   request: FastifyRequest ,
   reply: FastifyReply
) {
   const products = await getProducts()
   return products
}

export const getOneProductHandler = async(request: FastifyRequest<{Params: {id:number}}>, reply: FastifyReply) => {
   const {id} = request.params
   // console.log( id );
   const product = await getOneProduct(id)
   return product
}

export const searchProductByNameHandle = async(
   request: FastifyRequest<{Querystring: {q:string}}>,
   reply: FastifyReply
) => {
   const searchTerm = request.query.q
   const result = await searchProductByName(searchTerm)
   reply.send(result)
}

