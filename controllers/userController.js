const db = require("../models");
const User = db.User;


const account = async (req, res, next) => {
    try{
        // let user = await User.findByPk(req.user.id);
        // console.log();
        res.render('account', {data: req.session.user});
 
    }catch(e){
        res.render('login');
    }
}

module.exports = {
    account
}