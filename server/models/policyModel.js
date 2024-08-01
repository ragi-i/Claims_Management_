const mongoose= require('mongoose');

const policy= new mongoose.Schema(
    {

    policyId: { 
        type: mongoose.Schema.Types.ObjectId,
            unique: true 
            },

    policyCategory: { 
        type: String,
         required: true
        },

    coverageAmount: { 
        type: Number, 
        required: true
     },

    premium: { 
        type: Number,
         required: true
         },
   
    userIds: [{ type: String, ref: "User" }],

    },
    {
        timestamps: true,
      }
)

policy.pre('save', function (next) {
    if (this.isNew) {
      this.policyId = this._id;
    }
    next();
  });

const Policy = mongoose.model('Policy',policy);
module.exports = Policy;