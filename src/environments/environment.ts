/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDroAkMrDPGDU8dd6NZ66dgQT77wMPAiZg",
    authDomain: "louchat-583ca.firebaseapp.com",
    databaseURL: "https://louchat-583ca.firebaseio.com",
    projectId: "louchat-583ca",
    storageBucket: "louchat-583ca.appspot.com",
    messagingSenderId: "433761680362"
  }
};
