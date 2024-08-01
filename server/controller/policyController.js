const Policy = require('../models/policyModel');
const User = require('../models/userModel');

const addNewPolicy = async (req,res)=>{
try {
    const {policyCategory, coverageAmount, premium} = req.body;

    const policy= new Policy(req.body);
       await policy.save();

    res.status(201).json({
        message: "Policy added successfully",
        policy,
      });
} catch (error) {
    console.error("Error adding policy:", error);
    res.status(500).json({
      message: "Failed to add policy",
      error: error.message,
    });
    
}
}


const listAllAvailablePolicy = async (req,res)=>{
try {
    const policy = await Policy.find({});

    if(policy.length==0)return res.status(404).send({
        message: "no policy available"
    })
      //  console.log('policy', policy)
    return res.status(201).send({
        message:"all policy listed",
        policy
    })
} catch (error) {
    console.error("Error fetching policies:", error);
    res.status(500).json({ message: "Failed to fetch policies" });
}

}



const buyPolicy = async (req, res) => {
  const { policyId, userId } = req.body;

  try {
    if (!policyId || !userId) {
      return res.status(400).json({ message: "Both Policy ID and User ID are required." });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const policy = await Policy.findOne({ policyId });
    if (!policy) {
      return res.status(404).json({ message: "Policy not found." });
    }

    if (user.selectedPolicies.includes(policyId)) {
      return res.status(201).send({ message: "You have already bought the policy." });
    }

    user.selectedPolicies.push(policyId);
    await user.save();
     
    policy.userIds.push(userId);
    await policy.save();

    // if (!policy.userIds.includes(userId)) {
    //   policy.userIds.push(userId);
    // }

    // await policy.save();

    res.status(200).send({
      message: "Policy added to your account successfully",
      policy,
      user
    });

  } catch (error) {
    console.error("Error selecting policy:", error);
    res.status(500).json({ message: "Failed to select policy", error: error.message });
  }
};



const fetchUserPolicy = async (req, res) => {
  const { userId } = req.params;
  try {
    // Find all policies that have the userId in the userIds array
    const policies = await Policy.find({ userIds: userId });
    console.log('Fetched policies:', policies);
    res.status(200).send({ policies });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user policies', error });
  }
};



const deletePolicy = async (req, res) => {
    try {
      const { policyId } = req.params;
  
      // Delete policy based on policyId instead of _id
      const policy = await Policy.findOneAndDelete({ policyId: policyId });
  
      if (!policy) {
        return res.status(404).json({ message: "Policy not found" });
      }
  
      res.status(200).json({ message: "Policy deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  module.exports= {addNewPolicy, deletePolicy, buyPolicy, listAllAvailablePolicy, fetchUserPolicy};