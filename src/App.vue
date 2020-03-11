<template>
  <div id="app">
    <el-container>
      <el-header>
        <div style="flex: 1;">API</div>
        <div style="flex: 10;">接口文档</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-col :span="12">
            <el-menu
              unique-opened=true
              :default-active="index"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="#/nav" @click="nav()">
                <i class="el-icon-circle-plus-outline"></i>
                <span slot="title">导航页</span>
              </el-menu-item>
              <el-submenu index="#/api">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>我的接口</span>
                </template>
                <el-submenu v-for="(item) in apiGroup" :index="item.api_group" :key="item.api_group+'group'">
                  <template slot="title">{{item.api_group}}</template>
                  <el-menu-item v-for="(item) in apiName"
                                @click="select(item.api_id,item.api_name)"
                                :index="'#/content2?apiId='+item.api_id"
                                :key="item.api_id">
                    {{item.api_name}}
                  </el-menu-item>
                </el-submenu >
              </el-submenu>
              <el-menu-item index="#/addApi" @click="addApi()">
                <i class="el-icon-circle-plus-outline"></i>
                <span slot="title">新增接口</span>
              </el-menu-item>
              <el-menu-item index="#/addGroup" @click="dialogFormVisible = true">
                <i class="el-icon-circle-plus-outline"></i>
                <span slot="title">新增分组</span>
              </el-menu-item>
              <!--<el-submenu>
                <template slot="title">
                  <i class="el-icon-delete-solid"></i>
                  <span>回收站</span>
                </template>
                <el-menu-item v-for="(item) in garbage"
                              @click="selectGarbage(item.api_id,item.api_name)"
                              :index="'#/content2?apiId='+item.api_id"
                              :key="item.api_id">
                  {{item.api_name}}
                </el-menu-item>
              </el-submenu >-->
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <el-dialog class="new-group" title="新增分组" :visible.sync="dialogFormVisible">
            <el-input v-model="group" placeholder='请输入新增分组名称'></el-input>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addGroup">确 定</el-button>
            </div>
          </el-dialog>
          <router-view v-if="isRouterAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "App",
    provide(){
      return {
        reload:this.reload
      }
    },
    data() {
      return {
        garbage:'',
        dialogFormVisible: false,
        group:'',
        apiGroup: [],
        isRouterAlive: true,
        apiName: [],
        index: location.hash,
        key: location.hash
      }
    },
    created() {
      this.index = location.hash;
      this.$ajax.post('/apis/user/selectgroup',{},{}).then((response) => {
        this.$data.apiGroup = response.data;
      });
      this.$ajax.post('/apis/user/selectGarbage',{},{}).then((response) => {
        this.garbage = response.data;
      })
    },
    updated() {

    },
    methods: {
      selectGarbage() {
        this.$router.push({
          name: 'Garbage',
          query: {
            apiId: index,
          }
        })
      },
      log() {
        console.log("log",apiList[0].groupName)
      },
      reload () {
        this.isRouterAlive = false;
        this.$nextTick(() => (this.isRouterAlive = true))
      },
      select: function (index,name) {
        this.$router.push({
          name: 'Content2',
          query: {
            apiId: index,
          }
        })
        // history.go(0)
      },
      handleOpen(key, keyPath) {
        this.$ajax.post('/apis/user/selectapis',{group:key},{}).then((response) => {
          this.apiName = response.data;
          console.log(this.apiName[0].api_name)
        })
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      edit: function () {
        this.$router.push({
          path: '/edit',
          query: {}
        })

      },
      markdown: function () {
        this.$router.push({
          path: '/markdown',
          query: {}
        })
      },
      addApi: function () {
        this.$router.push({
          path: '/add',
          query: {}
        });
        // history.go(0)
      },
      nav: function () {
        this.$router.push({
          path: '/',
          query: {}
        })
      },
      addGroup() {
        if (this.group == '') {
          this.$message({
            message:'分组名称不能为空',
            type:'success'
          })
        } else {
          this.$ajax.post('/apis/user/insertGroup',{group:this.group},{}).then((response) => {
            if (response.status == 200) {
              this.$message({
                message: '新增成功',
                type: 'success'
              });
            } else {
              this.$message.error('新增失败');
            }
          })
        }
        this.dialogFormVisible = false;
        this.group = '';
        this.$ajax.post('/apis/user/selectgroup',{},{}).then((response) => {
          this.$data.apiGroup = response.data;
        });
      },
    },
  }
</script>

<style>
  .new-group{
    height: 800px;
  }
  .el-header {
    display: flex;
    background-color: rgb(84, 92, 100);
    text-align: center;
    height: 100px !important;
  }

  .el-header div {
    line-height: 100px;
    height: 100px !important;
    color: white;
    font-weight: bold;
    font-size: 24px;
  }

  .el-container {
    height: calc(100% - 100px);
  }

  .el-aside {
    background-color: rgb(84, 92, 100);
  }

  .el-col-12 {
    width: 100%;
  }

  .api li {
    list-style: none;
    margin-top: 10px;
    cursor: pointer;
  }
</style>
