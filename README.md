# DR - Flickr

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.4 as part of a job interview.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. This can also be achieved using `npm start`.

## Build for production

In order to build for production, simply build using the supplied Dockerfile (`docker build -t kildahl/dr-flickr:latest .`). This will build a docker image using Angular optimizations that are hosted through nginx.

After that the docker image can be run using `docker run -p 8080:80 kildahl/dr-flickr:latest`.