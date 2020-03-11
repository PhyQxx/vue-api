// node 后端服务器
const apiList1 = require('./apis/apiList');   //接口文件地址
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/user', apiList1);

// 监听端口
app.listen(3001);

console.log('success listen at port:3001......');

