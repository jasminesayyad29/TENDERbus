
const express = require("express") ;
const router = express.Router() ;
const { getBidderEmails } = require('../controllers/Auth'); // Import the controller function

const {login , signup} = require("../controllers/Auth") ;
const {auth , isBidder, isAdmin} = require("../middlewares/auth") ;


router.post("/login" , login) ;
router.post("/signup", signup) ;


// testing route
router.get("/test", auth , (req,res) => {
    res.json({
        success:true,
        message:'Welcome to protected route of testing' ,
    });
});


// protected routes
router.get("/bidder", auth, isBidder, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the protected routes of Bidder',
    }) ;
}) ;


router.get("/tenderofficer", auth, isAdmin , (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route of Tender Officer',
    }) ;
}) ;

router.get('/bidders/emails', getBidderEmails);

module.exports = router ;