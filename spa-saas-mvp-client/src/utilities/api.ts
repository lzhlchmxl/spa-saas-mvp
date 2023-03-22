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

export async function createClientProfile(newProfile: T.ClientProfile): Promise<T.HTTPStatusCode> {

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

export async function updateClientProfile(updatedProfile: T.ClientProfile): Promise<T.HTTPStatusCode> {

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

export async function deleteClientProfile(): Promise<T.HTTPStatusCode> {

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

export async function getVendorProfile(): Promise<T.VendorProfile | null> {
  const response = await fetch(`/api/vendor/profile`)

  if (response.status === 404) {
    return null;
  }

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/vendor/profile returned HTTP status code: ${response.status}`);
  }

  const vendorProfile: T.VendorProfile = await response.json();

  return vendorProfile;
}


export async function createVendorProfile(newProfile: T.VendorProfile): Promise<T.HTTPStatusCode> {

  const requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProfile)
  }

  const response = await fetch(`/api/vendor/profile/create`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/vendor/profile/create returned HTTP status code: ${response.status}`);
  }

  return response.status;
}

export async function updateVendorProfile(updatedProfile: T.VendorProfile): Promise<T.HTTPStatusCode> {

  const requestOptions = {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedProfile)
  }

  const response = await fetch(`/api/vendor/profile/update`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/vendor/profile/update returned HTTP status code: ${response.status}`);
  }

  return response.status;
}

export async function deleteVendorProfile(): Promise<T.HTTPStatusCode> {

  const requestOptions = {
    method: 'delete'
  }

  const response = await fetch(`/api/vendor/profile/delete`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/vendor/profile/delete returned HTTP status code: ${response.status}`);
  }

  return response.status;
}

/* GET a list of service categories */
export async function getServiceCategories(): Promise<T.ServiceCategory[]> {
  const response = await fetch(`/api/admin/service-categories`);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/admin/service-categories returned HTTP status code: ${response.status}`);
  };

  return await response.json();
}

/* GET specific service categories by id */
export async function getServiceCategoryDetails(id: T.ServiceCategoryId): Promise<T.ServiceCategory> {
  const response = await fetch(`/api/admin/service-categories/view/${id}`);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/admin/service-categories/view: returned HTTP status code: ${response.status}`);
  }

  return await response.json();
}

export async function createServiceCategoryDetails(newServiceCategory: T.NewServiceCategory): Promise<Response> {

  const requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newServiceCategory)
  }

  const response = await fetch(`/api/admin/service-categories/create`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/admin/service-categories/create returned HTTP status code: ${response.status}`);
  }

  return response;
}

export async function updateServiceCategoryDetails(updatedServiceCategory: T.ServiceCategory): Promise<T.HTTPStatusCode> {

  const requestOptions = {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedServiceCategory)
  }

  const response = await fetch(`/api/admin/service-categories/update/${updatedServiceCategory._id}`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/admin/service-categories/update returned HTTP status code: ${response.status}`);
  }

  return response.status;
}

export async function deleteServiceCategoryDetails(id: T.ServiceCategoryId): Promise<T.HTTPStatusCode> {

  const requestOptions = {
    method: 'delete'
  }

  const response = await fetch(`/api/admin/service-categories/delete:${id}`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/admin/service-categories/delete returned HTTP status code: ${response.status}`);
  }

  return response.status;
}


/* GET Spa info from vendor */
export async function getMySpa(): Promise<T.NewSpa> {
  const response = await fetch(`/api/vendor/my-spa`);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200 && response.status !== 404) {
    throw new Error(`/api/vendor/my-spa: returned HTTP status code: ${response.status}`);
  }

  return await response.json();
}

export async function createMySpa(newSpa: T.NewSpa): Promise<Response> {

  const requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSpa)
  }

  const response = await fetch(`/api/vendor/my-spa/create`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/vendor/my-spa/create returned HTTP status code: ${response.status}`);
  }

  return response;
}

export async function updateMySpa(updatedSpa: T.NewSpa): Promise<T.HTTPStatusCode> {

  const requestOptions = {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedSpa)
  }

  const response = await fetch(`/api/vendor/my-spa/update`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/vendor/my-spa/update returned HTTP status code: ${response.status}`);
  }

  return response.status;
}

export async function deleteMySpa(): Promise<T.HTTPStatusCode> {

  const requestOptions = {
    method: 'delete'
  }

  const response = await fetch(`/api/vendor/my-spa/delete`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/vendor/my-spa/delete returned HTTP status code: ${response.status}`);
  }

  return response.status;
}

/* GET a list of vendor service info based on vendorId*/
export async function getMyServiceHeaders(): Promise<T.VendorServiceHeader[]> {
  const response = await fetch(`/api/vendor/my-services`);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200 && response.status !== 404) {
    throw new Error(`/api/vendor/my-services: returned HTTP status code: ${response.status}`);
  }

  return await response.json();
}


export async function getMyServiceDetails(vendorServiceId: T.VendorServiceId): Promise<T.VendorService> {

  const response = await fetch(`/api/vendor/my-services/${vendorServiceId}`);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status === 404) {
    window.alert('No service found with the given id. Redirecting...');
    window.location.pathname = '/vendor/my-services';
    throw new Error('No service found with the given id.');
  }

  if (response.status !== 200) {
    throw new Error(`/api/vendor/my-services: returned HTTP status code: ${response.status}`);
  }

  return await response.json();
}

export async function createMyService(newService: T.VendorServiceForm): Promise<Response> {

  const requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newService)
  }

  const response = await fetch(`/api/vendor/my-services/create`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/vendor/my-services/create returned HTTP status code: ${response.status}`);
  }

  return response;
}

export async function updateMyServiceById(updatedService: T.VendorService): Promise<T.HTTPStatusCode> {

  const requestOptions = {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedService)
  }

  const response = await fetch(`/api/vendor/my-services/update`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/vendor/my-services/update returned HTTP status code: ${response.status}`);
  }

  return response.status;
}

export async function deleteMyServiceById(id: T.VendorServiceId): Promise<T.HTTPStatusCode> {

  const requestOptions = {
    method: 'delete'
  }

  const response = await fetch(`/api/vendor/my-services/delete/${id}`, requestOptions);

  if (response.status === 401 || response.status === 403) {
    window.location.href = '/login';
  }

  if (response.status !== 200) {
    throw new Error(`/api/vendor/my-services/delete/ returned HTTP status code: ${response.status}`);
  }

  return response.status;
}
