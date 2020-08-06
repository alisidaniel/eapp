const db = require("../models");
const User = db.User;


const account = async (req, res, next) => {
    try{
        // let user = await User.findByPk(req.user.id);
        res.render('account', {data: req.session.user});
 
    }catch(e){
        res.render('login');
    }
}

const updateRecord = async (req, res, next) => {
    try{
        let { id } = req.session.user;
        
        let user = await User.update({...req.body}, {
            where: {
                id: id
            }
        });
        req.flash('info', 'Welcome');
        res.redirect('/profile');
    }catch(e){
        throw new Error("Error occured: "+e);
    }
}

module.exports = { account, updateRecord }