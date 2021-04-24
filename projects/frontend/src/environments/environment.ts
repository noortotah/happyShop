// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backend_url: 'http://localhost:3000/api/',
  image_path: 'http://localhost:3000/',
  firebaseConfig : {
    apiKey: 'AIzaSyCdwkSrrreVNQ714-QUV7yMkdkrfWavWMI',
    authDomain: 'happyshop-69f5a.firebaseapp.com',
    projectId: 'happyshop-69f5a',
    storageBucket: 'happyshop-69f5a.appspot.com',
    messagingSenderId: '234981862956',
    appId: '1:234981862956:web:f2f1c39883803f235a6b89',
    measurementId: 'G-BHM5MS5R1Q'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
