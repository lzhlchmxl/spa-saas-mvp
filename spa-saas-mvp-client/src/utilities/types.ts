export type User = {
  username: string,
  password: string,
  role: 'client' | 'vendor' | 'admin',
}

/*
  Client Types 
*/
export type ClientProfile = {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  emailAddress: string,
  dateOfBirth: Date,
  homeAddress: string,
}

export type ClientId = id;
export type ClientProfileId = id;

/*
  Vendor Types 
*/

export type VendorId = id;

export type VendorProfile = {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  emailAddress: string,
  businessName: string,
  businessAddress: string,
  serviceCategories: ServiceCategory[];
}

// vendor service
export type VendorServiceHeader = {
  _id: string,
  name: string,
  cost: string,
  durationInSeconds: number,
}

// export type NewVendorService = {
//   categoryId: ServiceCategoryId,
//   vendorId: VendorId,
//   name: string,
//   description: string,
//   cost: string,
//   durationInSeconds: number,
// }
export type VendorServiceForm = {
  categoryId: ServiceCategoryId,
  name: string,
  description: string,
  cost: string,
  durationInSeconds: number,
}
export type VendorServiceId = id;
export type VendorService = VendorServiceForm & { _id: VendorServiceId };

export type NewSpa = {
  name: string,
  description: string,
  vendorServices: VendorService[],
}

/*
  Admin Types 
*/
// Service Category
export type ServiceCategoryId = id;
export type NewServiceCategory = {
  name: string,
  description: string,
}
export type ServiceCategory = NewServiceCategory & { _id: ServiceCategoryId };

type id = string;
export type HTTPStatusCode = number;
export type Duration = {
  hours: number,
  minutes: number,
}