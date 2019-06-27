/**
 * @param {PipelineContext} context
 * @param {Object} input
 * @returns {Promise<Object>}
 */
module.exports = async function (context, input) {
  console.warn(JSON.stringify(input))

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

  return {
    cart: {
      order_reference: input.cartId,
      currency: input.currency,
      total_amount: input.totals.find(({ type }) => type === 'grandTotal').amount * 100,
      tax_amount: tax ? tax.amount * 100 : undefined,
      items
      /*
      discounts: input.appliedDiscounts.map((discount) => ({
        amount: 1000, // TODO: how to handle percentage here
        description: discount.description,
        reference: discount.code,
      }))
      */
    }
  }
}
