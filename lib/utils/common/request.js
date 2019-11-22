/*
 * @message: 
 * @Author: lzh
 * @since: 2019-11-22 09:58:25
 * @lastTime: 2019-11-22 09:58:29
 * @LastAuthor: lzh
 */
exports.request = {
    get (uri) {
      // lazy require
      const request = require('request-promise-native')
      const reqOpts = {
        method: 'GET',
        timeout: 30000,
        resolveWithFullResponse: true,
        json: true,
        uri
      }
  
      return request(reqOpts)
    }
  }