import request from "supertest"
import { expect, test } from "vitest"

import { server } from "../app.ts"
import { makeUser } from "../test/factories/make-user.ts"

test("login", async () => {
  await server.ready()

  const { passwordBeforeHash, user } = await makeUser()

  const response = await request(server.server).post("/sessions").send({
    email: user.email,
    password: passwordBeforeHash,
  })

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    token: expect.any(String),
  })
})

test("login with wrong e-mail", async () => {
  await server.ready()

  const { passwordBeforeHash } = await makeUser()

  const response = await request(server.server).post("/sessions").send({
    email: "user.email@email.com",
    password: passwordBeforeHash,
  })

  expect(response.status).toEqual(400)
  expect(response.body).toEqual({
    message: "Credenciais inválidas",
  })
})

test("login with wrong password", async () => {
  await server.ready()

  const { user } = await makeUser()

  const response = await request(server.server).post("/sessions").send({
    email: user.email,
    password: "123456",
  })

  expect(response.status).toEqual(400)
  expect(response.body).toEqual({
    message: "Credenciais inválidas",
  })
})
