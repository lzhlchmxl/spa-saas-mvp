export type NewClientProfile = {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  emailAddress: string,
  dateOfBirth: Date,
  homeAddress: string,
}

export type NewVendorProfile = {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  emailAddress: string,
  businessAddress: string,
  businessName: string,
  serviceCategories: ServiceCategoryId[],
  vendorServices: VendorService[],
}

export type ServiceCategory = {
  name: string,
  description: string,
}

export type ServiceCategoryId = id;
type id = string;

export type VendorService = {
  name: string,
  description: string,
  duration: string, // in mili sec
  cost: string,
}