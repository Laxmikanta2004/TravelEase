const mongoose = require('mongoose');
//const category = require('./category')

const PackageSchema = new mongoose.Schema({
    name:{type: String, required: true},
    from_date:{type:Date,required:true},
    to_date:{type:Date, required:true},
    description:{type:String, required: true},
    price:{type:Number,required:true},
    short_description:{type:String, required:true},
    image:{type:String,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:'category'}
});

module.exports = mongoose.model('package',PackageSchema);