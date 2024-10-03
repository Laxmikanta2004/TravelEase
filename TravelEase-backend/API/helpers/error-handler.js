function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        // authentication error
        return res.status(401).json({message: "The user is not authorized",error:err.message
        })
    }

    if (err.name === 'ValidationError') {
        //  validation error
        return res.status(401).json({message: err})
    }

    // default server error
    return res.status(500).json({message: "Internal Server Error", error: err.message});
}

module.exports = errorHandler;