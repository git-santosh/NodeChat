let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let passwordAuth = require('../passport/password');
//var util   = require('../middleware/utilities');
let config = require('../config/routes');
let Schema = mongoose.Schema;
let enu = {
    values: ['Male','Female']
  , message: 'Gender is required.'
  }
let validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

let userModel =(()  =>{
   let _schema = new Schema({
        provider_id: String,    
        provider_name: String,
        provider: String,
        name :{type:String,lowercase:true},
        //userName : {type :String ,required:true ,unique:true,lowercase:true},
        password : {type:String},
        salt:String,
        work:String,
        email:{
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        photo:String, 
        gender:{type:String},
        admin:{type:Boolean , default:false},
        created_at: Date,
        updated_at: Date
    });
    _schema.pre('save',function (next){
        var user = this;
        console.log('pre save hit')
        var currentDate = new Date();
        // change the updated_at field to current date
        user.updated_at = currentDate;
        // if created_at doesn't exist, add to that field
        if (!user.created_at){
            user.created_at = currentDate;
        }
        if(!user.provider_id == user.provider_id != ""){
             passwordAuth.passwordCreate(user.password,function(callback){
            user.salt = callback.salt ;
            user.work = config.crypto.workFactor,
            user.password = callback.key;
            next();
        }); 
        }else{
            next();
        }
              
    }).post('save', function(doc) {
        console.log('%s has been saved', doc.provider_name);
      });

    let User = mongoose.model('User',_schema);

    return{
        userModel : User
    };
})();
// UserSchema.pre('save', function (next) {
//     if (this.password) {
//         this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
//         this.password = this.hashPassword(this.password);
//     }
//     next();
// });
// UserSchema.methods.hashPassword = function (password) {
//     return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
// };
// UserSchema.methods.authenticate = function (password) {
//     return this.password === this.hashPassword(password);
// };
module.exports = userModel;