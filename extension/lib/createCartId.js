const createCartId = async (context, { magentoCartId }) => {
  return {
    cartId: magentoCartId
  }
}

module.exports = createCartId
