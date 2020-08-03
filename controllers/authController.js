const bcrypt = require('bcrypt');
const _ = require('lodash');


const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;


const register = async (req, res, next) => {
    try{
        console.log(req.body)
        let {email, password} = req.body;

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
      
        let user = new User(_.pick(req.body, ['username', 'email', 'password']));

        user.password = await bcrypt.hash(password, bcrypt.genSaltSync(12));

        await user.save();

        const token = await user.generateAuthToken();
    
        res.header("x-auth-token", token).send(user);

    }catch(e){
         throw Error(e);
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
        message: 'User does not exist.',
        status: false
      });

      const isValidPwd = bcrypt.compareSync(password, user.dataValues.password);
    
      if (!isValidPwd) return res.status(400).json({
        message: 'Invalid email or password.',
        success: false
      });

      const token = await user.generateAuthToken();
      
      return res.header('x-access-token', token).render('home', {data: user});

    }catch(e){
      next(e);
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
