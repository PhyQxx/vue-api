//apiList.js
let models = require('../db');
let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let $sql = require('../sqlMap');
// 连接数据库
let conn = mysql.createConnection(models.mysql);

conn.connect();
let jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
};

// 查询接口内容
router.post('/selectbyid', (req, res) => {
  let sql = $sql.admin.selectApiListById;
  console.log(sql);
  let params = req.body;
  console.log(params);
  conn.query(sql,params.id,function(err, result) {
    if (err) {
      console.log(err);
      console.log("error")
    }
    if (result) {
      console.log("success",result);
      jsonWrite(res, result);
    }
  })
});
// 查询保存内容
router.post('/selectPreserve', (req, res) => {
  let sql = $sql.admin.selectPreserve;
  console.log(sql);
  let params = req.body;
  console.log(params);
  conn.query(sql,params,function(err, result) {
    if (err) {
      console.log(err);
      console.log("error")
    }
    if (result) {
      console.log("success",result);
      jsonWrite(res, result);
    }
  })
});

// 查询接口
router.post('/selectgroup', (req, res) => {
  let sql = $sql.admin.selectApiGroup;
  console.log(sql);
  let params = req.body;
  console.log(params);
  conn.query(sql,params,function(err, result) {
    if (err) {
      console.log(err);
      console.log("error")
    }
    if (result) {
      console.log("success",result);
      jsonWrite(res, result);
    }
  })
});
// 查询接口数量
router.post('/selectapis', (req, res) => {
  let sql = $sql.admin.selectApiList;
  console.log(sql);
  let params = req.body;
  console.log(params);
  conn.query(sql,params.group,function(err, result) {
    if (err) {
      console.log(err);
      console.log("error")
    }
    if (result) {
      console.log("success");
      jsonWrite(res, result);
    }
  })
});
// 新增保存接口
router.post('/insetPreserve', (req, res) => {
  let sql = $sql.admin.insertPreserve;
  console.log(sql);
  let params = req.body;
  console.log(params);
  conn.query(sql,[params.name,params.content,params.group],function(err, result) {
    if (err) {
      console.log(err);
      console.log("error")
      jsonWrite(res, result);
    }
    if (result) {
      console.log("success");
      jsonWrite(res, result);
    }
  })
});
// 更新保存接口
router.post('/updatePreserve', (req, res) => {
  let sql = $sql.admin.updatePreserve;
  console.log(sql);
  let params = req.body;
  console.log(params);
  conn.query(sql,[params.name,params.content,params.group,params.id],function(err, result) {
    if (err) {
      console.log(err);
      console.log("error")
      jsonWrite(res, result);
    }
    if (result) {
      console.log("success");
      jsonWrite(res, result);
    }
  })
});
// 提交新增
router.post('/insertApi', (req, res) => {
  let sql = $sql.admin.insertApi;
  console.log(sql);
  let params = req.body;
  console.log(params);
  conn.query(sql,[params.name,params.content,params.group],function(err, result) {
    if (err) {
      console.log(err);
      console.log("error");
      jsonWrite(res, result);
    }
    if (result) {
      console.log("success");
      jsonWrite(res, result);
    }
  })
});
// 提交保存内容
router.post('/updateApi', (req, res) => {
  let sql = $sql.admin.updateApi;
  console.log(sql);
  let params = req.body;
  console.log(params);
  conn.query(sql,[params.name,params.content,params.group,params.id],function(err, result) {
    if (err) {
      console.log(err);
      console.log("error")
      jsonWrite(res, result);
    }
    if (result) {
      console.log("success");
      jsonWrite(res, result);
    }
  })
});
// 删除接口（state = 0）
router.post('/updateDelete', (req, res) => {
  let sql = $sql.admin.updateDelete;
  console.log(sql);
  let params = req.body;
  console.log(params);
  conn.query(sql,params.id,function(err, result) {
    if (err) {
      console.log(err);
      console.log("error")
      jsonWrite(res, result);
    }
    if (result) {
      console.log("success");
      jsonWrite(res, result);
    }
  })
});
// 新增分组
router.post('/insertGroup', (req, res) => {
  let sql = $sql.admin.insertGroup;
  console.log(sql);
  let params = req.body;
  console.log(params);
  conn.query(sql,params.group,function(err, result) {
    if (err) {
      console.log(err);
      console.log("error")
      jsonWrite(res, result);
    }
    if (result) {
      console.log("success");
      jsonWrite(res, result);
    }
  })
});
// 查看回收站
router.post('/selectGarbage', (req, res) => {
  let sql = $sql.admin.selectGarbage;
  console.log(sql);
  let params = req.body;
  console.log(params);
  conn.query(sql,params,function(err, result) {
    if (err) {
      console.log(err);
      console.log("error")
      jsonWrite(res, result);
    }
    if (result) {
      console.log("success");
      jsonWrite(res, result);
    }
  })
});

module.exports = router;
