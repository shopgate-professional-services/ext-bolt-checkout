# ext-bolt-checkout
Extension to enable Bolt Checkout

## Currently supported shopping carts
- Magento

## Config

- boldApiBaseUrl - (string) Bolt API url. Prod: https://api.bolt.com/ Dev: https://api-sandbox.bolt.com/
    * (default) "https://api.bolt.com/"

- boldApiKey - (string) Bolt API Key. Can be found in Bolt admin.
    * (default) "bff75639efbf6e38519994d052f5b30f15f603a647123b1d4a40ea5592d61d02"
    
- boltPublishableKey - (string) Bolt Publishable Key. Can be found in Bolt admin.
    * (default) "_WbB6Np-UkMq.TtSBR6r4dtds.da5c8d172bc679cf431a8e77cb08a01552208329782a36a6b3d90499def02728"

- cdnUrl - (string) Bolt CDN url (where the track.js and connect.js are located). Prod: connect.bolt Dev: connect-sandbox.bolt
    * (default) "connect.bolt"
    
- shoppingCart - (string) Merchant's shopping cart provider
    * (default) "Magento"