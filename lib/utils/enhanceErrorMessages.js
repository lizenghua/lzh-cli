/*
 * @message: 错误消息
 * @Author: lzh
 * @since: 2019-11-21 17:19:32
 * @lastTime: 2019-11-21 17:20:25
 * @LastAuthor: lzh
 */
const program = require('commander')
const chalk = require('chalk')

module.exports = (methodName, log) => {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return
    }
    this.outputHelp()
    console.log(`  ` + chalk.red(log(...args)))
    console.log()
    process.exit(1)
  }
}