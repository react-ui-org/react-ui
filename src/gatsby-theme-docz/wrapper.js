// Since we are shadowing an original file from `gatsby-theme-docz`, we can be sure that all
// required modules are already installed.
// eslint-disable-next-line import/no-extraneous-dependencies
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import React from 'react';

const Wrapper = ({ children }) => (
  // The name of this file must have the `.js` extension to override the original file.
  // eslint-disable-next-line react/jsx-filename-extension
  <>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    {children}
  </>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
