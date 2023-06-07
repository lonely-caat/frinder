import { uuid } from "uuidv4";
import { createProfileSchema, getProfileSchema } from "../helpers/schemas.js";

export default class ProfileController {
  static profiles = []; // TODO: replace with database

  static getProfiles(req, res) {
    res.json(ProfileController.profiles);
  }

  static getProfile(req, res) {
    getProfileSchema
      .validate(req.params.id)
      .then((validId) => {
        const userId = validId;
        const user = ProfileController.profiles.find(
          (user) => user.id === userId
        );

        if (!user) {
          res
            .status(404)
            .json({ message: `User with id = ${userId} not found :(` });
        }
        
        const response = {
          name: user.name,
          email: user.email,
          hobby: user.hobby,
        };
        res.json(response);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  }

  static createProfile(req, res) {
    const { name, email, hobby } = req.body;
    console.log(`${name},${email},${hobby}`);

    createProfileSchema
      .validate({ name, email, hobby })
      .then(() => {
        const newUser = { id: uuid(), name, email, hobby };
        ProfileController.profiles.push(newUser);
        res.status(201).json(newUser);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  }
}
