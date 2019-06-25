import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import { cartReceived$ } from '@shopgate/pwa-common-commerce/cart/streams';
import { fetchBoltCartToken } from '../actions';
import injectBoltConnect from '../helpers/injectBoltConnect';

/**
 * @param {Function} subscribe subscriber function
 */
export default (subscribe) => {
  subscribe(appDidStart$, () => {
    injectBoltConnect();
  });
  subscribe(cartReceived$, ({ dispatch }) => {
    dispatch(fetchBoltCartToken());
  });
};
