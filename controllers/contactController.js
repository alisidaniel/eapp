var {sendMail} = require('../helpers/mail');
var {APP_NAME} = require('../config/config');

const sendMessage = (req, res, next) =>{
    try{
        sendMail({
            receiver: req.body.email,
            subject: 'Web contact',
            text: req.body.message,
            html:  `<p>${req.body.name} Sent new message from ${APP_NAME} website.</p>`,
            });
        next();
    }catch(e){
        next(e);
    }
    
}

module.exports = {
    sendMessage
}