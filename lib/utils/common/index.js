/*
 * @message: 统一出口
 * @Author: lzh
 * @since: 2019-11-21 18:11:54
 * @lastTime: 2019-11-22 10:04:37
 * @LastAuthor: lzh
 */
["exit", "logger", "spinner", "request", "env"].forEach(m => {
  Object.assign(exports, require(`./${m}`));
});
