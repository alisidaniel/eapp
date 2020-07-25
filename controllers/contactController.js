

const sendMessage = (req, res, next) =>{
    try{
        console.log("got here");
    }catch(e){
        next(e);
    }
    
}

module.exports = {
    sendMessage
}