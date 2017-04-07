const express = require('express');
const router = express.Router();

router.use("/user",require("./user"));
/* GET api listing. */
router.get('/', (req, res) => {
  res.status(200).json({ok:true,message:'api works,ok'});
});
router.get('/lilydict/version', (req, res) => {
  res.status(200).json({ok:true,version:'1.0.1',url:'http://lieefu.com/download',message:'发现新版本，请下载升级'});
});
module.exports = router;
