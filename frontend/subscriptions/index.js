import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import injectBoltConnect from '../helpers/injectBoltConnect';

/**
 * Will mount bolt tracking and connect scripts on app start
 * @param {Function} subscribe subscriber function
 */
const injectBoltConnectSubscription = (subscribe) => {
  subscribe(appDidStart$, () => {
    injectBoltConnect();
  });
};

export default injectBoltConnectSubscription;
