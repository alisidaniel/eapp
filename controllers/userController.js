const db = require("../models");
const User = db.User;


const account = async (req, res, next) => {
    try{
        let user = await User.findByPk(req.user.id).select('-password');
        console.log(user);
        return res.render('account', {data: user});
    }catch(e){
        next(e);
    }
}

module.exports = {
    account
}