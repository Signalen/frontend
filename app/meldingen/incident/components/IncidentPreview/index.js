/**
*
* IncidentPreview
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
//      <FormattedMessage {...messages.header} />

import './style.scss';

function IncidentPreview({ incident, preview }) {
  return (
    <div className="incident-preview">
      {Object.keys(preview).map((header) => (
        <div key={header}>{header}</div>
      ))}
      {console.log('incident', incident)}

    </div>
  );
}

IncidentPreview.propTypes = {
  incident: PropTypes.object,
  preview: PropTypes.object
};

export default IncidentPreview;
