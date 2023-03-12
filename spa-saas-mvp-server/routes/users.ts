import express from 'express';
import User, { UserInterface } from '../models/user.model';

const router = express.Router();

// hostname/users/
router.route('/').get((_req, res) => {
  // mongoose method to get a list of all users in mongoDB
  User.find()
    .then(users => res.json(users)) // returning all users
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
  // [CAUTION] this might not be a great pattern, I feel I'm not typingscripting this correctly
  const user: UserInterface = req.body;
  const newUser = new User(user);
  newUser.save()
    .then( () => res.json('User added!'))
    .catch( err => res.status(400).json('Error ' + err));

})

export default router;