module.exports = (currency, cartItems = [], fullProducts = []) => {
  return cartItems
    .filter(({type, product}) => (type === 'product' && !!product))
    .map(item => {
      const fullProduct = fullProducts
        .find(fullProduct => fullProduct.id === item.product.id)
      const { customData = '{}' } = fullProduct || {}
      return {
        item_number: item.product.id,
        quantity: item.quantity,
        unit_amount: item.product.price.unit,
        name: item.product.name,
        currency,
        internal_order_info: customData
      }
    })
}
