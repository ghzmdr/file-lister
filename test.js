var lister = require('./')

lister('.', '.', 'test-results.js', /\.DS_Store/, logFiles)

function logFiles (list, string) {
    console.log(list)
    console.log(string)
}