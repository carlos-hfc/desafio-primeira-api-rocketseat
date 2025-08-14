import fastifySwagger from "@fastify/swagger"
import scalarApiReference from "@scalar/fastify-api-reference"
import fastify from "fastify"
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"

import { createCourseRoute } from "./src/routes/create-course.ts"
import { getCourseByIdRoute } from "./src/routes/get-course-by-id.ts"
import { getCoursesRoute } from "./src/routes/get-courses.ts"

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>()

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Desafio Node.js",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
})

server.register(scalarApiReference, {
  routePrefix: "/docs",
  configuration: {
    theme: "kepler",
  },
})

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(createCourseRoute)
server.register(getCoursesRoute)
server.register(getCourseByIdRoute)

server.listen({ port: 3333 }).then(() => console.log("HTTP server running!"))
