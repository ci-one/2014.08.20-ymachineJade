/**
 * Created by wealab04 on 2014-05-30.
 */

//공지사항게시판
exports.noticeList = 'select * from notice order by id desc';
exports.noticeOne = 'select * from notice where id=?';
exports.noticeInsert = 'insert into notice values(null,?,?,now(),?)';
exports.noticeDelete = 'delete from notice where id=?';
exports.noticeUpdate = 'update notice set title=?, content=? where id=?';
//컬럼 : id, title, content, date, images
//done

//새제품게시판
exports.getCateN = 'select * from categoryN where id=?';
exports.nitemList1 = 'select * from nProduct where gru=? order by id desc';
exports.nitemList2 = 'select * from nProduct where cateId=? order by id desc';
exports.nitemListAll = 'select * from nProduct order by id desc';
exports.nitemOne = 'select * from nProduct where id=?';
exports.nitemOneFor = 'select * from nProduct where name=? and comp=?';
exports.nmodelList = 'select * from newModel where proId=? order by name';
exports.nitemInsert = 'insert into nProduct values(null,?,?,?,?,?,?)';
exports.nmodelInsert = 'insert into newModel values(null,?,?,?)';
exports.nitemDelete = 'delete from nProduct where id=?';
exports.nmodelDelete = 'delete from newModel where proId=?';
//컬럼 : id, name, comp, content, images
//컬럼 : id, proId, name, option
//done


//중고기계게시판
exports.getCateO = 'select * from categoryO where id=?';
exports.oitemList1 = 'select * from oProduct where gru=? order by id desc';
exports.oitemList2 = 'select * from oProduct where cateId=? order by id desc';
exports.oitemListAll = 'select * from oProduct order by id desc';
exports.oitemOne = 'select * from oProduct where id=?';
exports.oitemOneFor = 'select * from oProduct where name=? and comp=?';
exports.omodelList = 'select * from oldModel where proId=? order by name';
exports.oitemInsert = 'insert into oProduct values(null,?,?,?,?,?,?)';
exports.omodelInsert = 'insert into oldModel values(null,?,?,?)';
exports.oitemDelete = 'delete from oProduct where id=?';
exports.omodelDelete = 'delete from oldModel where proId=?';
//컬럼 : id, name, comp, content, images
//컬럼 : id, proId, name, option
//done


//공작기계 문의
exports.mcqList = 'select * from mcQue order by id desc';
exports.mcqOne = 'select * from mcQue where id=?';
exports.mcqInsert = 'insert into mcQue values(null,?,?,?,?,?,?,?)';
//컬럼 : id, title, writer, comp, contact, email, content, images


//금융리스 문의
exports.lsqList = 'select * from lsQue order by id desc';
exports.lsqOne = 'select * from lsQue where id=?';
exports.lsqInsert = 'insert into lsQue values(null,?,?,?,?,?,?,?)';
//컬럼 : id, title, writer, comp, contact, email, content, images
//done


//고객문의
exports.customerList = 'select * from customerQ order by id desc';
exports.customerOne = 'select * from customerQ where id=?';
exports.customerdelete = 'delete from customerQ where id=?';
exports.customerInsert = 'insert into customerQ values(null,?,?,?,?,?,?)';
//컬럼 : id, title, writer, comp, contact, email, content, images


//로그인
exports.idChk = 'select * from account where id=? and pswd=?';
//컬럼 : id, name, pswd


//중고장비 추천 리스트
exports.oldRecList = 'select o.* from oldRecomm r, oProduct o where r.itemId=o.id order by id desc';
exports.oldRecChk = 'select * from oldRecomm where itemId=?';
exports.oldRecUpdate = 'update oldRecomm set itemId=? where id=?';
exports.oldRecDelete = 'update oldRecomm set itemId=null where id=?';
//컬럼 : id, itemId

//새제품 추천 리스트
exports.newRecList = 'select n.* from newRecomm r, nProduct n where r.itemId=n.id order by id desc';
exports.newRecUpdate = 'update newRecomm set itemId=? where id=?';
exports.newRecDelete = 'update newRecomm set itemId=null where id=?';
//컬럼 : id, itemId
