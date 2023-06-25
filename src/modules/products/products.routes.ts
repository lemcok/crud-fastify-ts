import { type FastifyInstance } from "fastify";
import { createProductHandler, getAllProductsHandler, getOneProductHandler, searchProductByNameHandle } from "./products.controller";
import { $ref } from "./products.schema";

async function ProductRoutes(server: FastifyInstance) {

   server.post("/", {
      preHandler: [server.authenticate],
      schema: {
         body: $ref('createProductSchema'),
         response: {
            201: $ref('productResponseSchema')
         }
      }
   }, createProductHandler);

   server.get("/",{
      schema: {
         response: {
            200: $ref("productsResponseSchema")
         }
      }
   }, getAllProductsHandler)

   server.get("/:id",{
      schema: {
         response: {
            200: $ref("productResponseSchema")
         }
      }
   }, getOneProductHandler)

   server.get("/search", {}, searchProductByNameHandle)
   

}

export default ProductRoutes