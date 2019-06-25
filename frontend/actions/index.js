import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { logger } from '@shopgate/pwa-core/helpers';
import { fetchCart } from '@shopgate/engage/cart';
import { getBoltCartTokenState } from '../selectors';
import {
  errorBoltCartToken,
  receiveBoltCartToken,
  requestBoltCartToken,
} from '../action-creators';

/**
 * @returns {Function}
 */
export const fetchBoltCartToken = () => (dispatch, getState) => {
  const state = getState();
  const boltCartTokenState = getBoltCartTokenState(state);

  if (boltCartTokenState.isFetching) {
    return;
  }

  dispatch(requestBoltCartToken());

  new PipelineRequest('shopgate-project.bolt.createCart')
    .dispatch()
    .then((response) => {
      dispatch(receiveBoltCartToken(response));
    })
    .catch((err) => {
      logger.error(err);
      dispatch(errorBoltCartToken());
    });
};

export const flushCart = () => (dispatch) => {
  new PipelineRequest('shopgate.cart.createNewCartForCustomer')
    // createNewCartForCustomer don't really use the orderId it only checks for its existence
    .setInput({ orderId: 'dummy'})
    .dispatch()
    .catch((err) => {
      logger.error(err);
    });
};

