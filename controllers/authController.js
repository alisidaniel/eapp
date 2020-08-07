const bcrypt = require('bcrypt');
const _ = require('lodash');


const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;


const register = async (req, res, next) => {
    try{
 
        let {email, password} = req.body;

        let userExist = await User.count({
          where: {
            email: {
              [Op.eq]: email
            }
          }
        });
      
        if (userExist > 0) return res.render('register', {message: "User account exist"});
      
        let user = new User(_.pick(req.body, ['username', 'email', 'password']));

        user.password = await bcrypt.hash(password, bcrypt.genSaltSync(12));

        await user.save();
        
        req.session.user = user.dataValues;

        res.redirect('/account');

    }catch(e){
       return res.render('register', {message: e});
    }
}

const login = async (req, res, next) => {

    try{

      let {email, password} = req.body;

      let user = await User.findOne({where: {email: email}});
    
      if (user == null) return res.render('login', {message: "User does't exist."});

      const isValidPwd = bcrypt.compareSync(password, user.dataValues.password);
    
      if (!isValidPwd) return res.render('login', {message: "Invalid email or password"});

      req.session.user = user.dataValues;

       res.redirect('/account');

    }catch(e){
      return res.render('login', {message: e});
    }
}

const edit = async (req, res, next) => {
  try{
    let {firstName, lastName, phone} = req.body;
    const user = await User.update({
      firstName: firstName, lastName: lastName, phone: phone
    },{ where: {id: id}});

  }catch(e){
    next(e);
  }
}

const passwordReset = (req, res, next) => {
    
}

module.exports = {

    register, login, edit, passwordReset
}
