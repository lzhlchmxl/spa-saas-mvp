import express from 'express';
import { isAuthenticated, isAuthorized } from '../middleware';
import VendorProfile from '../models/vendorProfile.model';
import VendorService from '../models/vendorService.model';
import MySpa from '../models/mySpa.model';
import * as T from '../utilities/types';

const router = express.Router();

/*
    GET /api/vendor/profile
    Description: 
    Request body: no request body
    Response body: VendorProfile
*/
router.route('/profile').get(isAuthenticated, isAuthorized, async (req, res) => {

  const profile = await VendorProfile.findOne({ userId: req.session.data?.userId });

  if (profile === null) {
    res.status(404).send();
  } else {
    res.status(200).send(profile);
  }
});

/*
    POST /api/vendor/profile/create
    Description: 
    Request body: VendorProfile
    Response body: 
*/
router.route('/profile/create').post(isAuthenticated, isAuthorized, async (req, res) => {

  const profile: T.NewVendorProfile = {...req.body, userId: req.session.data?.userId};
 
  try {
    const newProfile = new VendorProfile(profile);
    await newProfile.save();

    res.status(200).json({ message: 'Profile sucessfully created.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when creating the profile.'})
  }
});

/*
    PUT /api/vendor/profile/update
    Description: 
    Request body: VendorProfile
    Response body: 
*/
router.route('/profile/update').put(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    await VendorProfile.findOneAndUpdate({ userId: req.session.data?.userId }, req.body);

    res.status(200).json({ message: 'Profile sucessfully updated.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when updating the profile.'})
  }
});

/*
    DELETE /api/vendor/profile/delete
    Description: 
    Request body: 
    Response body: 
*/
router.route('/profile/delete').delete(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    await VendorProfile.findOneAndDelete({ userId: req.session.data?.userId });
    
    res.status(200).json({ message: 'Profile sucessfully deleted.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when deleting the profile.'})
  }
});

/*
    GET /api/vendor/my-spa
    Description: 
    Request body: no request body
    Response body: NewSpa
*/
router.route('/my-spa').get(isAuthenticated, isAuthorized, async (req, res) => {
  try {
    const mySpa = await MySpa.findOne({ userId: req.session.data?.userId });
    if (mySpa === null) {
      res.status(404).json(null);
    } else {
      res.status(200).json(mySpa);
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when creating the spa.'})
  }
});

/*
    POST /api/vendor/my-spa/create
    Description: 
    Request body: NewSpa
    Response body: 
*/
router.route('/my-spa/create').post(isAuthenticated, isAuthorized, async (req, res) => {

  const spa: T.NewVendorSpa = {...req.body, userId: req.session.data?.userId};
 
  try {
    const newSpa = new MySpa(spa);
    await newSpa.save();

    res.status(200).json({ message: 'Spa sucessfully created.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when creating the new spa.'})
  }
});

/*
    PUT /api/vendor/my-spa/update
    Description: 
    Request body: NewSpa
    Response body: 
*/
router.route('/my-spa/update').put(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    await MySpa.findOneAndUpdate({ userId: req.session.data?.userId }, req.body);

    res.status(200).json({ message: 'Spa sucessfully updated.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when updating the spa.'})
  }
});

/*
    DELETE /api/vendor/my-spa/delete
    Description: 
    Request body: 
    Response body: 
*/
router.route('/my-spa/delete').delete(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    await MySpa.findOneAndDelete({ userId: req.session.data?.userId });
    
    res.status(200).json({ message: 'MySpa sucessfully deleted.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when deleting MySpa.'})
  }
});




/*
    GET /api/vendor/my-services
    Description: 
    Request body: no request body
    Response body: VendorServiceHeader[]
*/
router.route('/my-services').get(isAuthenticated, isAuthorized, async (req, res) => {
  try {
    const myServices = await VendorService.find({ vendorUserId: req.session.data?.userId });
    if (myServices === null) {
      res.status(404).json(null);
    } else {
      res.status(200).json(myServices);
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when getting vendor services info.'})
  }
});

/*
    GET /api/vendor/my-services/:vendorServiceId
    Description: 
    Request body: no request body
    Response body: VendorService
*/
router.route('/my-services/:vendorServiceId').get(isAuthenticated, isAuthorized, async (req, res) => {
  try {
    const myServices = await VendorService.find({ _id: req.params.vendorServiceId });
    if (myServices === null) {
      res.status(404).json(null);
    } else {
      res.status(200).json(myServices);
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when getting vendor services by id.'})
  }
});

/*
    POST /api/vendor/my-services/create
    Description: 
    Request body: NewVendorService
    Response body: 
*/
router.route('/my-services/create').post(isAuthenticated, isAuthorized, async (req, res) => {

  const service: T.NewVendorService = {...req.body, vendorUserId: req.session.data?.userId};
 
  try {
    const newService = new VendorService(service);
    await newService.save();

    res.status(200).json({ message: 'Vendor service sucessfully created.', vendorServiceId: newService._id});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when creating the new vendor service.'})
  }
});

/*
    PUT /api/vendor/my-services/update
    Description: 
    Request body: NewVendorService
    Response body: 
*/
router.route('/my-services/update').put(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    await VendorService.findOneAndUpdate({ _id: req.body._id }, req.body);

    res.status(200).json({ message: 'Vendor service sucessfully updated.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when updating the vendor service.'})
  }
});

/*
    DELETE /api/vendor/my-services/delete/:vendorServiceId
    Description: 
    Request body: 
    Response body: 
*/
router.route('/my-spa/delete/:vendorServiceId').delete(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    await MySpa.findOneAndDelete({ _id: req.params.vendorServiceId });
    
    res.status(200).json({ message: 'MySpa sucessfully deleted.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when deleting MySpa.'})
  }
});


export default router;