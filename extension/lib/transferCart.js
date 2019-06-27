const BoltApi = require('../utilities/BoltApi')
/**
 * @param {PipelineContext} context Pipeline context
 * @param {Object} cart Cart object
 * @returns {Promise<Object>}
 */
module.exports = async (context, { cart }) => {
  if (!cart) {
    return { cartToken: null }
  }

  const api = new BoltApi(context)
  const response = await api.createOrderToken({ cart })
  const { token: cartToken } = response || {}
  return { cartToken }
}
