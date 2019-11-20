#!/usr/bin/env node
// 使用 Node 开发命令行工具所执行的 JS 脚本必须在顶部加入 `#!/usr/bin/env node` 声明

const program = require('commander');
const download = require('download-git-repo')
const inquirer = require('inquirer')
const handlebars = require('handlebars')
const fs = require('fs')
const ora = require('ora')
const spinner = ora('正在下载模板...')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const templates = {
    'tpl-h5': {
        url: 'https://github.com/lizenghua/vue-tpl-h5',
        downloadUrl: 'https://github.com:lizenghua/vue-tpl-h5#master',
        description: 'H5模板'
    },
    'tpl-pc': {
        url: 'https://github.com/lizenghua/vue-tpl-pc',
        downloadUrl: 'https://github.com:lizenghua/vue-tpl-pc#master',
        description: 'PC模板'
    }
}

// console.log(process.argv); // 原生的方式，比较麻烦
program
    .version(require('./package').version)

program
    .command('init <template-name> <project-name>')
    .description('初始化项目模板')
    .option("-s, --setup_mode [mode]", "Which setup mode to use")
    .action((templateName, projectName) => {
        // 下载之前 loading 提示
        spinner.start()
        // 根据模板名下载对应的模板到本地并起名为 projectName
        // params1: 仓库地址
        // params2: 下载路径
        const { downloadUrl } = templates[templateName]
        download(downloadUrl, projectName, { clone: true}, err => {
            if(err){
                spinner.fail() //下载失败
                console.log(logSymbols.error, chalk.red(err))
                return ;
            }
            spinner.succeed() //下载成功
            // 把项目下的 package.json 文件读取处理
            // 使用向导的方式采集用户输入的值
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: '请输入项目名称'
                },
                {
                    type: 'input',
                    name: 'description',
                    message: '请输入项目简介'
                },
                {
                    type: 'input',
                    name: 'author',
                    message: '请输入作者名称'
                }
            ]).then( (answers) => {
                // 使用模板引擎把用户输入的数据解析到 package.json 文件中
                const packagePath = `./${projectName}/package.json`
                const packageContent = fs.readFileSync(packagePath, 'utf8')
                const packageResult = handlebars.compile(packageContent)(answers)
                // 解析完毕，把解析之后的结果重新写入 package.json 文件中
                fs.writeFileSync(packagePath, packageResult)
                console.log(logSymbols.success, chalk.yellow("初始化模板成功"))
            })
        })
    })

program
    .command('list')
    .description('查看所有可用模板')
    .action(() => {
        for(let key in templates){
            console.log(`${key}  ${templates[key].description}`);
        }
    })

// 解析命令行参数
program.parse(process.argv);