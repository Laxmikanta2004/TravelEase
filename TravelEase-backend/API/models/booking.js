const mongoose = require('mongoose');



const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registration',
    required: true
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'package',
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  },
  no_of_adults: {type:Number,required:true},
  no_of_child: {type:Number,required:true},
  no_of_people: {type:Number,required:true}
});

module.exports = mongoose.model('Booking', bookingSchema);
