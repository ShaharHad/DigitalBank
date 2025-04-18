const authService = require('../services/authService');

exports.register = async (req, res, next) => {
    try{
        const {name, email, password, phone} = req.body;
        const user = await authService.register(name, email, password, phone);
        return res.status(201).json({message: "User registered successfully"});
    }
    catch (err){ 
        next(err);
    }
}

exports.login = async (req, res, next) => {

    try{
        const respond = await authService.login(req.body.email, req.body.password);
        return res.status(200).json(respond);
    }
    catch (err){ 
        next(err);
    }
}