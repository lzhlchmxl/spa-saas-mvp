import express from 'express';
import { isAuthenticated, isAuthorized } from '../middleware';
import ServiceCategory, {ServiceCategoryInterface} from '../models/serviceCategory.model';
import * as T from '../utilities/types';

const router = express.Router();

/*
    GET /api/admin/service-categories
    Description: Get a list of service categories avilable to vendors
    Request body: no request body
    Response body: ServiceCategory[]
*/
router.route('/service-categories').get(isAuthenticated, isAuthorized, async (_req, res) => {

  const serviceCategories = await ServiceCategory.find();

  if (serviceCategories === null) {
    res.status(404).send();
  } else {
    res.status(200).send(serviceCategories);
  }
});

/*
    GET /api/admin/service-categories/view/:serviceCategoryId
    Description:
    Request body: no request body
    Response body: ServiceCategory
*/
router.route('/service-categories/view/:serviceCategoryId').get(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    const serviceCategories = await ServiceCategory.findOne({ _id: req.params.serviceCategoryId });
    if (serviceCategories === null) {
      throw new Error("Unable to find Service Category with given id.");
    } else {
      res.status(200).json(serviceCategories);
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred requesting the service category.'})
  }
});

/*
    POST /api/admin/service-categories/create-from-list
    Description: 
    Request body: ServiceCategory
    Response body: 
*/
router.route('/service-categories/create-from-list').post(isAuthenticated, isAuthorized, async (req, res) => {

  const serviceCategories: T.ServiceCategory[] = req.body;
 
  try {
    serviceCategories.forEach( async serviceCategory => {
      const newServiceCategory = new ServiceCategory(serviceCategory);
      await newServiceCategory.save();
    })
    res.status(200).json({ message: 'Service categories sucessfully created.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when creating service categories.'})
  }
});

/*
    POST /api/admin/service-categories/create
    Description: 
    Request body: ServiceCategory
    Response body: 
*/
router.route('/service-categories/create').post(isAuthenticated, isAuthorized, async (req, res) => {

  const serviceCategory: T.ServiceCategory = req.body;
 
  try {
    const newServiceCategory = new ServiceCategory(serviceCategory);
    await newServiceCategory.save();

    res.status(200).json({ message: 'Service category sucessfully created.', id: newServiceCategory._id});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when creating the service category.'})
  }
});

/*
    PUT /api/admin/service-categories/update
    Description: Find service-category by id and updates it
    Request body: ServiceCategory
    Response body: 
*/
router.route('/service-categories/update/:serviceCategoryId').put(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    await ServiceCategory.findOneAndUpdate({ _id: req.params.serviceCategoryId }, req.body);

    res.status(200).json({ message: 'Service-category sucessfully updated.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when updating the service-category.'})
  }
});

/*
    DELETE /api/admin/service-categories/delete
    Description: Find service-category by id and deletes it
    Request body: 
    Response body: 
*/
router.route('/service-categories/delete/:serviceCategoryId').delete(isAuthenticated, isAuthorized, async (req, res) => {

  try {
    await ServiceCategory.findOneAndDelete({ _id: req.params.serviceCategoryId });
    
    res.status(200).json({ message: 'Service-categories sucessfully deleted.'});
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'An error has occurred when deleting the service-categories.'})
  }
});

export default router;