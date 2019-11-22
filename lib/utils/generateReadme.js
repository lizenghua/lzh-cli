/*
 * @message: 
 * @Author: lzh
 * @since: 2019-11-22 10:21:41
 * @lastTime: 2019-11-22 10:21:53
 * @LastAuthor: lzh
 */
const descriptions = {
    start: '启动项目',
    build: '打包生成线上项目',
  }
  
  function printScripts (pkg, packageManager) {
    return Object.keys(pkg.scripts || {}).map(key => {
      if (!descriptions[key]) return ''
      return [
        `\n### ${descriptions[key]}`,
        '```',
        `${packageManager} run ${key}`,
        '```',
        ''
      ].join('\n')
    }).join('')
  }
  
  module.exports = function generateReadme (pkg, packageManager) {
    return [
      `# ${pkg.name}\n`,
      '## Project setup',
      '```',
      `${packageManager} install`,
      '```',
      printScripts(pkg, packageManager),
      '### Customize configuration',
      ''
    ].join('\n')
  }
  