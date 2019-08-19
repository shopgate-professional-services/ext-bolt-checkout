module.exports = async (context, { cartItems = [] }) => {
  return { cartItemIds: cartItems.map(cartItem => cartItem.id) }
}
