import { main$ } from '@shopgate/pwa-common/streams/main';

/**
 * Subscriptions
 * @param {Function} subscribe Subscribe.
 */
const dummySubscriptions = (subscribe) => {
  subscribe(main$, ({ dispatch, getState }) => {

  });
};

export default dummySubscriptions;
