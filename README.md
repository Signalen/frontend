
# Signalen frontend

This project provides a web frontend for Signalen, an application that helps cities manage and prioritize nuisance reports.

## Setup a development environment

Make sure you installed the following versions on your machine:

-  npm >= 6.11
-  node 12.18

Install the dependencies:

```bash
npm install
```

And start the watch server:

```bash
npm start
```

The server listens on port 3001 by default. You can change the by setting the environment variable `PORT`.

## Configuration

Configuration for theming, map and API endpoint URLs is defined in `app.base.json`. Override the default configuration by creating the file `app.json`. This file is ignored by Git. Changes to the configuration file will only be picked up when the development server is restarted.

## Testing

Run the unit-tests and generate a coverage report with:

```bash
npm test
```

To run the end-to-end tests make sure you are running a development watch server or start the stack with:

```bash
docker-compose build
docker-compose up -d
```

Then start the end-to-end tests with:

```bash
cd e2e-tests/
npm install
npm run open
```

## Service Worker

The production build uses a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) that requires HTTPS. Start a HTTPS server with the production build as follows:

```bash
HTTPS=true npm run start:prod
```

## Deployment

We provide [Helm charts](https://github.com/signalen/helm-charts) for production deployments of the Signalen stack on Kubernetes.

Pre-build images of the Signalen frontend are available on [DockerHub](https://hub.docker.com/r/signalen/frontend). To build the frontend Docker image locally use:

```bash
docker build -t signalen/frontend .
```

Start the frontend server with a custom configuration as follows:

```bash
docker run -d -p 8080:80 \
  -v /branding/app.json:/app.json \
  -v /branding/logo.png:/usr/share/nginx/html/logo.png \
  -v /branding/favicon.png:/usr/share/nginx/html/favicon.png \
  -v /branding/manifest.json:/usr/share/nginx/html/manifest.json \
  -v /branding/android.png:/usr/share/nginx/html/icon_192x192.png \
  -v /branding/ios.png:/usr/share/nginx/html/icon_180x180.png \
  signalen/frontend
```

The `-v` flags mount a custom configuration from the host in the container:

- `app.json` with specific configuration for theming, map and API endpoint URLs.
- The logo, as defined by `logo.url` in `app.base.json` (or `app.json`).
- `favicon.png` the favicon, needs to be a PNG.
- `manifest.json` with configuration for the PWA.
- `icon_...x....png` the icons for the PWA in various sizes, need to be PNGs.

The logo displayed on the website is defined by the `logo.url` parameter in `app.base.json`. This can be a remote URL or a local file path. Define for instance (in `app.json`) `/logo.svg` and you can inject your own `logo.svg` when starting the docker container.

The `manifest.json` file for the PWA is generated by webpack, but you can overwrite it with your own configuration. This file also defines some icons, which, in turn, can be injected into the container as well.

There is an icon for android of 192 x 192 pixels in size, defined in `manifest.json`. For iOS there's an icon of 180 x 180 pixels in size, this is defined directly in `index.html`. All icons have to be PNGs. The icon for iOS must not contain transparency. For more information on icons see [this Stack Overflow question](https://stackoverflow.com/questions/2997437/what-size-should-apple-touch-icon-png-be-for-ipad-and-iphone?answertab=votes#tab-top)
and [the Apple developer documentation](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html).

## Thanks to

<a href="http://browserstack.com/"><img src="src/images/browserstack-logo-600x315.png" height="130" alt="BrowserStack Logo" /></a>
