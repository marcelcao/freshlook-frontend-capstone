import React from 'react';
import PropTypes from 'prop-types';

export default function Footer({ className }) {
  return (
    <>
      <footer className={className}>
        <a href="https://github.com/marcelcao/freshlook-frontend-capstone" className="github-footer">View on Github </a> | © 2023 freshlook by marcelcao
      </footer>
    </>
  );
}

Footer.propTypes = {
  className: PropTypes.string.isRequired,
};
