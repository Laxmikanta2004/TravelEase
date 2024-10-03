const mongoose = require('mongoose');
const User = require('../models/registration');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

mongoose.connect(
    'mongodb://localhost:27017'
).then(() => {
    console.log('User Connected to database')
}).catch(() => {
    console.log('Connection Failed!')
});

//----------------------------------------------------------------------------------------------------------
const getUsers = async (req, res) => {
    const userList = await User.find().select('-password');

    if (!userList) {
        return res.status(500).json({ success: false });
    }
    res.send(userList);
};
//----------------------------------------------------------------------------------------------------------
const getUserById = async (req, res) => {
    const id = req.params.registrationId;

    const user = await User.findById(id)

    if (!user) {
        return res.status(500).json({ message: 'The user with the given ID was not found.' });
    }
    res.status(200).send(user);
};
//----------------------------------------------------------------------------------------------------------
const createAdmin = async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin,
    });
    user = await user.save();

    if (!user)
        return res.status(400).send('The user cannot be created!');

    res.send(user);
};
//----------------------------------------------------------------------------------------------------------
const updateUser = async (req, res) => {
    const userId = req.params.registrationId;
    
    const userExist = await User.findById(userId);

    if (!userExist) {
        //console.log(User)
        return res.status(404).send('User not found');
    }

    let newPassword;
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
        newPassword = userExist.password;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name: req.body.name,
                email: req.body.email,
                password: newPassword,
                isAdmin: req.body.isAdmin,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).send('The user cannot be updated!');
        }

        res.send(updatedUser);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

const loginUser = async (req, res) => {
    const secret = process.env.secret_key;
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: 'Invalid email address' });

        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                secret,
                { expiresIn: '1w' }
            );
            res.status(200).json({ user: user.email, token });
        } else {
            res.status(400).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occurred during login.' });
    }
};
//----------------------------------------------------------------------------------------------------------
const registerUser = async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin,
    });
    user = await user.save();

    if (!user)
        return res.status(400).send('The user cannot be created!');

    res.send(user);
};
//----------------------------------------------------------------------------------------------------------
const deleteUserById = async (req, res) => {
    User.findByIdAndDelete(req.params.registrationId).then(user => {
        if (user) {
            return res.status(200).json({ success: true, message: 'The user is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    });
};
//----------------------------------------------------------------------------------------------------------
const getUserCount = async (req, res) => {
    const userCount = await User.countDocuments((count) => count);

    if (!userCount) {
        return res.status(500).json({ success: false });
    }
    res.send({
        userCount: userCount
    });
};
//----------------------------------------------------------------------------------------------------------

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createAdmin = createAdmin;
exports.updateUser = updateUser;
exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.deleteUserById = deleteUserById;
exports.getUserCount = getUserCount;