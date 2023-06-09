import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

class DbPool {
  private static instance: DbPool;
  private pool: Pool;

  constructor() {
    if (!DbPool.instance) {
      const user = process.env.DB_USER;
      const host = process.env.DB_HOST;
      const database = process.env.DB_NAME;

      this.pool = new Pool({ user, host, database });
      DbPool.instance = this;
    }

    return DbPool.instance;
  }

  getPool() {
    return this.pool;
  }
}

const dbPoolInstance = new DbPool();
Object.freeze(dbPoolInstance);

export default dbPoolInstance;
