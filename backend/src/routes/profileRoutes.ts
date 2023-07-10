import express, { NextFunction, Request, Response } from "express";
import ProfileController from "../controllers/profileController";

const router = express.Router();

const profileController = new ProfileController();

router.get("/", profileController.getProfiles);
router.get("/:id", profileController.getProfile);
router.post("/", profileController.createProfile);

router.use(function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

export default router;
