/*
 * @message: 终止命令输出code
 * @Author: lzh
 * @since: 2019-11-21 18:20:49
 * @lastTime: 2019-11-21 18:21:23
 * @LastAuthor: lzh
 */
exports.exit = function (code) {
    if (code > 0) {
      throw new Error(`Process exited with code ${code}`)
    }
  }