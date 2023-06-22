import { v4 } from "uuid";
import { createProfileSchema, getProfileSchema } from "../helpers/schemas";
import dbPool from "../db/index";
import { NextFunction, Request, Response } from "express";

interface User {
  id: string;
  name: string;
  email: string;
  hobby: string;
}

class ProfileRepository {
  pool = dbPool.getPool();

  async getAllProfiles() {
    return this.pool.query("SELECT * from profile");
  }

  async getProfileById(userId: string) {
    return this.pool.query("SELECT * from profile where uuid = $1", [userId]);
  }

  async createProfile(user: User) {
    return this.pool.query(
      "INSERT INTO profile (uuid, username, email, hobby, created_on) VALUES ($1, $2, $3, $4, NOW())",
      [user.id, user.name, user.email, user.hobby]
    );
  }
}

const profileRepository = new ProfileRepository();

export default class ProfileController {
  static async getProfiles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await profileRepository.getAllProfiles();
      res.json(result.rows);
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
      const result = await profileRepository.getProfileById(userId);
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

      const user: User = { id: v4(), name, email, hobby };
      await profileRepository.createProfile(user);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
