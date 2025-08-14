import { randomUUID } from "node:crypto"

import request from "supertest"
import { expect, test } from "vitest"

import { server } from "../app.ts"
import { makeCourse } from "../test/factories/make-course.ts"

test("get courses", async () => {
  await server.ready()

  const titleId = randomUUID()

  await makeCourse(titleId)
  const response = await request(server.server).get(
    `/courses?search=${titleId}`,
  )

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    courses: [
      {
        id: expect.any(String),
        title: titleId,
        enrollments: 0,
      },
    ],
    total: 1,
  })
})
