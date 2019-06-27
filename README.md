# Shopgate Engage - Bolt Checkout extension
Enables Bolt Checkout in Shopgate Engage e-commerce app.

## Currently supported shopping carts
- Magento

## Installation
In order to use this extension there are just few things than needs to be done.

### Magento setup
Bolt Checkout must be installed in Magento instance along with Shopgate plugin.

### Engage app setup
Bolt Checkout extension needs following extensions in order to provide error free integration:
- @shopgate/user
- @shopgate/magento-cart
- @shopgate-project/bolt-checkout

**Please note that @shopgate/user must be added to the shop config before @shopgate/magento-cart.** It's crucial for the final extensions' pipeline setup/order.
 
### Extensions must be configured properly and shop has to be deployed.
All extensions (especially @shopgate/magento-cart and @shopgate-project/bolt-checkout) must be properly configured in order to make the communication between Shopgate, Bolt and Magento correct.

For @shopgate/magento-cart configuration please refer to [@shopgate/magento-cart documentation](https://github.com/shopgate/ext-magento-cart).

## Extension Config
- boldApiBaseUrl - (string) Bolt API url. Prod: https://api.bolt.com/ Dev: https://api-sandbox.bolt.com/
    * (default) "https://api.bolt.com/"

- boldApiKey - (string) Bolt API Key. Can be found in Bolt admin.
- boltPublishableKey - (string) Bolt Publishable Key. Can be found in Bolt admin.

- cdnUrl - (string) Bolt CDN url (where the track.js and connect.js are located). Prod: connect.bolt Dev: connect-sandbox.bolt
    * (default) "connect.bolt"
    
- shoppingCart - (string) Merchant's shopping cart provider
    * (default) "Magento"
