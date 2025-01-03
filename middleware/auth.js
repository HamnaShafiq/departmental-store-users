const ThrowError = require('../utils/throwError');
const { sendErrorResponse } = require('../utils/response');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.headers['x-access-token']; 
   
    if (!token) {
        return res.status(404).json({
            success: false,
            msg: "Token is required"
        });
    }

    
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY); 
        req.user = decoded; 
        
        next(); 
    } catch (e) {
        console.log(e);
        return sendErrorResponse(res, e.message || 'Token is invalid or expired'); 
    }
}

module.exports = auth;
