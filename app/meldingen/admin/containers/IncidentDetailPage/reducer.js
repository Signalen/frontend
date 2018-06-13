/*
 *
 * IncidentDetailPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REQUEST_INCIDENT,
  REQUEST_INCIDENT_SUCCESS,
  REQUEST_INCIDENT_ERROR
  } from './constants';

const initialState = fromJS({ });

function incidentDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_INCIDENT:
      return state
        .set('loading', true)
        .set('error', false);
    case REQUEST_INCIDENT_SUCCESS:
      return state
        .set('incident', action.incident)
        .set('loading', false);
    case REQUEST_INCIDENT_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default incidentDetailPageReducer;
