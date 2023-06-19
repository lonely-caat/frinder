import express from "express";
import ProfileController from "../controllers/profileController.js";

const router = express.Router();

router.get("/", ProfileController.getProfiles);
router.get("/:id", ProfileController.getProfile);
router.post("/", ProfileController.createProfile);

router.use((err, req, res, next) => {
  console.error(err.stack); // log the error stack trace to the console
  res.json({ message: err.message });
});

export default router;
