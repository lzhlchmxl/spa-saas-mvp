import express from 'express';
import { isAuthenticated, isAuthorized } from '../middleware';
import ClientProfile from '../models/clientProfile.model';
import MySpa from '../models/mySpa.model';
import VendorService from '../models/vendorService.model';
import Record from '../models/record.model';
import * as T from '../utilities/types';
import { getUnavailableDates } from '../utilities/processorFunctions';

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

/*
    GET /api/client/spas
    Description: 
    Request body: no request body
    Response body: VendorSpaHeader[]
*/
router.route('/spas').get(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    const vendorSpas = await MySpa.find();
    const vendorSpaHeaders:T.VendorSpaHeader[] = vendorSpas.map( vendorSpa => {
      return (
        {
          spaId: vendorSpa._id,
          name: vendorSpa.name,
          description: vendorSpa.description,
        }
      )
    });
    
    res.status(200).send(vendorSpaHeaders);
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when retriving vendorSpaHeaders.'})
  }
});

/*
    GET /api/client/spas/:spaId
    Description: 
    Request body: no request body
    Response body: VendorSpaHeader[]
*/
router.route('/spas/:spaId').get(isAuthenticated, isAuthorized, async (req, res) => {
  
  const spaId = req.params.spaId;

  try {
    const spa = await MySpa.findOne({ _id: spaId});
    const services = await VendorService.find({ spaId: spaId });

    if (spa === null || services === null) {
      throw new Error("No results found with the given spaId");
    }

    const spaDetails:T.SpaDetails = {
      name: spa.name,
      description: spa.description,
      services,
    }
    
    res.status(200).send(spaDetails);
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when retriving spaDetails.'})
  }
});

// ------------ Booking ------------ //


/*
    GET /api/client/spas/:spaId/bookService/:serviceId
    Description: 
    Request body: 
    Response body: 
*/
router.route('/spas/:spaId/bookService/:serviceId').get(isAuthenticated, isAuthorized, async (req, res) => {
  
  const spaId = req.params.spaId;
  const serviceId = req.params.serviceId;

  try {
    const spa = await MySpa.findOne({ _id: spaId});
    if (spa === null) {
      throw new Error("No results found with the given spaId");
    }
    // const occupiedRecords = await Promise.all(spa.recordIds.map( async (recordId: string) => {
    //   const record = await Record.findOne({_id: recordId});
    //   if (record === null) {
    //     throw new Error("No Record found with the given id");
    //   }
    //   const serviceStage = record.serviceStage;
    //   if (serviceStage === "booking" || serviceStage === "booked" || serviceStage === "rescheduling") {
    //     return record;
    //   }
    // }))
    const spaRecords = await Record.find({ spaId: spa._id });
    const occupiedRecords = spaRecords.filter( record => {
      const serviceStage = record.serviceStage;
      if (serviceStage === "booking" || serviceStage === "booked" || serviceStage === "rescheduling") {
        return record;
      }
    })

    const bookingService = await VendorService.findOne({ _id: serviceId });

    if (bookingService === null) {
      throw new Error("No results found with the given spaId or serviceId");
    }

    const unavailableDates = getUnavailableDates(occupiedRecords, bookingService);

    
    res.status(200).json(unavailableDates);
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when retriving spaDetails.'})
  }
});

export default router;