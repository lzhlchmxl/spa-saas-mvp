import * as T from './types';

export async function getClientDetails(id: T.ClientId): Promise<T.ClientDetail> {
  const response = await fetch(`/api/client/${id}`)

  if (response.status !== 200) {
    throw new Error(`/api/client/:${id} returned HTTP status code: ${response.status}`);
  }

  const clientDetails: T.ClientDetail = await response.json();

  return clientDetails;
}