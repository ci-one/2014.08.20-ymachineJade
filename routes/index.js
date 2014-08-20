var express = require('express');
var router = express.Router()
, board = require('./controllers/boardDAO');

/* GET home page. */
router.get('/ls',function(req, res){
    res.render('lsindex',{title:'Y-Lease'});
});
router.get('/ym',function(req, res){
    res.render('ymindex', { title: 'Y-Machine' });
});
router.get('/',function(req, res){
    res.render('index', { title: 'Y-Machine' });
});


/* POST request. */
router.post('/noticeList', board.noticeList);
router.post('/noticeDelete', board.noticeDelete);
router.post('/noticeDeleteF', board.noticeDeleteF);
router.post('/noticeInsert', board.noticeInsert);
router.post('/noticeInsertF', board.noticeInsertF);
router.post('/noticeOne', board.noticeOne);
router.post('/noticeUpdate', board.noticeUpdate);

router.post('/getCateN', board.getCateN);
router.post('/nitemList', board.nitemList);
router.post('/nitemListall', board.nitemListAll);
router.post('/nitemOne', board.nitemOne);
router.post('/nmodelList', board.nmodelList);
router.post('/nitemInsert', board.nitemInsert);
router.post('/nitemOneFor', board.nitemOnefor);
router.post('/nitemInsertF', board.nitemInsertF);
router.post('/nmodelInsert', board.nmodelInsert);
router.post('/nitemDeleteF', board.nitemDeleteF);
router.post('/nitemDelete', board.nitemDelete);
router.post('/nmodelDelete', board.nmodelDelete);

router.post('/getCateO', board.getCateO);
router.post('/oitemList', board.oitemList);
router.post('/oitemListall', board.oitemListAll);
router.post('/oitemOne', board.oitemOne);
router.post('/omodelList', board.omodelList);
router.post('/oitemInsert', board.oitemInsert);
router.post('/oitemOneFor', board.oitemOneFor);
router.post('/oitemInsertF', board.oitemInsertF);
router.post('/omodelInsert', board.omodelInsert);
router.post('/oitemDeleteF', board.oitemDeleteF);
router.post('/oitemDelete', board.oitemDelete);
router.post('/omodelDelete', board.omodelDelete);


router.post('/mcqList', board.mcqList);
router.post('/mcqOne', board.mcqOne);
router.post('/mcqInsertF', board.mcqInsertF);
router.post('/mcqInsert', board.mcqInsert);


router.post('/lsqList', board.lsqList);
router.post('/lsqOne', board.lsqOne);
router.post('/lsqInsert', board.lsqInsert);
router.post('/lsqInsertF', board.lsqInsertF);


router.post('/customerList', board.customerList);
router.post('/customerOne', board.customerOne);
router.post('/customerdelete', board.customerdelete);
router.post('/customerInsert', board.customerInsert);

router.post('/idChk', board.idChk);

router.post('/oldRecList', board.oldRecList);
router.post('/oldRecUpdate', board.oldRecUpdate);
router.post('/oldRecDelete', board.oldRecDelete);
router.post('/oitemChk', board.oldRecChk);

router.post('/newRecList', board.newRecList);
router.post('/newRecUpdate', board.newRecUpdate);
router.post('/newRecDelete', board.newRecDelete);


module.exports = router;

