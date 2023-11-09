// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  header: 'Escrow',
  localization: {
    languages: [
      { code: 'en', name: 'EN', culture: 'en-EN' },
      { code: 'ja', name: 'JP', culture: 'ja-JP' }
    ],
    defaultLanguage: 'en'
  },
  socket: 'http://localhost:3000',
  HOME_PAGE: 'http://localhost:4200',
  API_SERVICE: 'http://localhost:8085',
  API_AUTH: 'http://localhost:8086',
  pageSize: 20,
  pageIndex: 1,
  firebaseConfig: {
    apiKey: "AIzaSyBzbDehZnYHve2sQW-m_eUWsJIWRbY4K7A",
    authDomain: "fir-auth-7c74f.firebaseapp.com",
    projectId: "fir-auth-7c74f",
    storageBucket: "fir-auth-7c74f.appspot.com",
    messagingSenderId: "477893990336",
    appId: "477893990336",
    measurementId: "G-6NELBLYEJ9"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
