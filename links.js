const fs = require('fs')
const testFolder = './video/'

var fileContent = '';

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
  	if (file !== 'index.html') {
	    file = file.split('.')
	    fileContent += `<div class="show-item" data-url="${file[0]}.${file[1]}"><div class="show-item__title">${file[0]}</div><div class="show-item__content"></div></div>\n`
	    fs.writeFileSync(`./links.txt`, fileContent)
	}
  })
})