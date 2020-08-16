

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

const checkoutSession = (req, res, next) => {
  try{

    if (req.session.user && req.cookies.user_sid) {
      next();
  } else {
      return res.redirect('/login');
  }  

  }catch(e){
    throw new Error ("Checkout session Error"+e);
  }
}

const isAdmin = (req, res, next) => {
  try{

    if (req.session.user && req.cookies.user_sid) {
       
        if (req.session.user.isAdmin == true){
          next();
        }else{
          return res.redirect('/login');
        }
    } else {
      return res.redirect('/login');
    }  

  }catch(e){
    throw new Error("Something happened.. "+e)
  }
}

module.exports = { sessionChecker, checkoutSession, isAdmin }