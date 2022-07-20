const path = require('path')
const copyDir = require('./copy')
const resolve = function (src) {
  return path.resolve(path.join(__dirname, '../', src))
}
copyDir(resolve('/node_modules/youibot-plus/theme-chalk/src/fonts'), resolve('/dist/assets/fonts'))
