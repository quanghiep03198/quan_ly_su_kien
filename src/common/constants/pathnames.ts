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
   PARTICIPANTS_LIST: 'participants',
   PARTICIPANTS_CREATE: 'add-participants',
   ATENDEES_LIST: 'attendees',
   STATISTICS_MANAGEMENT: 'statistics',
   NOTIFICATION_SETTINGS: 'notification-settings'
} as const
