#!/usr/bin/env node
const semver = require("semver"); // npm 版本检测
const chalk = require("chalk"); // 美化控制台样式
const package = require("../package.json");
const nodeVersion = package.engines.node; // 运行本应用所需的node版本
const packName = package.name;
const packVersion = package.version;
const curNodeVersion = process.version; // 当前系统的node版本
const enhanceErrorMessages = require('../lib/utils/enhanceErrorMessages'); // 自定义错误提示信息

/**
 * @description: 检测node版本
 * @param {Number} version 【版本号】
 * @param {String} name 【包名】
 * @return: {String}
 */
function checkNodeVersion(version, name) {
  if (!semver.satisfies(curNodeVersion, version)) {
    console.log(
      chalk.red(
        `你当前的Node版本号为：${curNodeVersion}，但 ${name} 需运行在 ${version} 以上版本。\n请升级您的Node版本`
      )
    );
    process.exit(1); //终止当前进程并返回给定的 code
  }
}
// 强制升级 node 版本
checkNodeVersion(nodeVersion, packName);
// 如果是 9.x 的版本则提示升级
if (semver.satisfies(curNodeVersion, "9.x")) {
  console.log(
    chalk.red(
      `你是用的Node版本是 ${curNodeVersion}。\n强烈建议你使用最新 LTS 版本`
    )
  );
}

// 开始处理命令
const program = require("commander"); // 处理控制台命令
const minimist = require("minimist"); // 命令行参数解析

program.version(packVersion).usage("<command> [options]");

// 创建命令
program
  .command("create <app-name>")
  .description("create a new project")
  .option(
    "-p, --preset <presetName>",
    "Skip prompts and use saved or remote preset"
  )
  .option("-d, --default", "Skip prompts and use default preset")
  .action((name, cmd) => {
    const options = cleanArgs(cmd); // 对 --preset ， --default配置处理
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          "\n ⚠️  检测到您输入了多个名称，将以第一个参数为项目名，舍弃后续参数哦"
        )
      );
    }
    require('../lib/create')(name, options);
  });

program.arguments("<command>").action(cmd => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
});

// 缺少参数的错误提示
enhanceErrorMessages('missingArgument', argName => {
  return `缺少必要参数 ${chalk.yellow(`<${argName}>`)}.`
})

// 调用
program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}
// 获取参数
function cleanArgs(cmd) {
  const args = {};
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ""));
    // 如果没有传递option或者有与之相同的命令，则不被拷贝
    if (typeof cmd[key] !== "function" && typeof cmd[key] !== "undefined") {
      args[key] = cmd[key];
    }
  });
  return args;
}
