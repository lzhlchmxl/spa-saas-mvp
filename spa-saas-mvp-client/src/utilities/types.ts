import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type User = {
  username: string,
  password: string,
  role: userRole,
}
export type userRole = 'client' | 'vendor' | 'admin';

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

export type SpaDetails = {
  name: string,
  description: string,
  services: VendorService[],
}

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
  requiredSpaResources: RequiredSpaResource[],
}
export type RequiredSpaResource = { spaResource: SpaResource, requiredCount: number };
export type VendorServiceId = id;
export type VendorService = VendorServiceForm & { _id: VendorServiceId };

export type DateTimeRange = {
  startDateTime: Date,
  endDateTime: Date,
}

export type SpaEmployee = {
  _id: SpaEmployeeId,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  status: "active" | "vacation" | "off-work",
  permission: "basic" | "advanced",
  unavailableDateTimeRanges: DateTimeRange[],
}
type SpaEmployeeId = id;


export type SpaResource = SpaResourceForm & { _id: SpaResourceId }
export type SpaResourceForm = {
  name: string,
  availableCount: number,
  type: SpaResourceTypes,
}
export type SpaResourceTypes = "ingradient" | "supply" | "spot" | "room";
export type SpaResourceId = id; 

export type VendorSpa = {
  name: string,
  description: string,
  services: VendorService[],
  employees: SpaEmployee[],
  resources: SpaResource[],
}

export type NewSpa = {
  name: string,
  description: string,
}
export type VendorSpaId = id; 
export type VendorSpaHeader = {
  vendorSpaId: VendorSpaId;
  name: string,
  description: string,
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


/* 
  UI Types
*/
export type MenuData = {
  link: string,
  text: string,
  icon?: IconDefinition,
  children?: MenuData[],
}

export type FormData = {
  stateName: string;
  setStateName: string;
  initialStateValue: "" | [] | 0;
  inputType: "text" | "undefined" | "duration" | "number" | "dropdown" | "requiredSpaResourcesTable" | "date";
}