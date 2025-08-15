import request from "supertest"
import { expect, test } from "vitest"

import { server } from "../app.ts"
import { makeCourse } from "../test/factories/make-course.ts"
import { makeAuthenticatedUser } from "../test/factories/make-user.ts"

test("get course by id", async () => {
  await server.ready()

  const { token } = await makeAuthenticatedUser("student")

  const course = await makeCourse()
  const response = await request(server.server)
    .get(`/courses/${course.id}`)
    .set("Authorization", token)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  })
})

test("return 404 for non existing course", async () => {
  await server.ready()

  const { token } = await makeAuthenticatedUser("student")

  const response = await request(server.server)
    .get(`/courses/b0cc9192-d29a-4895-9e53-5c5969b8f5c5`)
    .set("Authorization", token)

  expect(response.status).toEqual(404)
})
