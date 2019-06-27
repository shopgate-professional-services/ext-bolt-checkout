const ErrorMissingRefCartId = require('../errors/ErrorMissingRefCartId')

const extractCartIdFromMagentoCart = async (context, { magentoCart }) => {
  if (!magentoCart.entity_id) {
    throw new ErrorMissingRefCartId()
  }

  return { magentoCartId: magentoCart.entity_id }
}

module.exports = extractCartIdFromMagentoCart
