module.exports = async function (context) {
  return {
    internalCustomerId: context.meta.userId || null
  }
}
