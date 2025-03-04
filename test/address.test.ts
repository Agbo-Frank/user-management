import request from "supertest";
import { faker } from '@faker-js/faker';
import app from "../src/app";
import knex from "../src/db";

afterAll(async () => {
  await knex.destroy();
});

describe("Address API Tests ", () => {
  let user_id = 1;
  const path = "/api/addresses"

  it("should create a new user address", async () => {
    const response = await request(app)
      .post(path)
      .send({
        user_id,
        street: faker.location.street(),
        city: faker.location.city(),
        country: faker.location.country(),
        state: faker.location.state()
      })

    expect(response.body.data).toHaveProperty("id");
    user_id = response.body.data.id;
  });

  it("should retrieve user's address", async () => {
    await request(app).get(`${path}/${user_id}`).expect(200);
  });

  it("should update a user’s details", async () => {
    const response = await request(app)
      .patch(`${path}/${user_id}`)
      .send({ city: faker.location.city() })

    expect(response.statusCode).toBe(200);
  });
});
