# Shopgate Engage - Bolt Checkout extension
Enables Bolt Checkout in Shopgate Engage e-commerce app

## Currently supported shopping carts
- Magento2

## Bolt Merchant Dashboard Configuration
When in production `https://connect.shopgate.com` must be added to the list of domains the publishable key is configured ot be used on.
That configuration can be found in the Bolt merchant dashboard -> Settings -> Keys and URLs.

## Installation
In order to use this extension there are just few things than needs to be done.

### Magento2 setup
Bolt Checkout must be installed in Magento2 instance along with Shopgate plugin.
Must install cart-integration-magento2-bolt bridge plugin

### Engage app setup
Bolt Checkout extension needs following extensions in order to provide error free integration:
- @shopgate-project/bolt-checkout

### Extensions must be configured properly and shop has to be deployed.
All extensions must be properly configured in order to make the communication between Shopgate, Bolt and Magento2 correct.

For @shopgate/magento-cart configuration please refer to [@shopgate/magento-cart documentation](https://github.com/shopgate/ext-magento-cart).

## Extension Config
- boldApiBaseUrl - (string) Bolt API url. Prod: https://api.bolt.com/ Dev: https://api-sandbox.bolt.com/
    * (default) "https://api.bolt.com/"

- boldApiKey - (string) Bolt API Key. Can be found in Bolt admin.

- boltPublishableKey - (string) Bolt Publishable Key. Can be found in Bolt admin.

- cdnUrl - (string) Bolt CDN url (where the track.js and connect.js are located). Prod: connect.bolt Dev: connect-sandbox.bolt
    * (default) "connect.bolt"
    
- shoppingCart - (string) Merchant's shopping cart provider
    * (default) "Magento2"

- shopgateCustomerNumber - (string) Merchant's Shopgate customer number

- shopgateShopNumber - (string) Merchant's Shopgate shop number

- shopgateApiKey - (string) Merchant's Shopgate API key

- shopgatePluginUrl - (string) Url to Shopgate plugin endpoint on the merchant's magento2 server
