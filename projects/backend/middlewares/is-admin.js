module.exports = (req,res,next)=>{
  if(req.user.isAdmin){
    next()
  }

  return res.json({
    success : false,
    error : 'not authorized'
});

}
