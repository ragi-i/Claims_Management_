const Policy = require('../models/policyModel');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const Claim = require('../models/claimsModel');

const claimPolicy = async (req, res) => {
   console.log("reqbody;" , req.body);
  const { userId, policyId, claimReason, claimAmount, coverageAmount,policyCategory, status, reason} = req.body;
 

  try {
    if (!userId || !policyId || !claimReason || !claimAmount) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (claimAmount <= 0) {
      return res.status(400).json({ message: "Invalid claim amount." });
    }

    const user = await User.findById(userId);
    const policy = await Policy.findById(policyId);

    if (!user || !policy) {
      return res.status(404).json({ message: "User or Policy not found." });
    }

    if (claimAmount > policy.coverageAmount) {
      return res.status(400).json({ message: "Claim amount exceeds policy coverage amount." });
    }

    // if (claimAmount > policy.remAmount) {
    //   return res.status(400).json({ message: "Claim amount exceeds remaining coverage amount." });
    // }

    // const remAmount = policy.remAmount - claimAmount;
    
    const newClaim = new Claim({
      userId,
      policyId,
      coverageAmount,
      claimReason,
      claimAmount,
      policyCategory,
      status,
      reason,
    });
 console.log("claim:",newClaim);
    await newClaim.save();

    user.selectedClaims.push(newClaim._id);
    await user.save();
    res.status(201).json({
      message: "Claim created successfully.",
      claimDetails: newClaim,
    });

  } catch (error) {
    console.error("Error creating claim:", error);
    res.status(500).json({ message: "Failed to create claim.", error: error.message });
  }
}


const getPendingClaims = async (req, res) => {
  try {
    const pendingClaims = await Claim.find({ status: "Pending" });

    if (pendingClaims.length === 0) {
      return res.status(404).json({ message: "No Pending Claims Found" });
    }

    const detailedPendingClaims = [];

    for (const claim of pendingClaims) {
      const user = await User.findOne({ userId: claim.userId });
      if (!user) {
        // Skip if no user found for the claim
        continue;
      }

      const policy = await Policy.findOne({ policyId: claim.policyId });
      if (!policy) {
        // Skip if no policy found for the claim
        continue;
      }

      const detailedClaim = {
        claimId: claim.claimId,
        status: claim.status,
        requestDate: claim.reqDate,
        claimDetails: {
          claimReason: claim.claimReason,
          claimAmount: claim.claimAmount,
        },
        user: {
          userId: user.userId,
          userName: user.fullname,
          userEmail: user.email,
        },
        policy: {
          policyId: policy.policyId,
          category: policy.policyCategory,
          coverageAmount: policy.coverageAmount,
          premium: policy.premium,
        },
      };

      detailedPendingClaims.push(detailedClaim);
    }

    res.status(200).json(detailedPendingClaims);

  } catch (error) {
    console.error("Error getting pending claims:", error);
    if (!res.headersSent) {
      // Check if headers have already been sent before sending a response
      res.status(500).json({ message: "Failed to get pending claims.", error: error.message });
    }
  }
};



const getApprovedClaims = async (req,res) =>{

   try {
    const approvedClaim = await Claim.find({status:"Approved"});

    if(approvedClaim.length==0)return res.status(404).send({message: "no approved claims found"});
    
      
    const detailedAcceptedClaims = [];

    for (const claim of approvedClaim) {
      const user = await User.findOne({ userId: claim.userId });
      if (!user) {
        continue;
      }

      const policy = await Policy.findOne({ policyId: claim.policyId });
      if (!policy) {
        continue; 
      }

      const detailedClaim = {
        claimId: claim.claimId,
        status: claim.status,
        requestDate: claim.reqDate,
        claimDetails: {
          // claimReason: claim.claimReason,
          claimAmount: claim.claimAmount,
        },
        user: {
          userId: user.userId,
          userName: user.fullname,
          userEmail: user.email,
        },
        policy: {
          policyId: policy.policyId,
          category: policy.policyCategory,
          coverageAmount: policy.coverageAmount,
          premium: policy.premium,
        },
      };

      detailedAcceptedClaims.push(detailedClaim);
    }
    res.status(200).json(detailedAcceptedClaims);
    
   } catch (error) {
    console.error("Error getting approved claims:", error);
    res.status(500).json({
      message: "Failed to get approved claims.",
      error: error.message,
    });
    
   }

}

const getrejectedClaims = async(req,res) =>{
    try {
        const rejectedClaims = await Claim.find({ status: "Rejected" });

        if (rejectedClaims.length === 0) {
          return res.status(404).json({ message: "No rejected claims found." });
        }
    
        res.json(rejectedClaims);
    } catch (error) {
        console.error("Error fetching rejected claims:", error);
        res.status(500).json({
          message: "Failed to fetch rejected claims",
          error: error.message,
        });
    }
}

// Approve Claim
const approveClaim = async (req, res) => {
  try {
    const { claimId } = req.body; 

    const claim = await Claim.findOne({ claimId });

    if (!claim || claim.status !== "Pending") {
      return res.status(404).json({ message: "Claim not found or not pending." });
    }

    claim.status = "Approved";
    await claim.save();

    res.status(200).json({
      message: "Claim approved successfully.",
      claim,
    });
  } catch (error) {
    console.error("Error approving claim:", error);
    res.status(500).json({ message: "Failed to approve claim.", error: error.message });
  }
};

// Reject Claim
const rejectClaim = async (req, res) => {
  try {
    const { claimId} = req.body; 
    console.log("claimId:",claimId);

    const claim = await Claim.findOne({ claimId });

    if (!claim || claim.status !== "Pending") {
      return res.status(404).json({ message: "Claim not found or not pending." });
    }

    claim.status = "Rejected";
    // claim.rejectionReason = rejectionReason;
    await claim.save();

    res.status(200).json({
      message: "Claim rejected successfully.",
      claim,
    });
  } catch (error) {
    console.error("Error rejecting claim:", error);
    res.status(500).json({ message: "Failed to reject claim.", error: error.message });
  }
};


const getClaimHistory = async (req, res) => {
  console.log("Req body:", req.body);

  try {
    const { userId } = req.body;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const userClaims = await Claim.find({ userId });

    if (!userClaims.length) {
      return res.status(404).json({ message: "No claims found for this user." });
    }

    const claimHistory = userClaims.map((claim) => {
      return {
       
        policyDetails: {
          policyId: claim.policyId,
          coverageAmount: claim.coverageAmount,
          policyCategory: claim.policyCategory,
        },
        claimDetails: {
          claimId: claim.claimId,
          claimReason: claim.claimReason,
          claimAmount: claim.claimAmount,
          status: claim.status,
          rejectionReason: claim.status === "Rejected" ? claim.rejReason : undefined,
          requestDate: claim.reqDate,
        },
      };
    });
    res.status(200).json({ claims: claimHistory });
  } catch (error) {
    console.error("Error getting claim history:", error);
    res.status(500).json({ message: "Failed to get claim history.", error: error.message });
  }
};





  module.exports={getApprovedClaims, getClaimHistory, getPendingClaims, approveClaim, rejectClaim, getrejectedClaims, claimPolicy} 