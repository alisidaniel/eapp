

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  try{

    if (req.session.user && req.cookies.user_sid) {
        next();
    } else {
        return res.redirect('/index')
    }  

  }catch(e){
      throw new Error ("Session Error: "+e);
  }

};

module.exports = { sessionChecker }