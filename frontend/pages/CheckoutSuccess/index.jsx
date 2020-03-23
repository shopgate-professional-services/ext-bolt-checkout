import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { Route, Button } from '@shopgate/engage/components';
import { useTheme, withNavigation } from '@shopgate/engage/core';
import { CHECKOUT_SUCCESS_PAGE } from '../../constants';
import config from '../../config';

const {
  localCheckoutSuccessPageTitle,
  localCheckoutSuccessPageButtonText,
  localCheckoutSuccessPageButtonMessage,
} = config;
const titleStyle = css({
  textAlign: 'center',
}).toString();
const messageStyle = css({
  margin: '12px 16px',
});

/**
 * OrderSuccess Page
 * @param {Function} historyReset History Reset
 * @return {JSX}
 */
const CheckoutSuccess = ({ historyReset }) => {
  const { View, AppBar } = useTheme();

  return (
    <View>
      <AppBar
        left={null}
        title={localCheckoutSuccessPageTitle}
        right={null}
      />
      <h2 className={titleStyle}>
        {localCheckoutSuccessPageTitle}
      </h2>
      {localCheckoutSuccessPageButtonMessage &&
        <div className={messageStyle}>
          {localCheckoutSuccessPageButtonMessage}
        </div>
      }
      <Button type="primary" onClick={historyReset}>
        {localCheckoutSuccessPageButtonText}
      </Button>
    </View>
  );
};

CheckoutSuccess.propTypes = {
  historyReset: PropTypes.func,
};

CheckoutSuccess.defaultProps = {
  historyReset: () => {},
};

export default () => (
  <Route pattern={CHECKOUT_SUCCESS_PAGE} component={withNavigation(CheckoutSuccess)} />
);
