import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt, { type JWT } from '@fastify/jwt'
import {fastifySwagger} from "@fastify/swagger"
import { withRefResolver } from "fastify-zod";
import swaggerUI from "@fastify/swagger-ui"

import userRoutes from "./modules/users/users.routes";
import { userSchemas } from "./modules/users/users.schema";
import { productSchemas } from "./modules/products/products.schema";
import ProductRoutes from "./modules/products/products.routes";
import { version as myapiversion } from "../package.json";
import VentasRoutes from "./modules/ventas/ventas.routes";
import cors from '@fastify/cors'

export const server = Fastify()

server.register(cors)

//aumentar una propiedad al Type FastifyInstance q viene ya en el modulo instaldo de "fastify"
declare module "fastify" {
   interface FastifyRequest {
      jwt: JWT
   }
   export interface FastifyInstance{
      authenticate: any
   }
}

declare module "@fastify/jwt" {
   export interface FastifyJWT {
      user: {
         id: number,
         title: string,
         name: string
      }
   }
}

server.register(fjwt, {
   secret: 'aksdashdoasasd'
})

server.decorate("authenticate",async (request: FastifyRequest, reply: FastifyReply) => {
   try {
      await request.jwtVerify();
   } catch (error) {
      return reply.send(error)
   }
})

//:::get all schemas
userSchemas.forEach( schema => server.addSchema(schema) );
productSchemas.forEach( schema => server.addSchema(schema));
// for( const schema of [...userSchemas, ...productSchemas] ){ //otra forma
//    server.addSchema(schema)
// }

//:::Register Swagger
server.register( fastifySwagger, withRefResolver({
   exposeRoute: true,
   openapi: {
      info: {
         title: 'api fastify',
         description: 'lorem lorem',
         version: myapiversion
      },
   },
}))
server.register(swaggerUI,{
   routePrefix: '/docs',
   uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
})

//:::Register Routes
server.get("/", async () => ({message: "welcome to my api"}))
server.register( userRoutes, {prefix: "/users"});
server.register( ProductRoutes, {prefix: "/products"});
server.register(VentasRoutes, {prefix: '/ventas'})


server.listen({port: 7000}, async(err) => {
   if(err){
      server.log.error(err);
      console.log( err );
      process.exit(1)
   }
   console.log(`Server running on http://localhost:7000`)
}); 
  