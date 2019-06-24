import React, { useEffect, useRef } from 'react';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors } = themeConfig;

/**
 * @returns {JSX}
 */
const CheckoutButton = () => {
  const buttonEl = useRef(null);
  useEffect(() => {
    buttonEl.current.setAttribute('style', `--bolt-primary-action-color: ${colors.primary}`);
  }, []);
  return <div className="bolt-checkout-button large-width" ref={buttonEl} />;
};

export default CheckoutButton;
