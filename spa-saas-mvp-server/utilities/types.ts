export type NewClientProfile = {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  emailAddress: string,
  dateOfBirth: Date,
  homeAddress: string,
}

export type NewVendorProfile = {
  userId: VendorUserId,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  emailAddress: string,
  businessAddress: string,
  businessName: string,
  serviceCategories: ServiceCategoryId[],
  // vendorServices: VendorService[],
}

export type ServiceCategory = {
  name: string,
  description: string,
}

type VendorUserId = id;
export type ServiceCategoryId = id;
type id = string;


export type NewVendorService = {
  categoryId: string,
  name: string,
  description: string,
  durationInSeconds: number, // in seconds
  cost: string,
}

export type NewVendorSpa = {
  userId: VendorUserId,
  name: string,
  description: string,
  // services: VendorService[],
}
