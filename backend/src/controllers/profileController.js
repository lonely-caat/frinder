export default class ProfileController {
    static profiles = []; // TODO: replace with database

    static getProfiles(req, res) {
        res.json(ProfileController.profiles);
    }

    static getProfile(req, res) {
        const userId = req.params.id;
        const user = ProfileController.profiles.find(user => user.id === userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: `User with id = ${userId} not found :(` });
        }
    }

    static createProfile(req, res) {
        const { name, email, hobby } = req.body;
        console.log(name+email+hobby+"!!!!!")
        if (!name || !email || !hobby){
            res.status(400).json({ message: 'Name, email, hobby are all required' });
            return;
        }

        const newUser = { id: Date.now().toString(), name, email, hobby };
        ProfileController.profiles.push(newUser);
        res.status(201).json(newUser);
    }
}
