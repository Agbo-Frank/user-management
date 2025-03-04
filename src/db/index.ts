import knex from "knex";
import config from "./knex"

const db = knex(config)

db.raw("SELECT 1")
  .then(() => {
    console.log("Database connected successfully ✅");
  })
  .catch((err) => {
    console.error("Database connection failed ❌", err);
  });

export default db