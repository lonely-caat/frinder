import express, { NextFunction, Request, Response } from "express";
import ProfileController from "../controllers/profileController";

const router = express.Router();

router.get("/", ProfileController.getProfiles);
router.get("/:id", ProfileController.getProfile);
router.post("/", ProfileController.createProfile);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An uncaught error occurred' });
});

export default router;
