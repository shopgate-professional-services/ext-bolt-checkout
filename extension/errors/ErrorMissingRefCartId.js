class ErrorMissingRefCartId extends Error {
  constructor (...args) {
    super(...args)
    this.message = 'Could not get reference cart id from shop system'
    this.code = 'EUNKNOWN'
  }
}

module.exports = ErrorMissingRefCartId
