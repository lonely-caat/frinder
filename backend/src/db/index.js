// import pg from "pg";
// import * as dotenv from "dotenv";
//
// dotenv.config({ path: "../../../.env" });
//
// const { Pool } = pg;
//
// // console.log(process.env);
// const db_user = process.env.DB_USER;
// const host = process.env.DB_HOST;
// const database = process.env.DB_NAME;
// // console.log(db_user, host, database, "!!!!!");
// const pool = new Pool({ db_user, host, database });
//
// // pool.query("SELECT NOW()", (err, res) => {
// //   if (err) {
// //     return console.log(err);
// //   }
// //   console.log(err, res);
// //   pool.end();
// // });
//
// pool.query("SELECT * from profile", (err, res) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(err, res);
// });
//
// export default pool;
// dbPool.js
import pg from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../../.env" });

const { Pool } = pg;

class DbPool {
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
