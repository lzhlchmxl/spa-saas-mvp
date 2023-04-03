import express from 'express';
import { isAuthenticated, isAuthorized } from '../middleware';
import VendorProfile from '../models/vendorProfile.model';
import VendorService from '../models/vendorService.model';
import SpaEmployee from '../models/spaEmployee.model';
import SpaResource, { SpaResourceInterface } from '../models/spaResources.model';
import MySpa from '../models/mySpa.model';
import * as T from '../utilities/types';
import { Schema } from 'mongoose';

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
      throw new Error("No spa found with the given vendorId");
    } 
      // const spaEmployees = await Promise.all(mySpa.employees.map( async (employeeId: string) => {
      //   const spaEmployee = await SpaEmployee.findOne({ _id: employeeId });
      //   if (spaEmployee === null) {
      //     throw new Error("No matching employee found");
      //   }
      //   return spaEmployee;
      // }));
      const mySpaId = mySpa._id;
      const spaEmployees = await SpaEmployee.find({ spaId: mySpaId });
      
      // const spaServices = await Promise.all(mySpa.serviceIds.map( async (serviceId: string) => {
      //   const spaService = await VendorService.findOne({ _id: serviceId });
      //   if (spaService === null) {
      //     throw new Error("No matching service found");
      //   }
      //   return spaService;
      // }));
      const spaServices = await VendorService.find( {spaId: mySpaId });
  
      // const spaResources = await Promise.all(mySpa.resourceIds.map( async (resourceId: string) => {
      //   const spaResource = await SpaResource.findOne({ _id: resourceId });
      //   if (spaResource === null) {
      //     throw new Error("No matching resource found");
      //   }
      //   return spaResource;
      // }));

      const spaResources = await SpaResource.find( {spaId: mySpaId })

      const spa = {
        name: mySpa.name,
        description: mySpa.description,
        employees: spaEmployees,
        services: spaServices,
        resources: spaResources,
      }

      res.status(200).json(spa);
    
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when creating the spa.'})
  }
});

/*
    POST /api/vendor/my-spa/info/create
    Description: 
    Request body: NewSpa
    Response body: 
*/
router.route('/my-spa/info/create').post(isAuthenticated, isAuthorized, async (req, res) => {

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
    PUT /api/vendor/my-spa/info/update
    Description: 
    Request body: NewSpa
    Response body: 
*/
router.route('/my-spa/info/update').put(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    await MySpa.findOneAndUpdate({ userId: req.session.data?.userId }, req.body);

    res.status(200).json({ message: 'Spa sucessfully updated.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when updating the spa.'})
  }
});
 
/*
    DELETE /api/vendor/my-spa/info/delete
    Description: 
    Request body: 
    Response body: 
*/
router.route('/my-spa/info/delete').delete(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    await MySpa.findOneAndUpdate({ userId: req.session.data?.userId }, {name: "", description: ""});
    
    res.status(200).json({ message: 'MySpa info sucessfully deleted.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when deleting MySpa info.'})
  }
});

/*
    GET /api/vendor/my-spa/services
    Description: 
    Request body: no request body
    Response body: VendorServiceHeader[]
*/
// router.route('/my-spa/services').get(isAuthenticated, isAuthorized, async (req, res) => {
//   try {
//     const myServices = await VendorService.find({ vendorUserId: req.session.data?.userId });
    
//     if (myServices === null) {
//       res.status(404).json(null);
//     } else {
//       res.status(200).json(myServices);
//     }
//   } catch(err) {
//     console.log(err)
//     res.status(500).json({ message: 'An error has occurred when getting vendor services info.'})
//   }
// });


// --------- Services ---------- //

/*
    GET /api/vendor/my-spa/services/:vendorServiceId
    Description: 
    Request body: no request body
    Response body: VendorService
*/
router.route('/my-spa/services/:vendorServiceId').get(isAuthenticated, isAuthorized, async (req, res) => {
  try {
    const spaServiceDetails = await VendorService.findOne({ _id: req.params.vendorServiceId });
    if (spaServiceDetails === null) {
      throw new Error("No matching serviceDetails found based on given service id.");
    }
    const requiredSpaResources = await Promise.all(spaServiceDetails.requiredSpaResources.map( async (requiredSpaResource) => {
      
      const spaResource = await SpaResource.findOne({ _id: requiredSpaResource.spaResourceId });
      if (spaResource === null) {
        throw new Error("No matching resource found");
      }
      return {
        spaResource,
        requiredCount: requiredSpaResource.requiredCount,
      }
    }));

    const spaServiceDetailsWithResources = {
      categoryId: spaServiceDetails.categoryId,
      name: spaServiceDetails.name,
      description: spaServiceDetails.description,
      cost: spaServiceDetails.cost,
      durationInSeconds: spaServiceDetails.durationInSeconds,
      requiredSpaResources,
    }

    res.status(200).json(spaServiceDetailsWithResources);

  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when getting vendor services by id.'})
  }
});

/*
    POST /api/vendor/my-spa/services/create
    Description: 
    Request body: NewVendorService
    Response body: 
*/
router.route('/my-spa/services/create').post(isAuthenticated, isAuthorized, async (req, res) => {
 
  try {

    const vendorSpa = await MySpa.findOne({userId: req.session.data?.userId});
    if (vendorSpa === null) {
      throw new Error('Unable to find the spa associated with the given vendorId');
    }
    const service: T.NewVendorService = {...req.body, vendorId: req.session.data?.userId, spaId: vendorSpa._id};
    
    const newService = new VendorService(service);
    // vendorSpa.serviceIds.push(newService._id);
    // await vendorSpa.save();
    await newService.save();
    
    res.status(200).json({ message: 'Vendor service sucessfully created.', vendorServiceId: newService._id});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when creating the new vendor service.'})
  }
});

