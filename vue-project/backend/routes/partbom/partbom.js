var express = require('express');
var router = express.Router();

/* GET order listing. */
const partboms = [
    {
      partId: '202211121700',
      partName: 'PartA',
    },
    {
      partId: '202211121701',
      partName: 'PartB',
    },
  ]

router.get('/', function(req, res, next) {
    if(req.query.id == null){
        //一覧検索
        // res.send('Order List respond with a resource');
        res.json(partboms)
    }else{
        let partbom = partboms.find(partbom => partbom.partId == req.query.id);
        console.log(partbom);
        res.json(partbom)
    }
    
  });

module.exports = router;