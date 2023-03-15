export type User = {
  username: string,
  password: string,
  role: 'client' | 'vendor',
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

type id = string;

export type HTTPStatusCode = number;