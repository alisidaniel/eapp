const db = require("../models");
const User = db.User;



const isAdmin = async (req, res, next) => {
    try{

        const user = await User.findOne

    }catch(e){
        return Error("An Error occured: "+e);
    }
}

module.exports = {
    isAdmin
}