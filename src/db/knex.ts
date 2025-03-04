import path from "path";

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, "../../db.sqlite"),
  },
  useNullAsDefault: true,
  migration: {
    directory: "src/db/migrations"
  }
}