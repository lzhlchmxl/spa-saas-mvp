import * as T from './types';

export async function createAccount(newUser: T.User): Promise<T.HTTPStatusCode> {
 
  const requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  }
  
  const response = await fetch('/api/users/register', requestOptions)

  return response.status;
}


export async function getClientProfile(): Promise<T.ClientProfile | null> {
  const response = await fetch(`/api/client/profile`)

  if (response.status === 404) {
    return null;
  }

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/client/profile returned HTTP status code: ${response.status}`);
  }

  const clientProfile: T.ClientProfile = await response.json();

  return clientProfile;
}

export async function createProfile(newProfile: T.ClientProfile): Promise<T.HTTPStatusCode> {

  const requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProfile)
  }

  const response = await fetch(`/api/client/profile/create`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/client/profile/create returned HTTP status code: ${response.status}`);
  }

  return response.status;
}

export async function updateProfile(updatedProfile: T.ClientProfile): Promise<T.HTTPStatusCode> {

  const requestOptions = {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedProfile)
  }

  const response = await fetch(`/api/client/profile/update`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/client/profile/update returned HTTP status code: ${response.status}`);
  }

  return response.status;
}

export async function deleteProfile(): Promise<T.HTTPStatusCode> {

  const requestOptions = {
    method: 'delete'
  }

  const response = await fetch(`/api/client/profile/delete`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/client/profile/delete returned HTTP status code: ${response.status}`);
  }

  return response.status;
}