module.exports = async (context, { cartItems = [] }) => {
  return { productIds: cartItems
    .filter(({ type, product }) => (type === 'product' && !!product))
    .map(({ product }) => product.id)
  }
}
