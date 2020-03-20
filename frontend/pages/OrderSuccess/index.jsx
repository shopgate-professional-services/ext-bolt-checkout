import React from 'react';
import { Route } from '@shopgate/engage/components';
import { RouteContext } from '@shopgate/pwa-common/context';
import event from '@shopgate/pwa-core/classes/Event';
import { useTheme } from '@shopgate/engage/core';
import { ORDER_SUCCESS_PAGE } from '../../constants';

const OrderSuccess = () => {
  const { View, AppBar } = useTheme();

  const clickHandler = (state) => {
    console.log('route state', state);
    const { order = {} } = state || {};
    event.trigger('checkoutSuccess', order);
  };

  return (
    <RouteContext.Consumer>
      {({ state }) => (
        <View>
          <AppBar
            left={null}
            title="order success"
            right={null}
          />
          <button type="button" onClick={() => clickHandler(state)}>Order Success</button>
        </View>
      )}
    </RouteContext.Consumer>
  );
};

export default () => (
  <Route pattern={ORDER_SUCCESS_PAGE} component={OrderSuccess} />
);
