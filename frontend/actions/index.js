import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { shouldFetchData } from '@shopgate/pwa-common/helpers/redux';
import { logger } from '@shopgate/pwa-core/helpers';
import { getBoltCartToken } from '../selectors';
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
  const boltCartToken = getBoltCartToken(state);

  if (!shouldFetchData(boltCartToken, 'boltCartToken')) {
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
