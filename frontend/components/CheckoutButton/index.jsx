import React, { useEffect, useRef } from 'react';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors } = themeConfig;

/**
 * @returns {JSX}
 */
const CheckoutButton = () => {
  return <div
    className="bolt-checkout-button large-width"
    style={{
      '--bolt-primary-action-color': colors.primary
    }}
  />;
};

export default CheckoutButton;
