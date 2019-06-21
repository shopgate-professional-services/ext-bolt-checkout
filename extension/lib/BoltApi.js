const crypto = require('crypto')

class BoltApi {
  /**
   * BoltApi Constructor
   * @param {PipelineContext} context Context object.
   */
  constructor (context) {
    this.host = context.config.boldApiBaseUrl
    this.request = context.tracedRequest('ShopgateProjectPhiCertificatesAPI')
    this.logger = context.log
    this.token = context.config.boldApiKey
    this.version = 'v1'
  }

  /**
   * Create api path
   * @param {string} pathname Pathname to api endpoint
   * @return {string}
   */
  makeUrl (pathname) {
    return `${this.host}${this.version}${pathname}`
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
    if (code < 200) {
      return true
    }

    if (code >= 300) {
      return true
    }

    return false
  }

  /**
   * Make call to server
   * @param {string} pathname Pathname to api endpoint
   * @param {string} method Request method
   * @param {Object} body Request body
   * @return {Promise<any>}
   */
  async callServer ({ pathname, method, body }) {
    return new Promise((resolve, reject) => {
      const params = {
        url: this.makeUrl(pathname),
        method,
        body,
        json: true,
        timeout: 5000,
        headers: {
          'Content-Length': JSON.stringify(body).length,
          'X-Api-Key': this.token,
          'X-Nonce': crypto.randomBytes(7).toString('hex')
        }
      }
      this.logger.debug(this.sanitizeForLogging(params), 'Calling BoltAPI')
      this.request(params, (err, res, body) => {
        if (err) {
          this.logger.error({
            body,
            httpCode: res.statusCode
          }, 'BoltAPI request error')
          return reject(err)
        }

        this.logger.debug(this.sanitizeForLogging(body), 'Received response from BoltAPI')

        if (this.isErroredCode(res.statusCode)) {
          this.logger.error({
            body,
            httpCode: res.statusCode
          }, 'Bolt request error')
          return reject(new Error(`Received error code from the API: ${res.statusCode}`))
        }

        return resolve(body)
      })
    })
  }

  async createOrderToken (cart) {
    return this.callServer({
      pathname: '/merchant/orders',
      method: 'POST',
      body: cart
    })
  }
}

module.exports = BoltApi
