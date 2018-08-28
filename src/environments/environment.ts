// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: 'AIzaSyAuSbc-NlRwNKv2_egIOVL8GoYD4nZ1IKI',
      authDomain: 'taskscheduler-fc805.firebaseapp.com',
      databaseURL: 'https://taskscheduler-fc805.firebaseio.com',
      projectId: 'taskscheduler-fc805',
      storageBucket: 'taskscheduler-fc805.appspot.com',
      messagingSenderId: '103945350171'
  }

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
