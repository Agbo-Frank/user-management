import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("addresses", function (table) {
    table.string("state").nullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("addresses", function (table) {
    table.dropColumn("state");
  });
}

