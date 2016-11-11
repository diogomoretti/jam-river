const fs = require('fs')
const testFolder = './video/'

var fileContent = '';

function RemoveAccents(strAccents) {
	var strAccents = strAccents.split('');
	var strAccentsOut = new Array();
	var strAccentsLen = strAccents.length;
	var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
	var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
	for (var y = 0; y < strAccentsLen; y++) {
		if (accents.indexOf(strAccents[y]) != -1) {
			strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
		} else
			strAccentsOut[y] = strAccents[y];
	}
	strAccentsOut = strAccentsOut.join('');
	return strAccentsOut;
}

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
  	if (file !== 'index.html') {
	    file = file.split('.html')

	    let tempName = RemoveAccents(file[0])

	    fs.rename(`${testFolder}${file[0]}.html`, `${testFolder}${tempName}.html`, function(err) {
    		if ( err ) console.log('ERROR: ' + err)
		})

	    fileContent += `<div class="show-item" data-url="${tempName}.html"><div class="show-item__title">${file[0]}</div><div class="show-item__content"></div></div>\n`
	    fs.writeFileSync(`./links.txt`, fileContent)
	}
  })
})