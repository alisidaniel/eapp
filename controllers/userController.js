const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;


const register = async (req, res, next) => {
    try{
         console.log(req.body);
         let {email} = req.body;

        if (!req.body) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
          }

        const userExist = await User.findOne({email:email});
        if (userExist) return res.status(400).json({message: "User account exist.", status:false});

        const user = await User.create({...req.body});

        return res.json(user);

    }catch(e){
        next(e);
    }
}

const login = (req, res, next) => {


}

const edit = (req, res, next) => {

}

const passwordReset = (req, res, next) => {
    
}

module.exports = {

    register, login, edit, passwordReset
}
