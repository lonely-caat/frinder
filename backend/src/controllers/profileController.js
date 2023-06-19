import { v4 } from "uuid";
import { createProfileSchema, getProfileSchema } from "../helpers/schemas.js";
import dbPool from "../db/index.js";

export default class ProfileController {
  static async getProfiles(req, res, next) {
    try {
      const pool = dbPool.getPool();
      const response = await pool.query("SELECT * from profile");
      res.json(response.rows);
    } catch (err) {
      next(err);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const userId = await getProfileSchema.validate(req.params.id);
      const pool = dbPool.getPool();
      const result = await pool.query("SELECT * from profile where uuid = $1", [
        userId,
      ]);
      res.json(result.rows);
    } catch (err) {
      next(err);
    }
  }

  static async createProfile(req, res, next) {
    try {
      const { name, email, hobby } = req.body;
      console.log(`${name},${email},${hobby}`);

      await createProfileSchema.validate({ name, email, hobby });

      const newUser = { id: v4(), name, email, hobby };
      const pool = dbPool.getPool();
      await pool.query(
        "INSERT INTO profile (uuid, username, email, hobby, created_on) VALUES ($1, $2, $3, $4, NOW())",
        [newUser.id, newUser.name, newUser.email, newUser.hobby]
      );
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
}
