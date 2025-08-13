import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client.ts"
import { courses } from "../database/schema.ts"
import z from "zod"

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get("/courses", {
    schema: {
      tags: ["courses"],
      summary: "Get courses",
      response: {
        200: z.object({
          courses: z.array(
            z.object({
              id: z.uuid(),
              title: z.string()
            })
          )
        })
      }
    }
  }, async () => {
    const result = await db.select({
      id: courses.id,
      title: courses.title,
    }).from(courses)

    return { courses: result }
  })
}