var bcrypt = require('bcrypt');
var _ = require('lodash');


const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;


const register = async (req, res, next) => {
    try{
        
        let {email} = req.body;

        if (!req.body) return res.status(400).send({
          message: "Request body can't be empty!",
          status: false
        });
        
        let userExist = await User.count({
          where: {
            email: {
              [Op.eq]: email
            }
          }
        });
      
        if (userExist > 0) return res.status(400).json({
          message: "User account exist.", 
          status:false
        });
      
        let user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));

        user.password = await bcrypt.hash(user.password, 12);

        await user.save();

        return res.json({user});

    }catch(e){
        next(e);
    }
}

const login = async (req, res, next) => {
    try{

      let {email, password} = req.body;

      if (Object.keys(req.body).length === 0) return res.status(400).json({
        message: "Empty request object.",
        status: false
      });

      let user = await User.findOne({where: {email: email}});
    
      if (user == null) return res.status(400).json({
        message: 'Invalid email or password.',
        status: false
      });

      const isValidPwd = await bcrypt.compare(password, user.dataValues.password);
   
      if (!isValidPwd) return res.status(400).json({
        message: 'Invalid email or password.',
        success: false
      });

      return res.status(200).json({user});

    }catch(e){
      next(e);
    }
}

const edit = (req, res, next) => {

}

const passwordReset = (req, res, next) => {
    
}

module.exports = {

    register, login, edit, passwordReset
}
