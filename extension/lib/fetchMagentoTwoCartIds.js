const PluginApi = require('../utilities/PluginApi')
const createCheckCartItems = require('../helpers/createCheckCartItems')
const createCheckCartCoupons = require('../helpers/createCheckCartCoupons')

module.exports = async (context, input) => {
  const { cartItems = [], fullProducts = [], currency, externalCustomerId } = input || {}

  if (cartItems.length < 1) {
    return {
      orderReference: null,
      displayId: null
    }
  }

  const cart = {
    internal_cart_info: JSON.stringify({ bolt_request: true }),
    items: createCheckCartItems(currency, cartItems, fullProducts),
    currency,
    client: {
      type: 'mobilesite'
    }
  }

  if (externalCustomerId) {
    cart.external_customer_id = externalCustomerId
  }

  const { externalCoupons, shopgateCoupons } = createCheckCartCoupons(currency, cartItems)

  if (externalCoupons.length > 0) {
    cart.external_coupons = externalCoupons
  }

  if (shopgateCoupons.length > 0) {
    cart.shopgate_coupons = shopgateCoupons
  }

  const api = new PluginApi(context)
  const response = await api.checkCart(cart)

  const { internal_cart_info: internalCartInfo } = response || {}
  const { quote_id: quoteId, reserved_order_id: reservedOrderId } = JSON.parse(internalCartInfo) || {}

  return {
    orderReference: quoteId,
    displayId: `${reservedOrderId} / ${quoteId}`
  }
}
