/*
 * @message: 
 * @Author: lzh
 * @since: 2019-11-22 10:09:10
 * @lastTime: 2019-11-22 10:11:19
 * @LastAuthor: lzh
 */
const fs = require('fs-extra')

const remotePresetMap = {
  "vue-app": 'lizenghua/vue-tpl-h5',
  "vue-pc": 'lizenghua/vue-tpl-pc'
}

module.exports = async function (name, targetDir, clone) {
  const os = require('os')
  const path = require('path')
  const download = require('download-git-repo')
  const tmpdir = path.join(os.tmpdir(), 'awesome-test-cli')

  await fs.remove(tmpdir)

  await new Promise((resolve, reject) => {
    
    // 这里可以根据具体的模板地址设置下载的url，注意，如果是git，url后面的branch不能忽略
    download(remotePresetMap[name], tmpdir, { clone }, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })

  return {
    targetDir,
    tmpdir
  }
}