// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: "DR - Flickr",
  flickr: {
    apiKey: "7c2605204e14ded6eaa9be023489bf3b",
    endpoints: {
      search: "https://api.flickr.com/services/rest/?method=flickr.photos.search",
      image: "https://live.staticflickr.com",
      sourceSite: "https://www.flickr.com/photos"
    }
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
