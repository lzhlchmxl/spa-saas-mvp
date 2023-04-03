export type NewClientProfile = {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  emailAddress: string,
  dateOfBirth: Date,
  homeAddress: string,
}

export type NewVendorProfile = {
  userId: VendorId,
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

type VendorId = id;
export type ServiceCategoryId = id;
type id = string;


export type NewVendorService = {
  categoryId: string,
  name: string,
  description: string,
  durationInSeconds: number, // in seconds
  cost: string,
}

// NewVendorSpa and VendorSpaHeader looks identical for now as intended
export type NewVendorSpa = {
  userId: VendorId,
  name: string,
  description: string,
  serviceCategoryIds: ServiceCategoryId[],
}

export type VendorSpaHeader = {
  spaId: SpaId,
  name: string,
  description: string,
}

export type SpaEmployeeForm = {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  status: "active" | "vacation" | "off-work",
  permission: "basic" | "advanced",
  unavailableDateTimeRanges: DateTimeRange[],
}

export type SpaDetails = {
  name: string,
  description: string,
  services: VendorService[],
}

type VendorServiceForm = {
  categoryId: ServiceCategoryId,
  name: string,
  description: string,
  cost: string,
  durationInSeconds: number,
}
type VendorServiceId = id;
type VendorService = VendorServiceForm & { _id: VendorServiceId };
type SpaId = id;

export type DateTimeRange = {
  startDateTime: Date,
  endDateTime: Date,
}
