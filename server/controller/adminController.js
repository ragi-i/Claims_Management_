
const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require("bcryptjs")


const adminRegisterController = async (req,res) =>{
  try {
      const {fullname,email,password}=req.body;

      const existingAdmin = await Admin.findOne({email:req.body.email});

      if(existingAdmin){
        return res.status(302).send(
          {
              status:false,
              message:"Admin already exist",
              email
          }
        )
      }

       
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
       
    const newAdmin= new Admin(req.body);
    const saveAdmin = await newAdmin.save();;

    return res.status(200).send({
      status: true,
      message:"Admin is successfully registered",
      saveAdmin,
      adminId: saveAdmin._id
    })
      
  } catch (error) {
      console.log(error);
    return  res.status(500).send({
        success: false,
        message: "Error In Register API",
        error,
      });


  }
}

const adminLoginController = async(req,res) =>{
  try {
    const {email, password} = req.body;

    const existingAdmin = await Admin.findOne({email:req.body.email});
    if(!existingAdmin)return res.status(404).json(
        {
            success: true,
            message: "Admin does not exist",
        }
    )
    

  //  if(existingAdmin.password!=password)return res.json({message:"password doesnot match"});

   const comparePassword = await bcrypt.compare(
    req.body.password,
    existingAdmin.password
  );
  if (!comparePassword) {
    return res.status(500).send({
      success: false,
      message: "Invalid Credentials",
    });
  }

   const token = jwt.sign({ adminId: existingAdmin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
    
  return res.status(200).send({
    success: true,
    message: "Admin successfully Login",
    existingAdmin,
    token
  })
    
  } catch (error) {
   return  res.status(500).send({
        success: false,
        message: "Error In Login API",
        error,
      });
  }
}


const getAllUser = async (req,res) =>{
   
  try {
    const user =  await User.find({},{password : 0}).lean(); // method will return plain JavaScript objects instead of Mongoose documents

    if(user.length==0)return res.status(404).send({ message: "No users found." });
    console.log("user:", user);
    res.status(200).send({
        user
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
        message:"error in fetrching all users",
        error
    })
    
  }
}


const deleteUser = async (req,res) =>{

    const { userId } = req.params; 

    try {
     
      const user = await User.findOneAndDelete({ userId: userId });
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error("Error deleting user:", error);
      res
        .status(500)
        .json({ message: "Failed to delete user.", error: error.message });
    }
}

module.exports={adminRegisterController, adminLoginController, getAllUser, deleteUser}