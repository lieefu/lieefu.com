const express = require('express');
const router = express.Router();

router.use("/user",require("./user"));
/* GET api listing. */
router.get('/', (req, res) => {
  res.status(200).json({ok:true,message:'api works,ok'});
});

module.exports = router;
