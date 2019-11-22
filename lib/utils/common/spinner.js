/*
 * @message: 控制 loading 动画
 * @Author: lzh
 * @since: 2019-11-21 18:12:03
 * @lastTime: 2019-11-21 18:13:31
 * @LastAuthor: lzh
 */
const ora = require("ora"); // 显示 loading 动画
const chalk = require("chalk");

const spinner = ora();
let lastMsg = null;

exports.logWithSpinner = (symbol, msg) => {
  if (!msg) {
    msg = symbol;
    symbol = chalk.green("✔");
  }
  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text
    });
  }
  spinner.text = " " + msg;
  lastMsg = {
    symbol: symbol + " ",
    text: msg
  };
  spinner.start();
};

exports.stopSpinner = persist => {
  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text
    });
  } else {
    spinner.stop();
  }
  lastMsg = null;
};

exports.pauseSpinner = () => {
  spinner.stop();
};

exports.resumeSpinner = () => {
  spinner.start();
};
