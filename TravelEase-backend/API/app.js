const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
require('dotenv').config(); // Load environment variables from .env

const { check } = require('express-validator');
const mongooseItems = require('./controler/packagecontroler');
const categoryItems = require('./controler/Categorycontroler');
const registrationItems = require('./controler/Registrationcontroler');
const bookingItems = require('./controler/Bookingcontroler');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);




app.post('/package/add',mongooseItems.createPackage);
app.put('/package/:packageid',mongooseItems.updatePackage);
app.get('/package',mongooseItems.getPackage);
app.get('/package/:packageid',mongooseItems.getPackageById);

app.delete('/package/:packageid',mongooseItems.deletePackageById);

//------------------------------------------------------CATEGORY-------------------------------------------------------

app.post('/category/add',categoryItems.CreateCategory);
app.put('/category/:categoryId',categoryItems.updateCategory);
app.get('/category',categoryItems.getCategory);
app.get('/category/:categoryId',categoryItems.getCategoryById);
app.delete('/category/:categoryId',categoryItems.deleteCategoryById);

//-------------------------------------------------------USER----------------------------------------------


app.post('/registration/create', registrationItems.createAdmin);
app.post('/registration/add', registrationItems.registerUser);
app.post('/registration/login', registrationItems.loginUser);
app.put('/registration/:registrationId', registrationItems.updateUser);
app.get('/registration', registrationItems.getUsers);
app.get('/registration/:registrationId', registrationItems.getUserById);
app.delete('/registration/:registrationId', registrationItems.deleteUserById);
app.get('/registration/count', registrationItems.getUserCount);

//--------------------------------------------------------BOOKING---------------------------------------------------------

app.post('/bookings/add', bookingItems.createBooking);
app.get('/bookings', bookingItems.getBookings);
app.get('/bookings/user/:userid', bookingItems.getBookingsByUser);
app.put('/bookings/:id', bookingItems.updateBooking);
app.delete('/bookings/:id', bookingItems.deleteBooking);







app.listen(3000);