const mongoose = require('mongoose');

const admin= new mongoose.Schema(
{
    fullname :{
        type:String,
        require: true,

    },
    email:{
        type: String,
         required: [true,"email is required"],
        unique:true
     },
     
     password:{
       type: String,
       required: [true, "Please provide a password"],
     },

},
    {
        timestamps: true,
      }


)
const Admin=mongoose.model('Admin',admin)
module.exports= Admin;