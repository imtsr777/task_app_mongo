import mongoose from 'mongoose'

async function main(req,res,next) {
  try{
       await mongoose.connect('mongodb://localhost:27017/test');
       return next()
  }
  catch(err){
      console.log(err.message)
      return next(err)
  }
}


export default {
    main
}