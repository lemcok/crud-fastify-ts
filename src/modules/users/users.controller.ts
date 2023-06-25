import { FastifyReply, FastifyRequest } from "fastify";
import { verifyPassword } from "../../utils/hash";
import { CreateUserInput, LoginInput } from "./users.schema";
import { createUser, findUserByEmail, findUsers } from "./users.service";

export async function registerUserHandler(request: FastifyRequest<{Body: CreateUserInput}>, reply: FastifyReply){
   const body = request.body;
   try {
      const user = await createUser(body);
      return reply.code(201).send(user)
   }catch(error) {
      console.log( error );
      return reply.code(500).send(error)
   }
}

export async function loginHandler(request: FastifyRequest<{Body: LoginInput}>, reply: FastifyReply) {
   const { email, password } = request.body;

   //1.find user by email
   const user = await findUserByEmail(email);

   if(!user){
      return reply.code(401).send({ message: 'Invalid email or password' })
   }
   //2.verify password
   const correctPassword = verifyPassword({
      candidatePassword: password, //input password
      salt: user.salt,
      hash: user.password //password de la base de datos
   })
   if(correctPassword){
      const { password, salt, ...rest } = user;

      //3.generate access token
      // return { accessToken: server.jwt.sign(rest) } //aqui lo generamos
      return { accessToken: request.jwt.sign(rest) } //aqui lo generamos
   }

   //4.respond
   return reply.code(401).send({
      message: 'Invalid email or password'
   })
}

export const getAllUsersHandler = async (request: FastifyRequest, reply: FastifyReply) => {
   const users = await findUsers();
   return users;
}
