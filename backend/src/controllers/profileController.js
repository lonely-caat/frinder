import uuidv4 from '../helpers/uuid.js';
import { createProfileSchema, getProfileSchema } from '../helpers/schemas.js';


export default class ProfileController {
    static profiles = []; // TODO: replace with database

    static getProfiles(req, res) {
        res.json(ProfileController.profiles);
    }


    static getProfile(req, res) {
        try {getProfileSchema.isValid(req.params.id).then((isValid) => console.log(`is the profile valid? ${isValid}`));

            getProfileSchema.validateSync(req.params.id);

            const userId = req.params.id;
            const user = ProfileController.profiles.find(user => user.id === userId);

            if (user) {
                const response = {
                    name: user.name,
                    email: user.email,
                    hobby: user.hobby
                };
                res.json(response);
            } else {
                res.status(404).json({ message: `User with id = ${userId} not found :(` });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static createProfile(req, res) {
        const { name, email, hobby } = req.body;
        console.log(`${name},${email},${hobby}`)
        try { createProfileSchema.validateSync({ name, email, hobby })
            const newUser = { id: uuidv4(), name, email, hobby };
            ProfileController.profiles.push(newUser);
            res.status(201).json(newUser);
        }  catch (error) {
        // is it ok to send 400 for all validation cases? how else can we pass correct status  code?
        res.status(400).json({ message: error.message });
    }
    }
}
