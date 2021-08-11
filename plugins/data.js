import Vue from 'vue'
// const services = [
//     {
//         icon: 'mdi-airport',
//         name: 'airport-services'
//     },
//     {
//         icon: 'local_dining',
//         name: 'catering'
//     },
//     {
//         icon: 'local_gas_station',
//         name: 'fuel'
//     },
//     {
//         icon: 'build',
//         name: 'ground-handling'
//     },
//     {
//         icon: 'mdi-truck',
//         name: 'gse-equipment'
//     },
//     {
//         icon: 'local_play',
//         name: 'permit'
//     }
// ]

// const supplierSubMenu = [
//     { icon: 'mdi-view-dashboard-outline', name: 'Summary' },
//     { icon: 'mdi-map-marker-multiple', name: 'Coverages' },
//     { icon: 'mdi-account', name: 'Contacts' },
//     { icon: 'mdi-file-document-edit-outline', name: 'Documents' },
//     { icon: 'mdi-file-document-box', name: 'Templates' },
//     // { icon: "mdi-currency-usd", name: "TCE" },
//     { icon: 'mdi-receipt', name: 'Billing' }
//     // { icon: "mdi-gas-station", name: "FPO" }
// ]

// const clientSubMenu = [
//     {
//         access_name: 'summary',
//         icon: 'mdi-view-dashboard-outline',
//         name: 'Summary'
//     },
//     { access_name: 'operators', icon: 'mdi-account-multiple', name: 'Operators' },
//     { access_name: 'billing', icon: 'mdi-receipt', name: 'Billing' },
//     {
//         access_name: 'accountmanager',
//         icon: 'mdi-account-circle-outline',
//         name: 'Account Manager'
//     },
//     { access_name: 'contacts', icon: 'mdi-account', name: 'Contacts' },
//     {
//         access_name: 'clickcharges',
//         icon: 'mdi-currency-usd',
//         name: 'Click Charges'
//     },
//     {
//         access_name: 'specialreqs',
//         icon: 'mdi-shield-star-outline',
//         name: 'Special Reqs'
//     },
//     {
//         access_name: 'publicprofile',
//         icon: 'mdi-shield-account-outline',
//         name: 'Public Profile'
//     }
// ]

// const operatorSubMenu = [
//     {
//         access_name: 'summary',
//         icon: 'mdi-view-dashboard-outline',
//         name: 'Summary'
//     },
//     { access_name: 'aircraft', icon: 'mdi-airplane', name: 'Aircraft' },
//     { access_name: 'billing', icon: 'mdi-receipt', name: 'Billing' },
//     {
//         access_name: 'accountmanager',
//         icon: 'mdi-account-circle-outline',
//         name: 'Account Manager'
//     },
//     { access_name: 'contacts', icon: 'mdi-account', name: 'Contacts' },
//     {
//         access_name: 'documents',
//         icon: 'mdi-file-document-edit-outline',
//         name: 'Documents'
//     },
//     { access_name: 'crew', icon: 'mdi-account-supervisor-circle', name: 'Crew' },
//     {
//         access_name: 'clickcharges',
//         icon: 'mdi-currency-usd',
//         name: 'Click Charges'
//     },
//     {
//         access_name: 'specialreqs',
//         icon: 'mdi-shield-star-outline',
//         name: 'Special Reqs'
//     },
//     {
//         access_name: 'publicprofile',
//         icon: 'mdi-shield-account-outline',
//         name: 'Public Profile'
//     }
// ]

// const clickChargesSubMenu = [
//     {
//         access_name: 'permits',
//         icon: 'local_play',
//         name: 'Permits'
//     },
//     {
//         access_name: 'fuelmargins',
//         icon: 'mdi-margin',
//         name: 'Fuel Margins'
//     },
//     {
//         access_name: 'flightplanning',
//         icon: 'mdi-arrow-decision-outline',
//         name: 'Flight Planning'
//     },
//     {
//         access_name: 'handling',
//         icon: 'mdi-dolly',
//         name: 'Handling'
//     },
//     {
//         access_name: 'flatrate',
//         icon: 'mdi-sale',
//         name: 'Flat Rate'
//     },
//     {
//         access_name: 'hotelmarkup',
//         icon: 'mdi-marker-check',
//         name: 'Hotel Markup'
//     }
// ]

const mainMenu = [
  // {
  //   icon: "mdi-monitor-dashboard",
  //   title: "Dashboard",
  //   to: "/"
  // },
  {
    icon: 'mdi-domain',
    title: 'Bookings Plan',
    access_name: 'bookings',
    to: '/bookings',
    subMenu: [
      {
        icon: 'mdi-domain',
        title: 'Plans',
        access_name: 'plans',
        to: '/plans'

      },
      {
        icon: 'mdi-domain',
        title: 'Pickups',
        access_name: 'pickups',
        to: '/pickups'

      },
      {
        icon: 'mdi-domain',
        title: 'Returns',
        access_name: 'returns',
        to: '/returns'

      }
    ]
  },
  {
    icon: 'mdi-account-tie-outline',
    title: 'Vehicles',
    access_name: 'vehicles',
    to: '/vehicles',
    subMenu: []
  },

  {
    icon: 'mdi-account-group',
    title: 'Users',
    access_name: 'users',
    to: '/users',
    subMenu: []
  }
]

const messages = {
  default_error:
    'An unexpected error has occurred. Please try again sometime later.',
  default_success: 'The specified action has been performed.',
  remove: 'The specified information has been removed.'
}

const obj = {
  // services,
  mainMenu,
  // supplierSubMenu,
  // clientSubMenu,
  // operatorSubMenu,
  // clickChargesSubMenu,
  messages
}

export default obj
Vue.prototype.$pluginsData = obj
