/**
 * Converts a transaction into a webcheckout order object
 * @param {Object} transaction transaction obj from bolt
 * @param {Object} products cartItems products from our cart
 * @returns {Object}
 */
export const formatTransaction = (transaction, products) => ({
  order: {
    number: transaction.id,
    currency: transaction.amount.currency,
    totals:
        [
          {
            type: 'shipping',
            amount: transaction.shipping_option.value.cost.amount / 100,
          },
          {
            type: 'grandTotal',
            amount: transaction.amount.amount / 100,
          },
        ],
    products: products.map(({ product, quantity }) => ({
      id: product.id,
      name: product.name,
      quantity,
      price: {
        net: product.price.special || product.price.unit,
        withTax: product.price.special || product.price.unit,
      },
    })),
  },
});
