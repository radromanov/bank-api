import { v7 as uuidv7 } from "uuid";
import { InferInsertModel } from "drizzle-orm";
import { createUserAvatar } from "@shared/utils/create-user-avatar";
import { PostgresConfig } from "@config/postgres.config";
import { usersTable } from "./schema";
import { DrizzleClient, DrizzleSchema } from "./drizzle-client";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { Postgres } from "../../postgres";

async function createUsers(db: PostgresJsDatabase<DrizzleSchema>) {
  await db.delete(usersTable);

  const users: InferInsertModel<typeof usersTable>[] = [
    {
      id: uuidv7(),
      email: "rads@email.com",
      firstName: "Radostin",
      lastName: "Romanov",
      image: createUserAvatar("Radostin", "Romanov"),
      roles: ["ADMIN_ROLE", "BASIC_ROLE"],
    },
    {
      id: uuidv7(),
      email: "tim@email.com",
      firstName: "Tim",
      lastName: "Smith",
      image: createUserAvatar("Tim", "Smith"),
      roles: ["BASIC_ROLE"],
    },
    {
      id: uuidv7(),
      email: "emma@email.com",
      firstName: "Emma",
      lastName: "Sinclair",
      image: createUserAvatar("Emma", "Sinclair"),
      roles: ["BASIC_ROLE"],
    },
  ];

  await db.insert(usersTable).values(users);
}

async function seed() {
  const sql = new Postgres(PostgresConfig).sql;
  const db = new DrizzleClient(sql).client;

  await createUsers(db);
}

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
