import express from 'express';
import { isAuthenticated, isAuthorized } from '../middleware';
import ClientProfile, {ClientProfileInterface} from '../models/clientProfile.model';
import * as T from '../utilities/types';

const router = express.Router();

/*
    GET /api/client/profile
    Description: 
    Request body: no request body
    Response body: ClientProfile
*/
router.route('/profile').get(isAuthenticated, isAuthorized, async (req, res) => {

  const profile = await ClientProfile.findOne({ userId: req.session.data?.userId });

  if (profile === null) {
    res.status(404).send();
  } else {
    res.status(200).send(profile);
  }
});

/*
    POST /api/client/profile/create
    Description: 
    Request body: ClientProfile
    Response body: 
*/
router.route('/profile/create').post(isAuthenticated, isAuthorized, async (req, res) => {

  const profile: T.NewClientProfile = {...req.body, userId: req.session.data?.userId};
 
  try {
    const newProfile = new ClientProfile(profile);
    await newProfile.save();

    res.status(200).json({ message: 'Profile sucessfully created.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when creating the profile.'})
  }
});

/*
    PUT /api/client/profile/update
    Description: 
    Request body: ClientProfile
    Response body: 
*/
router.route('/profile/update').put(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    await ClientProfile.findOneAndUpdate({ userId: req.session.data?.userId }, req.body);

    res.status(200).json({ message: 'Profile sucessfully updated.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when updating the profile.'})
  }
});

/*
    DELETE /api/client/profile/delete
    Description: 
    Request body: 
    Response body: 
*/
router.route('/profile/delete').delete(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    await ClientProfile.findOneAndDelete({ userId: req.session.data?.userId });
    
    res.status(200).json({ message: 'Profile sucessfully deleted.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when deleting the profile.'})
  }
});

export default router;