export const Paths = {
   HOME: '/',
   EVENT_DETAILS: '/:id',
   /** Auth routes */
   SIGNIN: '/signin',
   SIGNUP: '/signup',
   RECOVER_PASSOWRD: '/forgot-password',

   /** Auth middleware route */
   REDIRECT: '/redirect',

   /** Error routes */
   NOT_FOUND: '/404',
   PERMISSION_DENIED: '/403',

   /** Manager routes */
   MANAGER: '/manager',
   MANAGER_DASHBOARD: '/manager/dashboard',
   EVENTS_LIST: '/manager/events',
   EVENTS_CREATE: '/manager/create-event',
   EVENTS_UPDATE: '/manager/events/:id/update',
   EVENT_STATISTICS_DETAILS: '/manager/events/:id',
   PARTICIPANTS_LIST: '/manager/participants',
   STUDENTS_LIST: '/manager/student-list',
   NOTIFICATION_SETTINGS: '/manager/notification-settings'
} as const
