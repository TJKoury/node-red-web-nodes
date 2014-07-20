fs = require('fs');


fs.createReadStream('./browserify/wizard_hat_blue.png')
.pipe(fs.createWriteStream('../../public/icons/wizard_hat_blue.png'));
