import * as T from './types';

export async function getClientProfile(): Promise<T.ClientProfile | null> {
  const response = await fetch(`/api/client/profile`)

  if (response.status === 404) {
    return null;
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

  if (response.status !== 200) {
    throw new Error(`/api/client/profile/create returned HTTP status code: ${response.status}`);
  }

  return response.status;
}