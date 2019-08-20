const crypto = require('crypto')

class PluginApi {
  constructor (context) {
    this.host = context.config.shopgatePluginUrl
    this.request = context.tracedRequest('ShopgateProjectShopgatePluginAPI')
    this.logger = context.log
    this.customerNumber = context.config.shopgateCustomerNumber
    this.shopNumber = context.config.shopgateShopNumber
    this.apiKey = context.config.shopgateApiKey
    this.hash = crypto.createHash('sha1')
  }

  haveInformationForRequest () {
    return this.host && this.shopNumber && this.apiKey && this.customerNumber
  }

  makeAuthTokens () {
    const timeStamp = Math.floor(Date.now() / 1000)
    const authUser = `${this.customerNumber}-${timeStamp}`
    const tokenData = `SPA-${authUser}-${this.apiKey}`
    this.hash.update(tokenData)
    const token = this.hash.digest('hex')
    return { authUser, token }
  }

  /**
   * Sanitizes params for use in logging
   * @param {*} params Params to be logged
   * @return {*|{}}
   */
  sanitizeForLogging (params) {
    let sanitizedForLoggingBody = params
    if (typeof params === 'object') {
      sanitizedForLoggingBody = { ...params }
      for (let key in sanitizedForLoggingBody) {
        if (typeof sanitizedForLoggingBody[key] === 'string') {
          sanitizedForLoggingBody[key] = sanitizedForLoggingBody[key].slice(0, 60)
        }
        if (typeof sanitizedForLoggingBody[key] === 'object') {
          sanitizedForLoggingBody[key] = this.sanitizeForLogging(sanitizedForLoggingBody[key])
        }
      }
    }

    return sanitizedForLoggingBody
  }

  /**
   * Evaluate response code for error
   * @param {number} code Response code
   * @return {boolean}
   */
  isErroredCode (code) {
    if (code < 200 || code >= 300) {
      return true
    }

    if (code >= 300) {
      return true
    }

    return false
  }

  async call (form) {
    if (!this.haveInformationForRequest()) {
      throw new Error('Cannot make plugin api call because config is missing connection information')
    }
    return new Promise((resolve, reject) => {
      const { authUser, token } = this.makeAuthTokens()
      const params = {
        url: this.host,
        method: 'post',
        form,
        json: true,
        headers: {
          'cache-control': 'no-cache',
          'X-Shopgate-Auth-Token': token,
          'X-Shopgate-Auth-User': authUser
        }
      }
      this.logger.debug(this.sanitizeForLogging(params), 'Calling PluginApi')
      this.request(params, (err, res, body) => {
        if (err) {
          this.logger.error({
            body,
            httpCode: res.statusCode
          }, 'PluginAPI request error')
          return reject(err)
        }

        this.logger.debug(this.sanitizeForLogging(body), 'Received response from PluginAPI')

        if (this.isErroredCode(res.statusCode)) {
          this.logger.error({
            body,
            httpCode: res.statusCode
          }, 'Plugin request error')
          return reject(new Error(`Received error code from the PluginAPI: ${res.statusCode}`))
        }

        return resolve(body)
      })
    })
  }

  async pingApi () {
    const form = {
      action: 'ping',
      shop_number: this.shopNumber,
      trace_id: 'sma-9412'
    }
    return this.call(form)
  }

  async checkCart (cart) {
    const form = {
      action: 'check_cart',
      shop_number: this.shopNumber,
      trace_id: 'sma-2149',
      cart
    }
    return this.call(form)
  }
}

module.exports = PluginApi
