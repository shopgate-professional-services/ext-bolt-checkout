import React from 'react';
import PropTypes from 'prop-types';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors } = themeConfig;

/**
 * @returns {JSX}
 */
const CheckoutButton = ({ busy }) => {
  const styles = {
    '--bolt-primary-action-color': colors.primary,
  };

  if (busy) {
    styles.opacity = '0.5';
    styles.pointerEvents = 'none';
  }
  return (<div
    className="bolt-checkout-button large-width"
    style={styles}
  />);
};

CheckoutButton.propTypes = {
  busy: PropTypes.bool.isRequired,
};

export default CheckoutButton;
