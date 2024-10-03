const { expressjwt: expressJwt } = require('express-jwt');
const config = require('../config');
require('dotenv').config();

function authJwt() {
    const secret = process.env.secret_key;
    if (!secret) {
        throw new Error('JWT secret is not defined in environment variables');
    }
    return expressJwt({
        secret,
        algorithms: ['HS256'],
       //isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/package(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/category(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/package(.*)/, methods: ['POST', 'OPTIONS'] },
            '/registration/login',
            '/registration/add',
        ]
    });
}

function isRevoked(req, payload) {
    console.log('Payload:', payload);
    console.log('UserId:', payload.userId);
    console.log('isAdmin:', payload.isAdmin);

    if (!payload.isAdmin) return true; // Token is revoked if the user is not admin
    return false;
}


module.exports = authJwt;
