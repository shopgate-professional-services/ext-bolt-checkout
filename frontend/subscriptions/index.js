import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import { cartReceived$ } from '@shopgate/pwa-common-commerce/cart/streams';
import { fetchBoltCartToken } from '../actions';
import injectBoltConnect from '../helpers/injectBoltConnect';
import getConfig from '../helpers/getConfig';

const config = getConfig();

/**
 * @param {Function} subscribe subscriber function
 */
export default (subscribe) => {
  subscribe(appDidStart$, () => {
    const script = document.createElement('script');
    script.id = 'bolt-track';
    script.type = 'text/javascript';
    script.src = `https://${config.cdnUrl}.com/track.js`;
    script.setAttribute('data-publishable-key', config.boltPublishableKey);
    const parent = document.getElementsByTagName('head')[0];
    parent.appendChild(script);

    injectBoltConnect();
  });

  subscribe(cartReceived$, ({ dispatch }) => {
    dispatch(fetchBoltCartToken());
  });
};
