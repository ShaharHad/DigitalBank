const authService = require('../services/authService');

exports.register = async (req, res, next) => {
    try{
        const user = await authService.register(req.body);
        res.status(200).json({message: "User registered successfully"});
    }
    catch (err){ 
        next(err);
    }
}

exports.login = async (req, res, next) => {

    try{
        const respond = await authService.login(req.body.email, req.body.password);
        res.status(200).json(respond);
    }
    catch (err){ 
        next(err);
    }
}