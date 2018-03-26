import PropTypes from 'prop-types';
import React from 'react';

const Documentation = props => (
  <div>
    <h3>{props.name}</h3>
    <div>
      {props.component}
    </div>
  </div>
);

Documentation.propTypes = {
  component: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
};

export default Documentation;
