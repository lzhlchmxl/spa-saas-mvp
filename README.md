# spa-saas-mvp
An MVP of a SaaS for SPAs with a list of selected core features.

## Goals
### client login via email registration with password.
	- One profile per client account, can create and edit profile. Each profile would contain: id, first name, last name, phone number, email address, date of birth, home address
	- View a list of vendors
	- Create, edit, delete appointments.Each appointment would contain: id, vendor ID, date created, appointment date, profile id, a list of services, note
	- Make payment to vendor
	- View visit history, each history would contain: id, date visited, list of services had, cost, payment status

### vendor login via email with password
	- One profile per vendor account, can create and edit profile. Each profile would contain: id, business name, business address, select a list of services which they offer from a preset (make it configurable if time).
	- dashboard for vendor
		- calendar with a list of requested services from clients 
		- a list of registered clients
			- a list of client visit history for each client
		- toggle avilable services (MVP, this should be based on avilable resources)

## Potential Challenges
	- calendar conflict UX for client and calendar management flow for vendor
	- when booking an appointment, 
	- Third party payment service integrations. Payment flow will be kept at minimum viable for now.

## Additional Features (Not in scope)
	- insurance, employement bennifits
	- inventory management
	- scheduling would require a list of pre-req resources (avilable therapist, supply, location)
	- multi-location vendor support
	- e-signatures
