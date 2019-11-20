#!/usr/bin/env node
// 使用 Node 开发命令行工具所执行的 JS 脚本必须在顶部加入 `#!/usr/bin/env node` 声明

const program = require('commander');
const templates = {
    "tpl-h5": {
        url: "https://github.com/lizenghua/vue-tpl-h5",
        description: "H5模板"
    },
    "tpl-pc": {
        url: "https://github.com/lizenghua/vue-tpl-pc",
        description: "PC模板"
    }
}

// 1. 获取用户输入的命令
// console.log(process.argv); // 原生的方式，比较麻烦
program
    .version(require('./package').version)

program
    .command('init <template-name> <project-name>')
    .description('初始化项目模板')
    .option("-s, --setup_mode [mode]", "Which setup mode to use")
    .action((templateName, projectName) => {
        // 根据模板名下载对应的模板到本地并起名为 projectName
        console.log(templateName);
        console.log(projectName);
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

// 2. 根据不同的命令执行不同的功能操作