import { v4 } from "uuid";
import { createProfileSchema, getProfileSchema } from "../helpers/schemas";
import dbPool from "../db/index";
import { NextFunction, Request, Response } from "express";

interface NewUser {
  id: string;
  name: string;
  email: string;
  hobby: string;
}

export default class ProfileController {
  static async getProfiles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const pool = dbPool.getPool();
      const response = await pool.query("SELECT * from profile");
      res.json(response.rows);
    } catch (err) {
      next(err);
    }
  }

  static async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId: string = await getProfileSchema.validate(req.params.id);
      const pool = dbPool.getPool();
      const result = await pool.query("SELECT * from profile where uuid = $1", [
        userId,
      ]);
      res.json(result.rows);
    } catch (err) {
      next(err);
    }
  }

  static async createProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, hobby } = req.body;

      await createProfileSchema.validate({ name, email, hobby });

      const newUser: NewUser = { id: v4(), name, email, hobby };
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
