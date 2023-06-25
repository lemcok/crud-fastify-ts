import prisma from "../../utils/prisma";
import { CreateProductInput } from "./products.schema";

export async function createProduct(product: CreateProductInput & {ownerId: number}) {
   return prisma.product.create({
      data: product,
   })
}

export async function getProducts() {
   return prisma.product.findMany({
      select: {
         id: true,
         title: true,
         content: true,
         price: true,
         owner: {
            select: { name: true, id: true }
         },
         createAt: true,
         updateAt: true,
      }
   })
}

export async function getOneProduct(id: number) {
   return await prisma.product.findUnique({
         where: {
            id: Number(id)
         },
         select: {
            id: true,
            title: true,
            content: true,
            price: true,
            owner: {
               select: { name: true, id: true }
            },
            createAt: true,
            updateAt: true,
         }
      },)
   }

export async function searchProductByName(searchTerm: string) {
   return await prisma.product.findMany({
      where: {
         title: {
            contains: searchTerm
         }
      },
      select: {
         id: true,
         title: true,
         content: true,
         createAt: true,
         updateAt: true
      }
   })
}  
