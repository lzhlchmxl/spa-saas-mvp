export type User = {
  username: string,
  password: string,
  role: 'client' | 'vendor' | 'admin',
}


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

export type VendorProfile = {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  emailAddress: string,
  businessName: string,
  businessAddress: string,
  serviceCategories: ServiceCategory[];
}

export type ServiceCategoryId = id;
export type NewServiceCategory = {
  name: string,
  description: string,
}
export type ServiceCategory = NewServiceCategory & { _id: ServiceCategoryId };

type id = string;

export type HTTPStatusCode = number;