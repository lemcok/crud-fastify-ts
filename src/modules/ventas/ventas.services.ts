import prisma from "../../utils/prisma"
import { CreateVentaInput } from "./ventas.schema"

//el schema q esperamos
const inputsVenta = {
   tipopago: '',
   state: '',
   products: [
      {
         productId: 1,
         qty: 3
      },
      {
         productId: 1,
         qty: 1
      },
   ]
}

export const createVenta = async(venta: CreateVentaInput) => {
   const {tipoPago, state, products} = venta
   return await prisma.venta.create({
      data: {
         tipoPago: tipoPago,
         state: state,
         products: {
            createMany: {
               data: products
            }
         }
      }
   })
}

// export const getVentas = async(limit = 200) => {
//    return await prisma.productOnVenta.findMany({
//       select: {
//          venta: {
//             select: {
//                id: true,
//                tipoPago: true,
//                products:{
//                   select: {
//                      product: {
//                         select: {
//                            id: true,
//                            title: true,
//                            price: true,
//                         }
//                      },
//                      qty: true
//                   }
//                },
//                state: true,
//                createdAt:true,
//                updatedAt: true,
//             }
//          }
//       }
//    })
// }
export const getVentas = async() => {
   return await prisma.venta.findMany({
      select: {
         id: true,
         tipoPago: true,
         products:{
            select: {
               product: {
                  select: {
                     id: true,
                     title: true,
                     price: true,
                  }
               },
               qty: true
            }
         },
         state: true,
         createdAt:true,
         updatedAt: true,
      },
   })
}
