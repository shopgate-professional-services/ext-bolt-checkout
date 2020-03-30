class ErrorMissingMagentoTwoInternalCartInfo extends Error {
  constructor (...args) {
    super(...args)
    this.message = 'There has been a problem generating an order id. Please try again later.'
    this.code = 'EUNKNOWN'
  }
}

module.exports = ErrorMissingMagentoTwoInternalCartInfo
