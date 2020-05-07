import '@testing-library/jest-dom/extend-expect';
import L from 'leaflet-headless';
import 'core-js/stable';
import 'regenerator-runtime';
import 'url-polyfill';
import 'raf/polyfill';
import 'jest-localstorage-mock';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

global.window.L = L;
global.window.alert = msg => msg;

if (process.env.CI) {
  // prevent pollution of the build log when running tests in CI
  global.console.warn = () => {};
}

global.URL.createObjectURL = jest.fn(() => 'https://url-from-data/image.jpg');
global.window.CONFIG = {
  ROOT: 'http://localhost:3001/',
  AUTH_ROOT: 'https://acc.api.data.amsterdam.nl/',
  API_ROOT_MAPSERVER: 'https://map.data.amsterdam.nl/',
  USERS_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/private/users/',
  ROLES_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/private/roles/',
  PERMISSIONS_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/private/permissions/',
  SEARCH_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/private/search',
  PREDICTION_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/category/prediction',
  INCIDENT_PUBLIC_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/public/signals/',
  INCIDENT_PRIVATE_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/private/signals/',
  INCIDENTS_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/private/signals/',
  GEOGRAPHY_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/private/signals/geography',
  PRIORITY_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/auth/priority/',
  FEEDBACK_STANDARD_ANSWERS_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/public/feedback/standard_answers/',
  FEEDBACK_FORMS_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/public/feedback/forms/',
  AUTH_ME_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/private/me/',
  CATEGORIES_PRIVATE_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/private/categories/',
  CATEGORIES_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/',
  TERMS_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/private/terms/categories/',
  IMAGE_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/signal/image/',
  FILTERS_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/private/me/filters/',
  DEPARTMENTS_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/v1/private/departments/',
  DASHBOARD_ENDPOINT: 'https://acc.api.data.amsterdam.nl/signals/experimental/dashboards/1',
  OVL_KLOKKEN_LAYER:
    'https://map.data.amsterdam.nl/maps/openbare_verlichting?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=Klokken&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326',
  OVL_VERLICHTING_LAYER:
    'https://map.data.amsterdam.nl/maps/openbare_verlichting?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=Verlichting&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326',
};

/**
 * Element.closest() polyfill
 *
 * Both Jest and JSDOM don't offer support for Element.closest()
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest}
 * @see {@link https://github.com/jsdom/jsdom/issues/1555}
 */
window.Element.prototype.closest = function closest(selector) {
  let el = this;
  while (el) {
    if (el.matches(selector)) {
      return el;
    }
    el = el.parentElement;
  }

  return el;
};
