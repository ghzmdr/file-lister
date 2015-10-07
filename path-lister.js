var fs = require('fs')
var walk = require('walk')

module.exports = function (root, destRoot, destFile, callback) {
    if (!destRoot)
        destRoot = root

    var fileList = []

    walk.walkSync(root, {listeners:{

        file: function (r, stat, next) {
            fileList.push(destRoot + '/' + stat.name)
            next()
        }}

    })

    var fileListString = "module.exports = ["

    fileList.forEach(function (filename) {
        fileListString += '\n\t"' + filename + '",'
    })

    fileListString += '\n]'
    fs.writeFileSync(destFile, fileListString)

    if (callback) callback(fileList, fileListString)
}