const express = require('express');
const router = express.Router();

router.use("/user",require("./user"));
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works,ok');
});

module.exports = router;