/*
    PUT /api/vendor/my-spa/services/update
    Description: 
    Request body: NewVendorService
    Response body: 
*/
router.route('/my-spa/services/update').put(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    await VendorService.findOneAndUpdate({ _id: req.body._id }, req.body);

    res.status(200).json({ message: 'Vendor service sucessfully updated.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when updating the vendor service.'})
  }
});

/*
    DELETE /api/vendor/my-spa/services/:vendorServiceId/delete
    Description: 
    Request body: 
    Response body: 
*/
router.route('/my-spa/services/:vendorServiceId/delete').delete(isAuthenticated, isAuthorized, async (req, res) => {

  const vendorServiceId = req.params.vendorServiceId;

  try {
    const vendorSpa = await MySpa.findOne({userId: req.session.data?.userId});
    if (vendorSpa === null) {
      throw new Error('Unable to find the spa associated with the given vendorId');
    }

    // const updatedSpaServiceIds = vendorSpa.serviceIds.filter( (serviceId: Schema.Types.ObjectId) => {   
    //   return serviceId.toString() !== vendorServiceId
    // });
    // vendorSpa.serviceIds = updatedSpaServiceIds;
    // await vendorSpa.save();
    await VendorService.findOneAndDelete({ _id: vendorServiceId });
    res.status(200).json({ message: 'VendorService sucessfully deleted.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when deleting VendorService.'})
  }
});


// ---------------------Resources--------------------- //

/*
    GET /api/vendor/my-spa/resources
    Description: Get a list of resources 
    Request body: no request body
    Response body:
*/
router.route('/my-spa/resources').get(isAuthenticated, isAuthorized, async (req, res) => {
  try {

    const vendorId = req.session.data?.userId;
    const vendorSpa = await MySpa.findOne({ userId: vendorId })

    if (vendorSpa === null) {
      throw new Error('Unable to find the spa associated with the given vendorId');
    }
    
    // const spaResources = await Promise.all(vendorSpa.resourceIds.map( async (resourceId: string) => {
    //   return await SpaResource.findOne({ _id: resourceId });
    // }))
    const spaResources = await SpaResource.find({ spaId: vendorSpa._id });
    
    res.status(200).json(spaResources);
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when getting spa resources'})
  }
});

/*
    GET /api/vendor/my-spa/resources/:resourceId
    Description: Get resource detail by ID
    Request body: no request body
    Response body:
*/
router.route('/my-spa/resources/:resourceId').get(isAuthenticated, isAuthorized, async (req, res) => {
  try {

    const vendorId = req.session.data?.userId;
    const vendorSpa = await MySpa.findOne({ userId: vendorId })

    if (vendorSpa === null) {
      throw new Error('Unable to find the spa associated with the given vendorId');
    }

    const spaResource = await SpaResource.find({ _id: req.params.resourceId });
    
    if (spaResource === null) {
      res.status(404).json(null);
    } else {
      res.status(200).json(spaResource);
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when getting spa resources'})
  }
});

/*
    POST /api/vendor/my-spa/resources/create
    Description: 
    Request body: 
    Response body: 
*/
router.route('/my-spa/resources/create').post(isAuthenticated, isAuthorized, async (req, res) => {
 
  try {

    const vendorId = req.session.data?.userId;

    const vendorSpa = await MySpa.findOne({ userId: vendorId })

    if (vendorSpa === null) {
      throw new Error('Unable to find the spa associated with the given vendorId');
    }

    const resource = {...req.body, vendorId: vendorId, spaId: vendorSpa._id};
    
    const newResource = new SpaResource(resource);
    // vendorSpa.resourceIds.push(newResource._id);
    // await vendorSpa.save();
    await newResource.save();
    
    res.status(200).json({ message: 'Vendor resource sucessfully created.', spaResourceId: newResource._id});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when creating the new spa resource.'})
  }
});

/*
    PUT /api/vendor/my-spa/services/update
    Description: 
    Request body: NewVendorService
    Response body: 
*/
// router.route('/my-spa/services/update').put(isAuthenticated, isAuthorized, async (req, res) => {

//   try {
//     await VendorService.findOneAndUpdate({ _id: req.body._id }, req.body);

//     res.status(200).json({ message: 'Vendor service sucessfully updated.'});
//   } catch(err) {
//     console.log(err)
//     res.status(500).json({ message: 'An error has occurred when updating the vendor service.'})
//   }
// });

/*
    DELETE /api/vendor/my-spa/services/:vendorServiceId/delete
    Description: 
    Request body: 
    Response body: 
*/
// router.route('/my-spa/services/:vendorServiceId/delete').delete(isAuthenticated, isAuthorized, async (req, res) => {

//   const vendorServiceId = req.params.vendorServiceId;

//   try {
//     const vendorSpa = await MySpa.findOne({userId: req.session.data?.userId});
//     if (vendorSpa === null) {
//       throw new Error('Unable to find the spa associated with the given vendorId');
//     }

//     // const updatedSpaServiceIds = vendorSpa.serviceIds.filter( (serviceId: Schema.Types.ObjectId) => {   
//     //   return serviceId.toString() !== vendorServiceId
//     // });
//     // vendorSpa.serviceIds = updatedSpaServiceIds;
//     // await vendorSpa.save();
//     await VendorService.findOneAndDelete({ _id: vendorServiceId });
//     res.status(200).json({ message: 'VendorService sucessfully deleted.'});
//   } catch(err) {
//     console.log(err)
//     res.status(500).json({ message: 'An error has occurred when deleting VendorService.'})
//   }
// });

export default router;