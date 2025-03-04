import request from "supertest";
import { faker } from '@faker-js/faker';
import app from "../src/app";
import knex from "../src/db";

let user_id = 1;

afterAll(async () => {
  await knex.destroy();
});

describe("User API Tests ", () => {
  const path = "/api/users"

  it("should create a new user", async () => {
    const response = await request(app)
      .post(path)
      .send({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email()
      });

    expect(response.statusCode).toBe(201)
    expect(response.body.data).toHaveProperty("id");
    user_id = response.body.data.id;
  });

  it("should retrieve all users", async () => {
    const response = await request(app).get(path);

    expect(response.statusCode).toBe(200)
  });

  it("should retrieve a user by ID", async () => {
    const response = await request(app).get(`${path}/${user_id}`).expect(200);

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toHaveProperty("id");
  });

  it("should retrieve a user count", async () => {
    const response = await request(app).get(`${path}/count`).expect(200);

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toHaveProperty("count");
  });

  it("should return 404 if user does not exist", async () => {
    await request(app).get(`${path}/0`).expect(404);
  });
});

