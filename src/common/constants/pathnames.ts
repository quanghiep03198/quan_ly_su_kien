export const Paths = {
   DEFAULT: '/',
   /** @description Auth routes */
   SIGNIN: '/signin',
   SIGNUP: '/signup',
   RECOVER_PASSOWRD: '/forgot-password',

   /** @description Auth middleware route */
   REDIRECT: '/redirect',

   /** @description Error routes */
   NOT_FOUND: '/404',
   PERMISSION_DENIED: '/403',

   /** @description Manager routes */
   MANAGER: '/manager',
   MANAGER_DASHBOARD: 'dashboard',
   EVENTS_LIST: 'events',
   EVENTS_CREATE: 'create-event',
   EVENTS_UPDATE: 'events:id',
   STAFFS_MANAGEMENT: 'staffs',
   STAFFS_CREATE: 'add-staffs',
   ATENDEES_MANAGEMENTS: 'attendees-management',
   STATISTICS_MANAGEMENT: 'statistics',
   PARTICIPANTS_MANAGEMENT: 'participants',
   NOTIFICATION_SETTINGS: 'notification-settings'
} as const
