const express = require('express');
const router = express.Router();
const {adminRegisterController, adminLoginController, getAllUser, deleteUser} = require('../controller/adminController')
const {addNewPolicy, deletePolicy, listAllAvailablePolicy} = require('../controller/policyController')
const {getApprovedClaims, getPendingClaims, approveClaim, rejectClaim, getrejectedClaims} = require('../controller/claimsController')


router.post('/admin/register', adminRegisterController);
router.post('/admin/login', adminLoginController);
router.get('/admin/getalluser',getAllUser);
router.delete('/admin/deleteuser', deleteUser);

router.post('/admin/postpolicy', addNewPolicy);
router.delete('/admin/deletepolicy', deletePolicy);
router.get('/admin/getallpolicy', listAllAvailablePolicy);

router.get('/admin/getpendingclaims', getPendingClaims);
router.get('/admin/getapprovedclaims', getApprovedClaims);
router.get('/admin/getrejectedclaims', getrejectedClaims);
router.patch('/admin/approveclaim', approveClaim);
router.patch('/admin/rejectclaim', rejectClaim);

module.exports=router;