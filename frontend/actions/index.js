import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { logger } from '@shopgate/pwa-core/helpers';
import { getCartItems } from '@shopgate/engage/cart';
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

export const flushCart = () => (dispatch, getState) => {
  const cartItems = getCartItems(getState());
  console.warn(cartItems);
};

