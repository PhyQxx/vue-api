//sqlMap.js
let sqlMap = {
  // 用户
  admin: {
    /*查询保存内容*/
    selectPreserve: 'select * from api_info_test where state = 0',
    selectApiGroup: 'select distinct api_group from api_info_test',
    selectApiList: 'select api_id,api_name,api_content from api_info_test where api_group = ? and state = 1',
    selectApiListById: 'select * from api_info_test where api_id = ?',
    /*新增保存*/
    insertPreserve: 'insert into api_info_test values(REPLACE(UUID(),"-",""),?,?,?,0)',
    /*更新保存*/
    updatePreserve: 'update api_info_test set api_name = ? ,api_content = ?,api_group = ?,state = 0 where api_id = ?',
    /*提交新增*/
    insertApi: 'insert into api_info_test (api_id,api_name,api_content,api_group,state) values(REPLACE(UUID(),"-",""),?,?,?,1)',
    /*提交保存内容*/
    updateApi:'update api_info_test set api_name = ? ,api_content = ?,api_group = ?,state = 1 where api_id = ?',
    /*删除接口（state = 0）*/
    updateDelete: 'update api_info_test set state = 2 where api_id = ?',
    /*新增分组*/
    insertGroup: 'insert into api_info_test values(REPLACE(UUID(),"-",""),REPLACE(UUID(),"-",""),1,?,3)',
    /*查看回收站*/
    selectGarbage: 'select * from api_info_test where state = 2'
  },
};
module.exports = sqlMap;
