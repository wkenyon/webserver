var fs = require('fs');
var bcrypt = require('bcrypt');
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(process.argv[2], salt, function(err, hash) {
        fs.writeFile('htpasswd', hash, function (err) {
            if (err) throw err;
            console.log('bcrypt hashed password saved in htpasswd');
        });
    });
});
