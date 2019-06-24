import getConfig from './getConfig';

const config = getConfig();

/**
 * Inject bolt-connect script
 */
const injectBoltConnect = () => {
  const script = document.createElement('script');
  script.id = 'bolt-connect';
  script.type = 'text/javascript';
  script.src = `https://${config.cdnUrl}.com/connect.js`;
  script.setAttribute('data-shopping-cart', config.shoppingCart);
  script.setAttribute('data-publishable-key', config.boltPublishableKey);
  const parent = document.getElementsByTagName('head')[0];
  parent.appendChild(script);
};

/**
 * Tries to get BoltConnect from window Object. If not yet available, tries again.
 * @param {func} resolve Promise.resolve function
 */
const tryBoltConnect = (resolve) => {
  if (window.BoltConnect && window.BoltCheckout) {
    resolve(window.BoltConnect && window.BoltCheckout);
    return;
  }
  setTimeout(() => {
    tryBoltConnect(resolve);
  }, 100);
};

/**
 * Injects the bolt-connect script and returns promise looking for BoltConnect window object.
 * @returns {Promise<Object>}
 */
const boltConnectPromise = () => {
  injectBoltConnect();
  return new Promise((resolve) => {
    tryBoltConnect(resolve);
  });
};

let promise;

/**
 * Get's the Cliplister object.
 *
 * @returns {Promise}
 */
function getBoltConnect() {
  if (!promise) {
    promise = boltConnectPromise();
  }
  return promise;
}

export default getBoltConnect;
