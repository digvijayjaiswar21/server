const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.get('/',[auth,admin],async (req,res)=>{
res.json({
"1":"MCA",
"2":"BCA"
});
 }
)

module.exports = router;