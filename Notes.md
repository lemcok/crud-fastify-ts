## dependencies
npm install @prisma/client fastify fastify-zod zod zod-to-json-schema @fastify/jwt @fastify/cors @fastify/swagger @fastify/swagger-ui
## devDependencies
npm install ts-node-dev typescript @types/node --dev
## Initialise prisma
npx prisma init --datasource-provider postgresql
## Migrate theschema
npx prisma migrate dev --name init


-D @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest