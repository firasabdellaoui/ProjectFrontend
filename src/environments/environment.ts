// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,


  // FicheSuiviMicroservice: 'http://localhost:5000/api',
  FicheSuiviMicroservice: 'http://192.168.160.74:31633/production-fiche-suivi/api',
  //ChaudiereMicroservice: 'https://localhost:44352/api',
  FilialeMicroservice: 'http://192.168.160.74:31633/production-subsidiaries/api',

  ChaudiereMicroservice: "http://192.168.160.74:31633/review-chaudiere/api"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
