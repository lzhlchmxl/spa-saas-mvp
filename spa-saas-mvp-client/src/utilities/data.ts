import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { faSpa, faGears, faClockRotateLeft, faHandsHolding, faUserPlus, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import * as T from '../utilities/types';

export const adminPageSideMenuData = [
  {
    link: '/admin/service-categories',
    text: 'Service Categories',
    icon: faGears,
  }
]


export const clientPageSideMenuData: T.MenuData[] = [
  {
    link: '/client/profile',
    text: 'Profile',
    icon: icon({name: 'user', style: 'regular'}),
  },
  {
    link: '/client/spas',
    text: 'Spas',
    icon: faSpa, // [TODO] for some reason icon({name: 'spa'}) wont work, prob due to inproper babel config setting
  },
  {
    link: '/client/appointments',
    text: 'Appointments',
    icon: icon({name: 'calendar-check', style: 'regular'}),
  },
  {
    link: '/client/history',
    text: 'Histories',
    icon: faClockRotateLeft,
  },
]

export const vendorPageSideMenuData: T.MenuData[] = [
  {
    link: '/vendor/profile',
    text: 'Profile',
    icon: icon({name: 'user', style: 'regular'}),
  },
  {
    link: '/vendor/my-spa',
    text: 'My Spa',
    icon: faSpa,
    children: [
      {
        link: '/vendor/my-spa/#employees',
        text: 'Employees',
        icon: faUserPlus,
      },
      {
        link: '/vendor/my-spa/#services',
        text: 'Services',
        icon: faHandsHolding,
      },
      {
        link: '/vendor/my-spa/#resources',
        text: 'Resources',
        icon: faWarehouse,
      },
    ]
  },
  {
    link: '/vendor/appointments',
    text: 'Appointments',
    icon: icon({name: 'calendar-check', style: 'regular'}),
  },
  {
    link: '/vendor/history',
    text: 'Histories',
    icon: faClockRotateLeft,
  }
];


export const hydroSPAServices = [
    {
    "name": "Hydrotherapy",
    "description": "This involves the use of water to relax muscles and reduce stress. It may involve sitting in a warm pool or hot tub, receiving a hydro massage, or undergoing water jet therapy."
    },
    {
    "name": "Sauna",
    "description": "A dry heat treatment that involves sitting in a small room with temperatures ranging from 70 to 100 degrees Celsius. The heat promotes relaxation and may help with muscle soreness and joint pain."
    },
    {
    "name": "Steam Room",
    "description": "Similar to a sauna, but with higher humidity levels. This can help to cleanse pores and relax muscles."
    },
    {
    "name": "Hot Stone Massage",
    "description": "This massage involves the use of heated stones placed on specific areas of the body to promote relaxation and relieve tension."
    },
    {
    "name": "Aromatherapy",
    "description": "This involves the use of essential oils to promote relaxation and reduce stress. The oils may be diffused into the air or applied topically during a massage."
    },
    {
    "name": "Body Scrub",
    "description": "This treatment involves the use of a scrub or exfoliant to remove dead skin cells and leave the skin feeling smooth and refreshed."
    },
    {
    "name": "Body Wrap",
    "description": "This treatment involves wrapping the body in a warm towel or blanket infused with essential oils or other beneficial ingredients. It can help to detoxify the body and improve skin health."
    },
    {
    "name": "Foot Soak",
    "description": "This involves soaking the feet in warm water with added salts, essential oils, or other therapeutic ingredients. It can help to relieve stress and promote relaxation."
    },
    {
    "name": "Manicure and Pedicure",
    "description": "These services involve grooming and pampering the hands and feet. They may include soaking, scrubbing, massage, and nail care."
    },
    {
    "name": "Facials",
    "description": "These treatments involve cleansing, exfoliating, and moisturizing the face to promote healthy skin and reduce signs of aging."
    }
  ]

  export const vendorSpaResourceFormData: T.FormData[] = [
    {
      stateName: "name",
      setStateName: "setName",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "avilableCount",
      setStateName: "setAvilableCount",
      initialStateValue: 0,
      inputType: "number",
    },
    {
      stateName: "type",
      setStateName: "setType",
      initialStateValue: "",
      inputType: "text",
    }
  ]

  export const vendorSpaServiceFormData: T.FormData[] = [
    {
      stateName: "name",
      setStateName: "setName",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "description",
      setStateName: "setDescription",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "durationInSeconds",
      setStateName: "setDurationInSeconds",
      initialStateValue: 0,
      inputType: "duration",
    },
    {
      stateName: "cost",
      setStateName: "setCost",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "requiredSpaResources",
      setStateName: "requiredSpaResources",
      initialStateValue: [],
      inputType: "requiredSpaResourcesTable"
    }
  ]

  export const vendorSpaInfoFormData: T.FormData[] = [
    {
      stateName: "name",
      setStateName: "setName",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "description",
      setStateName: "setDescription",
      initialStateValue: "",
      inputType: "text",
    }
  ]

  export const vendorProfileFormData: T.FormData[] = [
    {
      stateName: "firstName",
      setStateName: "setFirstName",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "lastName",
      setStateName: "setLastName",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "phoneNumber",
      setStateName: "setPhoneNumber",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "emailAddress",
      setStateName: "setEmailAddress",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "businessAddress",
      setStateName: "setBusinessAddress",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "businessName",
      setStateName: "setBusinessName",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "serviceCategories",
      setStateName: "setServiceCategories",
      initialStateValue: [],
      inputType: "undefined",
    },
  ]

  export const clientProfileFormData: T.FormData[] = [
    {
      stateName: "firstName",
      setStateName: "setFirstName",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "lastName",
      setStateName: "setLastName",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "phoneNumber",
      setStateName: "setPhoneNumber",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "emailAddress",
      setStateName: "setEmailAddress",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "homeAddress",
      setStateName: "setHomeAddress",
      initialStateValue: "",
      inputType: "text",
    },
    {
      stateName: "dateOfBirth",
      setStateName: "dateOfBirth",
      initialStateValue: "",
      inputType: "date",
    },
  ]