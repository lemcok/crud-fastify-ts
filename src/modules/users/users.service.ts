import { hashPassword } from '../../utils/hash';
import prisma from '../../utils/prisma';
import { CreateUserInput } from './users.schema';

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);

  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash },
  });

  return user;
}

export async function findUserByEmail(input_email: string) {
  return prisma.user.findUnique({
    where: {
      email: input_email, // si el email de la db es igual al input del email
    },
  });
}

export const findUsers = async () => {
  return prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
};
