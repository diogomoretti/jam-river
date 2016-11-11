var Nightmare = require('nightmare')
var fs = require('fs')
var vo = require('vo')

if (!String.prototype.trim) {
  String.prototype.trim = () => {
    return this.replace(/^\s+|\s+$/g,'')
  }
}

vo(run)((err, result) => {
  if (err) throw err

  result.forEach(text => {
    console.log('text', text)
  })
})

function *run() {
  var nightmare = Nightmare()

  for (var i = 1080; i < 1081; i++) {
    console.log(`Buscando: ${i}`)
    yield nightmare
      .goto('http://www.jam-river.com/pearl-jam/en/audio/full-list.html')
      .click(`#box-table-a tr:nth-child(${i + 1}) td:first-child a`)
      .wait('.componentheading')
      .evaluate(() => {
        return {
          title: document.querySelector('.componentheading').textContent.trim(),
          content: document.querySelector('.ja-content-main').innerHTML
        }
      })
      .then(result => {
        console.log(`Salvando: ${result.title}`)
        fs.writeFileSync(`./audio/000${i + 1}_${result.title}.html`, result.content)
      })
      .catch(error => {
        console.error('Search failed:', error)
      })
  }

  yield nightmare.end()
}
