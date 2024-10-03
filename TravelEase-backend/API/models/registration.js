const mongoose = require ('mongoose');

const RegistrationSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    isAdmin:{type:Boolean,default:false}
});


RegistrationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

RegistrationSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('registration',RegistrationSchema);