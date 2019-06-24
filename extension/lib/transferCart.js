/**
 * @param {PipelineContext} context
 * @param {Object} input
 * @returns {Promise<Object>}
 */
module.exports = async function (context, input) {

  console.warn(JSON.stringify(input.cart));

  // TODO: request bolt API

  return {
    cartToken: '1234'
  }
}
