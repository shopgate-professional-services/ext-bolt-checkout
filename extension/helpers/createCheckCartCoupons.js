module.exports = (currency, cartItems = []) => {
  const couponItems = cartItems.filter(({type, coupon}) => (type === 'coupon' && !!coupon))
  const externalCoupons = couponItems
    .filter(({ id }) => (typeof id === 'string' && id.startsWith('ex')))
    .map(({ coupon }, index) => ({
      code: coupon.code,
      amount: 0,
      amount_net: coupon.savedPrice.value,
      amount_gross: 0,
      tax_type: 'auto',
      currency,
      is_free_shipping: coupon.freeShipping,
      redeem_time: Math.floor(Date.now() / 1000),
      order_index: index
    }))
  const shopgateCoupons = couponItems
    .filter(({ id }) => (typeof id === 'string' && !id.startsWith('ex')))
    .map(({ coupon }, index) => ({
      code: coupon.code,
      name: 'Coupon',
      amount: coupon.savedPrice.value,
      is_free_shipping: coupon.freeShipping,
      order_index: index
    }))
  return { externalCoupons, shopgateCoupons }
}
