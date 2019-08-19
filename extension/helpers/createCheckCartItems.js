const getInternalOrderInfo = (item) => {
  const internalOrderInfo = {
    store_view_id: 1,
    product_id: item.product.id,
    item_type: 'simple'
  }
  return JSON.stringify(internalOrderInfo)
}

module.exports = (currency, cartItems = []) => {
  return cartItems
    .filter(({type, product}) => (type === 'product' && !!product))
    .map(item => {
      return {
        item_number: item.product.id,
        quantity: item.quantity,
        unit_amount: item.product.price.unit,
        name: item.product.name,
        currency,
        internal_order_info: getInternalOrderInfo(item)
      }
    })
}
