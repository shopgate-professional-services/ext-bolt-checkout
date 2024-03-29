/**
 * Get value of total from cart total in cents
 * @param {string} totalName Name of total line to be accessed
 * @param {[Object]} totals Array of Total objects
 * @return {number}
 */
const getTotal = (totalName, totals = []) => {
  const { amount = 0 } = totals.find(({ type }) => type === totalName) || {}
  // return in cents rounded to whole cent
  return Math.round(amount * 100)
}

/**
 * @param {PipelineContext} context
 * @param {Object} input
 * @returns {Promise<Object>}
 */
module.exports = async function buildBoltCart (context, input) {
  if (!input.cartItems.length) {
    return {
      cart: null
    }
  }
  const cartItems = input.cartItems.filter(({ type }) => type === 'product')

  const items = cartItems.map((cartItem) => {
    const product = cartItem.product
    const fullProduct = input.products.find(({ id }) => id === product.id)
    const { identifiers: { sku = '' } } = fullProduct || { identifiers: {} }

    return {
      name: product.name,
      reference: product.id,
      total_amount: Math.round(product.price.unit * cartItem.quantity * 100),
      unit_price: Math.round(product.price.unit * 100),
      quantity: cartItem.quantity,
      sku: sku.trim(),
      image_url: product.featuredImageUrl ? product.featuredImageUrl : undefined,
      type: 'physical',
      properties: product.properties.map(({ label: key, value }) => ({ key, value }))
    }
  })

  const tax = getTotal('tax', input.totals)
  const discounts = input.totals.filter(({ type }) => type === 'discount')
  const discountAmount = discounts.reduce((total, discount) => (
    total + Math.abs(Math.round(discount.amount * 100))
  ), 0)
  const cart = {
    order_reference: input.orderReference,
    metadata: {
      immutable_quote_id: input.orderReference
    },
    currency: input.currency,
    total_amount: getTotal('subTotal', input.totals) + tax - discountAmount,
    tax_amount: tax,
    items,
    discounts: discounts.map((d) => ({
      amount: Math.abs(Math.round(d.amount * 100)),
      description: d.label
    }))
  }

  if (input.displayId) {
    cart.display_id = input.displayId
  }

  context.log.debug(cart, 'Bolt cart')

  return {
    cart
  }
}
