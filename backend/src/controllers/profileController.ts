import { v4 } from "uuid";
import { createProfileSchema, getProfileSchema } from "../helpers/schemas";
import { NextFunction, Request, Response } from "express";
import { User } from "../helpers/types";
import { ProfileRepository } from "../repositories/profileRepository";

export default class ProfileController {
  private readonly profileRepository: ProfileRepository;

  constructor() {
    this.profileRepository = new ProfileRepository();
  }

  getProfiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.profileRepository.getAllProfiles();
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId: string = await getProfileSchema.validate(req.params.id);
      const result = await this.profileRepository.getProfileById(userId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  createProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { username, email, hobby } = req.body;
    try {
      await createProfileSchema.validate({ username, email, hobby });
    } catch (validationError: any) {
      res.status(400).json({ message: validationError.message });
      return;
    }
    try {
      const user: User = { id: v4(), username, email, hobby };
      await this.profileRepository.createProfile(user);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Error creating profile" });
      next(error);
    }
  };
}
