import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { ERROR_HANDLE_SUPPRESS } from '@shopgate/pwa-core/constants/ErrorHandleTypes';
import { logger } from '@shopgate/pwa-core/helpers';
import event from '@shopgate/pwa-core/classes/Event';
import { historyReplace } from '@shopgate/engage/core';
import { getCartProducts, CART_PATH, fetchCart } from '@shopgate/engage/cart';
import getCart from '@shopgate/pwa-tracking/selectors/cart';
import { track } from '@shopgate/pwa-tracking/helpers';
import { LoadingProvider } from '@shopgate/pwa-common/providers';
import { getBoltCartTokenState } from '../selectors';
import {
  errorBoltCartToken,
  receiveBoltCartToken,
  requestBoltCartToken,
} from '../action-creators';
import { formatTransaction } from '../helpers/formatTransaction';
import { CHECKOUT_SUCCESS_PAGE } from '../constants';
import config from '../config';

const { showLocalCheckoutSuccessPage } = config;

/**
 * @returns {Function}
 */
export const fetchBoltCartToken = () => (dispatch, getState) => {
  const state = getState();
  const boltCartTokenState = getBoltCartTokenState(state);

  if (boltCartTokenState.isFetching) {
    return;
  }

  LoadingProvider.setLoading(CART_PATH);

  dispatch(requestBoltCartToken());

  new PipelineRequest('shopgate-project.bolt.createCart')
    .setHandleErrors(ERROR_HANDLE_SUPPRESS)
    .dispatch()
    .then((response) => {
      dispatch(receiveBoltCartToken(response));
      LoadingProvider.unsetLoading(CART_PATH);
    })
    .catch((err) => {
      logger.error(err);
      dispatch(errorBoltCartToken());
      LoadingProvider.unsetLoading(CART_PATH);
    });
};

/**
 * Creates new cart, handles tracking, history reset etc
 * @param {Object} transaction bolt transaction
 * @return {Function}
 */
export const processOrder = transaction => async (dispatch, getState) => {
  try {
    await new PipelineRequest('shopgate-project.bolt.clearCart').dispatch();
  } catch (err) {
    logger.error(err);
  }
  const products = getCartProducts(getState());
  const order = formatTransaction(transaction, products);

  if (showLocalCheckoutSuccessPage) {
    track(
      'purchase',
      {
        ...order,
        meta: { source: 'app_PWA' },
      },
      getState()
    );
    dispatch(fetchCart());
    dispatch(historyReplace({ pathname: CHECKOUT_SUCCESS_PAGE }));

    return;
  }

  // checkoutSuccess triggers resetHistory, fetchCart and tracking
  event.trigger('checkoutSuccess', order);
};

/**
 * Triggers the initiatedCheckout tracking event
 * @return {Function}
 */
export const initiatedCheckout = () => (dispatch, getState) => {
  track('initiatedCheckout', { cart: getCart(getState()) }, getState());
};
