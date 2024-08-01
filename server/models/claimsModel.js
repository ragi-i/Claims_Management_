const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    policyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Policy' },
    claimId: { type: mongoose.Schema.Types.ObjectId, unique: true },
    claimReason: { type: String, required: true },
    claimAmount: { type: Number, required: true },
    coverageAmount: { type: Number, required: true },
    policyCategory: { 
      type: String,
       required: true,
       ref:'Policy'
      },
    // remAmount: { type: Number },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    reqDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    // rejectionReason: { type: String },
  },
  { timestamps: true }
);

claimSchema.pre('save', function (next) {
  if (this.isNew) {
    // this.remAmount = this.coverageAmount;
    this.claimId = this._id;
  }
  next();
});

const Claim = mongoose.model('Claim', claimSchema);
module.exports = Claim;
