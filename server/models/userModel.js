const mongoose = require('mongoose');

const user= new mongoose.Schema(
{
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        unique:true
        },

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

    contact:{
        type: Number,
        required: [true,"Please provide your contact no."]
    },
    selectedPolicies: [{ type: String, ref: "Policy" }],
    selectedClaims: [{ type: String, ref: "Claim" }],
},
{
    timestamps: true,
  }
)

user.pre('save', function (next) {
    if (this.isNew) {
      this.userId = this._id;
    }
    next();
  });
const User=mongoose.model('User',user)
module.exports= User;