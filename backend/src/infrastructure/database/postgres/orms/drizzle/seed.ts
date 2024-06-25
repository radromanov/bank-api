import { InferInsertModel } from "drizzle-orm";
import { usersTable } from "./schema";
import { v7 as uuidv7 } from "uuid";
import { createUserAvatar } from "@shared/utils/create-user-avatar";
import { Postgres } from "../../postgres";
import { PostgresConfig } from "@config/postgres.config";
import { DrizzleClient } from "./drizzle-client";
import { DatabaseClient } from "@infrastructure/database/database-client";

async function createUsers(db: DatabaseClient) {
  await db.dropTable(usersTable);

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

  await db.create(users, usersTable);
}

async function seed() {
  const sql = new Postgres(PostgresConfig).sql;
  const db = new DrizzleClient(sql);

  await createUsers(db);
}

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
