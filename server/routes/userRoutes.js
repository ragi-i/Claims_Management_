const express = require('express');
const router = express.Router();
const {userRegisterController, userLoginController} = require('../controller/userController.js')
const {getClaimHistory, claimPolicy}= require('../controller/claimsController.js')
const { buyPolicy, listAllAvailablePolicy, fetchUserPolicy} = require('../controller/policyController.js')




router.post('/user/register',userRegisterController );
router.post('/user/login', userLoginController );

router.get('/user/getallpolicy',listAllAvailablePolicy );
router.post('/user/buypolicy', buyPolicy);
router.get('/user/getBoughtPolicies/:userId', fetchUserPolicy);


router.post('/user/claimhistory', getClaimHistory);
router.post('/user/claimpolicy', claimPolicy);


module.exports=router;
