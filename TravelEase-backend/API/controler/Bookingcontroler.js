const Booking = require('../models/booking');
const mongoose = require('mongoose');

const User = require('../models/registration');
const Package = require('../models/package');


mongoose.connect(
    'mongodb://localhost:27017'
).then(()=> {
    console.log('Booking Connected to database')
}).catch(()=>{
    console.log('Connection Failed! ')
});

const createBooking = async (req, res) => {
  const { userId, packageId, no_of_adults, no_of_child, no_of_people, bookingDate, status } = req.body;

  if (!userId || !packageId) {
    return res.status(400).json({ message: 'userId and packageId are required' });
  }

  try {
    const booking = new Booking({
      userId,
      packageId,
      no_of_adults,
      no_of_child,
      no_of_people,
      bookingDate,
      status
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: 'Booking validation failed', error: err });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId').populate('packageId');
    //console.log('Bookings fetched:', bookings);
    res.status(200).send(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).send(err);
  }
};

const getBookingsByUser = async (req, res) => {
  const userId = req.params.userid;
  try {
    const bookings = await Booking.find({ userId }).populate('packageId').populate('userId');
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching user bookings:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('userId').populate('packageId');
    //console.log('Booking fetched by ID:', booking);
    if (!booking) {
      return res.status(404).send('Booking not found');
    }
    res.status(200).send(booking);
  } catch (err) {
    console.error('Error fetching booking by ID:', err);
    res.status(500).send(err);
  }
};

const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) {
      return res.status(404).send('Booking not found');
    }
    res.status(200).send(booking);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if(!booking){
      return res.status(404).json({ error: 'Not Found' });
   }
   else{
       res.status(200).json({ message: 'Booking deleted successfully' });
   }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createBooking = createBooking;
exports.getBookings = getBookings;
exports.getBookingById = getBookingById;
exports.updateBooking = updateBooking;
exports.deleteBooking = deleteBooking;
exports.getBookingsByUser = getBookingsByUser;
