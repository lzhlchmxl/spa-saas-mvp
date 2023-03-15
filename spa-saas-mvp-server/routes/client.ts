import express from 'express';
import { isAuthenticated } from '../middleware';
import ClientProfile, {ClientProfileInterface} from '../models/clientProfile.model';
import * as T from '../utilities/types';

const router = express.Router();

/*
    GET /api/client/profile
    Description: 
    Request body: no request body
    Response body: ClientProfile
*/
router.route('/profile').get(isAuthenticated, async (req, res) => {

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
    Response body: ClientProfileId
*/
router.route('/profile/create').post(isAuthenticated, async (req, res) => {

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

export default router;