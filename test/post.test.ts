import request from "supertest";
import { faker } from '@faker-js/faker';
import app from "../src/app";
import knex from "../src/db";

afterAll(async () => {
  await knex.destroy();
});

describe("Posts API Tests ", () => {
  let user_id: number = 1;
  const path = "/api/posts"
  let post_id: number

  it("should create a new user", async () => {
    const response = await request(app)
      .post(path)
      .send({
        user_id,
        title: faker.lorem.words(3),
        body: faker.lorem.paragraph()
      })
      .expect(201);

    expect(response.body.data).toHaveProperty("id");
    post_id = response.body.data.id;
  });

  it("should retrieve all user's post", async () => {
    const response = await request(app).get(`${path}?user_id=${user_id}`);

    expect(response.statusCode).toBe(200);
  });

  it("should delete a user", async () => {
    await request(app).delete(`${path}/${post_id}`).expect(204);
  });
});
