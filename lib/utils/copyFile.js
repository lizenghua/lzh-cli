/*
 * @message: 
 * @Author: lzh
 * @since: 2019-11-22 10:16:15
 * @lastTime: 2019-11-22 10:16:25
 * @LastAuthor: lzh
 */
const fs = require('fs-extra')
const path = require('path')

module.exports = async function copyFile (temp, target) {
  await fs.copy(temp, target)
  await fs.remove(path.resolve(target, './.git'))
  const pkgJson = await fs.readJson(target+'/package.json')
  return pkgJson
}