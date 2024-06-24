import { config } from "dotenv";
import path from "path";

const envPath = path.resolve(
  process.env.NODE_ENV === "testing" ? ".env.test" : ".env",
);

config({ path: envPath });
