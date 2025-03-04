import path from "path";

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(process.cwd(), "db.sqlite"),
  },
  useNullAsDefault: true,
  migration: {
    directory: "src/db/migrations"
  }
}