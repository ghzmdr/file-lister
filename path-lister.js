var fs = require('fs')


function listRecursive(path, list, avoid) {
    var files = fs.readdirSync(path)

    for (var fi = 0; fi < files.length; ++fi) { 
        if (avoid && files[fi].match(avoid))
            continue

        var relPath = path +'/'+ files[fi]
        var stat = fs.statSync(relPath)

        stat.isDirectory() ?
            listRecursive(relPath, list, avoid) :
            list.push(relPath)
    }
}

function stripPath(path, filename) {
    if (filename.indexOf(path) < 0)
        return filename

    return filename.substring(path.length, filename.length)
}

module.exports = function (root, destRoot, destFile, avoid, callback) {

    var fileList = []
    listRecursive(root, fileList, avoid)

    var fileListString = "module.exports = ["

    fileList.forEach(function (filename) {

        var stripped = stripPath(root, filename)
        filename = destRoot + stripped

        fileListString += '\n\t"' + filename + '",'
    })

    fileListString += '\n]'
    fs.writeFileSync(destFile, fileListString)

    if (callback) callback(fileList, fileListString)
}

