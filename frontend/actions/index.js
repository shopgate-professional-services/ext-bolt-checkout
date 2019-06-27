import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { ERROR_HANDLE_SUPPRESS } from '@shopgate/pwa-core/constants/ErrorHandleTypes';
import { logger } from '@shopgate/pwa-core/helpers';
import event from '@shopgate/pwa-core/classes/Event';
import { getCartProducts, CART_PATH } from '@shopgate/engage/cart';
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
    await new PipelineRequest('shopgate.cart.createNewCartForCustomer')
      // createNewCartForCustomer don't really use the orderId it only checks for its existence
      .setInput({ orderId: 'dummy' })
      .dispatch();
  } catch (err) {
    logger.error(err);
  }

  const products = getCartProducts(getState());
  const order = formatTransaction(transaction, products);

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
