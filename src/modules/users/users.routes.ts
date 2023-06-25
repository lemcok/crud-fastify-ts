import { FastifyInstance } from "fastify";
import {getAllUsersHandler, loginHandler, registerUserHandler} from "./users.controller";
import { $ref } from "./users.schema";


async function userRoutes( server: FastifyInstance ){
   server.post("/",{
      schema: {
         body: $ref("createUserSchema"),
         response: {//es importante poner el status code bien, igual como esta en el controller
            201: $ref("createUserResponseSchema")
         }
      }
   } ,registerUserHandler);

   server.post("/login",{schema: {
      body: $ref('loginSchema'),
      response: {
         200: $ref('loginResponseSchema')
      }
   }}, loginHandler )

   server.get("/",{ 
      preHandler: [server.authenticate]
    }, getAllUsersHandler)
}

export default userRoutes

