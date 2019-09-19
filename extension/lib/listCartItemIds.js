module.exports = async (context, { cartItems = [] }) => ({
  cartItemIds: cartItems.map(cartItem => cartItem.id)
})
