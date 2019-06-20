import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import getConfig from '../helpers/getConfig';
import injectBoltConnect from '../helpers/injectBoltConnect';

const config = getConfig();

/**
 * Will mount bolt tracking and connect scripts on app start
 * @param {Function} subscribe subscriber function
 */
const mountBoltScriptSubscription = (subscribe) => {
  subscribe(appDidStart$, () => {
    injectBoltConnect(config);
  });
};

export default mountBoltScriptSubscription;
