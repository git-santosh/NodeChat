/**
 * This will hold all of our password utilities. SCMP package will allow us to do constant time comparisons
 * 
 */

const crypto = require('crypto'), 
      scmp   = require('scmp'),
      buffer = require('safe-buffer').Buffer;
      config = require('../config/routes');
let cryptoPassword = (()=>{

let passwordCreate = (password, callback) => {
    crypto.randomBytes(config.crypto.randomSize,(err,salt) => {
        if(err) return callback(err,null);
        //console.log(`${salt.length} bytes of random data: ${salt.toString('hex')} \n password : \n`);
        crypto.pbkdf2(password,salt.toString('base64'),config.crypto.workFactor,config.crypto.keylen,'sha512',
        (err,derivedKey) =>{
            if(err) {
                return callback(err,null);
            }
            //console.log(`${salt.toString('base64')} , ${derivedKey.toString('base64')}`);
            callback({salt:salt.toString('base64'),key: derivedKey.toString('base64')});
        })
    })
}

let passwordCheck = (password,derivedPassword,salt,work, callback) => {
    var workFactor = (typeof(work) != "number")? parseInt(work) :work;
    //var salt = new Buffer(this.salt, 'base64');
    //return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
   crypto.pbkdf2(password, salt, workFactor, config.crypto.keylen,'sha512',(err, derivedKey) => {
       if(err){
           return callback(err,null);
       }
    const hash      = Buffer.from(derivedKey.toString('base64'), 'hex');
    const givenHash = Buffer.from(derivedPassword, 'hex');
     
        if (scmp(hash, givenHash)) {
        console.log('good hash');
        callback(null,true);
        } else {
        console.log('bad hash');
        callback(null, false);
        }
    });
}
return {
     passwordCreate:passwordCreate,
     passwordCheck:passwordCheck
}
})();
module.exports = cryptoPassword;