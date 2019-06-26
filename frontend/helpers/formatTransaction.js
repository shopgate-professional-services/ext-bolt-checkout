/**
 * Converts a transaction into a webcheckout order object
 * @param {Object} transaction transaction obj from bolt
 * @param {Object} products cartItems products from our cart
 * @returns {Object}
 */
export const formatTransaction = (transaction, products) => {

  transaction = {
    'id': 'TA54aC11Kdz1S',
    'type': 'cc_payment',
    'date': 1561529964694,
    'reference': '6HYV-8GWR-8XMZ',
    'status': 'pending',
    'from_consumer': {
      'id': 'CAaFKEcQTufSp',
      'first_name': 'jkv',
      'last_name': 'hjh',
      'avatar': {'domain': 'img-sandbox.bolt.com', 'resource': 'default.png'},
      'authentication': {'methods': ['code'], 'actions': ['set_password']},
      'phones': [{
        'id': '',
        'number': '+1 0977686',
        'country_code': '1',
        'status': '',
        'priority': ''
      }, {
        'id': 'PAcgRRA4jipVs',
        'number': '0977686',
        'country_code': '1',
        'status': 'pending',
        'priority': 'listed'
      }, {
        'id': 'PA6ei6aZDV6di',
        'number': '+49 9776 86',
        'country_code': '49',
        'status': 'pending',
        'priority': 'primary'
      }],
      'emails': [{
        'id': '',
        'address': 'test@test.de',
        'status': '',
        'priority': ''
      }, {
        'id': 'EAn71SAaWzGKZ',
        'address': 'test@test.de',
        'status': 'pending',
        'priority': 'primary'
      }]
    },
    'to_consumer': {
      'id': 'CA6HFrY9cHnZk',
      'first_name': 'John',
      'last_name': 'Doe',
      'avatar': {'domain': 'img-sandbox.bolt.com', 'resource': 'default.png'}
    },
    'from_credit_card': {
      'id': 'CA2krJHTc1QjQ',
      'description': 'default card',
      'last4': '1111',
      'bin': '411111',
      'expiration': 1630454400000,
      'network': 'visa',
      'token_type': 'vantiv',
      'priority': 'listed',
      'display_network': 'Visa',
      'icon_asset_path': 'img/issuer-logos/visa.png',
      'status': 'transient',
      'billing_address': {
        'id': 'AA4xMfUSebSfz',
        'street_address1': 'tzg gjk',
        'locality': 'vhjjg',
        'region': 'Hessen',
        'postal_code': '58976',
        'country_code': 'DE',
        'country': 'Germany',
        'name': 'jkv hjh',
        'first_name': 'jkv',
        'last_name': 'hjh',
        'phone_number': '0977686',
        'email_address': 'test@test.de'
      }
    },
    'amount': {'amount': 10500, 'currency': 'USD', 'currency_symbol': '$'},
    'authorization': {'status': 'succeeded', 'reason': 'none'},
    'captures': null,
    'merchant_division': {
      'id': 'MAiwpWAmynjGz',
      'merchant_id': 'MA4pY5bao1hzN',
      'public_id': 'TtSBR6r4dtds',
      'description': 'DailySale Sandbox',
      'logo': {
        'domain': 'img-sandbox.bolt.com',
        'resource': 'DailySale_Sandbox_logo_1554131318704671617.png'
      },
      'hook_url': 'https://freerangefun.com/magentoOne/boltpay/api/hook',
      'hook_type': 'bolt',
      'shipping_and_tax_url': 'https://freerangefun.com/magentoOne/boltpay/shipping'
    },
    'indemnification_decision': 'indemnified',
    'indemnification_reason': 'checkout',
    'last_viewed_utc': 0,
    'billing_address': {
      'street_address1': 'tzg gjk',
      'street_address2': '',
      'locality': 'vhjjg',
      'region': 'Hessen',
      'postal_code': '58976',
      'company': '',
      'country': 'Germany',
      'country_code': 'DE',
      'first_name': 'jkv',
      'last_name': 'hjh',
      'phone': '0977686',
      'email': 'test@test.de'
    },
    'shipping_address': {
      'street_address1': 'tzg gjk',
      'street_address2': '',
      'locality': 'vhjjg',
      'region': 'Hessen',
      'postal_code': '58976',
      'company': '',
      'country': 'Germany',
      'country_code': 'DE',
      'first_name': 'jkv',
      'last_name': 'hjh',
      'phone': '0977686',
      'email': 'test@test.de'
    },
    'cart': {'order_reference': '101'},
    'user_note': '',
    'shipping_option': {
      'valid': true,
      'value': {
        'service': 'Flat Rate - Fixed',
        'cost': {'amount': 500, 'currency': 'USD', 'currency_symbol': '$'},
        'reference': 'flatrate_flatrate',
        'signature': 'L2AzhNPxdAPmQIHaAsRVyntqn4XskODnlVNUyUSe81k='
      }
    }
  };

  return {
    order: {
      number: transaction.id, // TODO: id or reference?
      currency: transaction.amount.currency,
      totals:
        [
          {
            type: 'shipping',
            amount: transaction.shipping_option.value.cost.amount / 100,
          },
          {
            type: 'grandTotal',
            amount: transaction.amount.amount / 100,
          },
        ],
      products: products.map(({ product, quantity }) => ({
        id: product.id,
        name: product.name,
        quantity,
        price: {
          net: product.price.special || product.price.unit,
          withTax: product.price.special || product.price.unit,
        },
      })),
    },
  };
};
