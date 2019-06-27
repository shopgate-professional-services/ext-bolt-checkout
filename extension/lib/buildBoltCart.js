/**
 * @param {PipelineContext} context
 * @param {Object} input
 * @returns {Promise<Object>}
 */
module.exports = async function (context, input) {
  if (!input.cartItems.length) {
    throw new Error('Your cart is empty')
  }

  const cartItems = input.cartItems.filter(({ type }) => type === 'product')

  const items = cartItems.map((cartItem) => {
    const product = cartItem.product

    return {
      name: product.name,
      reference: cartItem.id,
      total_amount: product.price.unit * cartItem.quantity * 100,
      unit_price: product.price.unit * 100,
      quantity: cartItem.quantity,
      image_url: product.featuredImageUrl ? product.featuredImageUrl : undefined,
      // TODO: we don't have the key of the prop. we only have the label
      properties: product.properties.map(({ label: key, value }) => ({ key, value }))
    }
  })

  const tax = input.totals.find(({ type }) => type === 'tax')
  const discounts = input.totals.filter(({ type }) => type === 'discount')

  const cart = {
    order_reference: input.cartId,
    currency: input.currency,
    total_amount: input.totals.find(({ type }) => type === 'grandTotal').amount * 100,
    tax_amount: tax ? tax.amount * 100 : undefined,
    items,
    discounts: discounts.map((d) => ({
      amount: Math.abs(d.amount * 100),
      description: d.label
    }))
  }

  context.log.debug(cart, 'Bolt cart')

  return {
    cart
  }
}
