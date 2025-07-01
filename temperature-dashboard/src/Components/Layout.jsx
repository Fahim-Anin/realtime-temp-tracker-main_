import PropTypes from 'prop-types';
import React from 'react';

function Layout({ children }) {
  return (
    <div className="layout-container">
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;