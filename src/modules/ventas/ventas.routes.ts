import { FastifyInstance } from "fastify";
import { createVenta, getVentas } from "./ventas.services";

async function VentasRoutes(server: FastifyInstance){
   server.get("/add", createVenta);
   server.get("/", getVentas)
}

export default VentasRoutes