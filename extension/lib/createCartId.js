const createCartId = async (context, { magentoCartId }) => {
  return {
    cartId: `shopgate|${magentoCartId}`
  }
}

module.exports = createCartId
