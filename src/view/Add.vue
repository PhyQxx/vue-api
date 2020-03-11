<template>
  <div class="indexContainer">
    <div class="btnsContainer">
      <el-input class="api-name text"
        placeholder="请输入接口名称"
        v-model="apiName"
        clearable>
      </el-input>
      <el-select class="text" v-model="value" placeholder="请选择接口分组">
        <el-option
          v-for="item in option"
          :key="item.api_group"
          :label="item.api_group"
          :value="item.api_group">
        </el-option>
      </el-select>
      <el-button type="info" @click="getNew" class="text">刷新分组</el-button>
      <el-button plain class="text" @click="preserve">保存</el-button>
      <el-button type="info" @click="getMdValueFn" class="text">提交</el-button>
    </div>
    <div class="maskContainer" v-if="dilogStatus">
      <div class="contentContainer">
        <div class="closeBtnContainer" @click="closeMaskFn"></div>
        <textarea class="showAreaContainer" v-model="msgShow" readonly></textarea>
      </div>
    </div>
    <div class="editorContainer">
      <markdown
        :mdValuesP="msg.mdValue"
        :fullPageStatusP="false"
        :editStatusP="true"
        :previewStatusP="true"
        :navStatusP="true"
        :icoStatusP="true"
        @childevent="childEventHandler"
      ></markdown>
    </div>
  </div>
</template>

<script>
  import markdown from '../components/Mdeditor'
  export default {
    name: 'test',
    data() {

      return {
        option:[],
        value:'',
        id:'',
        apiName:'',
        msgShow:'我要显示的内容',
        dilogStatus:false,
        msg: {
          mdValue:''
        },
        flag:false,
      }
    },
    beforeCreate() {
    },
    created() {
      this.$ajax.post('/apis/user/selectgroup',{},{}).then((response) => {
      this.option = response.data;
      })
    },
    mounted() {
      this.$ajax.post('/apis/user/selectPreserve',{},{}).then((response) => {
        this.msg.mdValue = response.data[0].api_content;
        this.apiName = response.data[0].api_name;
        this.value = response.data[0].api_group;
        this.id = response.data[0].api_id;
        // this.option.push({api_group:"新建分组"})
        if (response.data.length>0) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      })
    },
    updated() {

    },
    components: {
      markdown
    },
    methods: {
      getNew() {
        this.$ajax.post('/apis/user/selectgroup',{},{}).then((response) => {
          this.option = response.data;
          if (response.status == 200) {
            this.$message({
              message:'刷新分组成功',
              type:'success'
            })
          } else {
            this.$message.error("刷新分组失败")
          }
        })
      },
      childEventHandler:function(res){
        // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
        this.msg=res;
      },
      getMdValueFn:function(){
        if (this.flag == true) {
          let content = this.msg.mdValue
          this.$ajax.post('/apis/user/updateApi',{id:this.id,name:this.apiName,group:this.value,content,content},{}).then((response) => {
            if (response.data.code == 1) {
              this.$message.error('提交失败');
            } else {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$router.push({
                path: '/',
                query: {}
              })
            }
          })
        } else {
          let content = this.msg.mdValue
          this.$ajax.post('/apis/user/insertApi',{name:this.apiName,group:this.value,content,content},{}).then((response) => {
            if (response.data.code == 1) {
              this.$message.error('提交失败');
            } else {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$router.push({
                path: '/',
                query: {}
              })
            }
          })
        }
      },
      preserve:function(){
        if (this.flag == true) {
          let content = this.msg.mdValue
          this.$ajax.post('/apis/user/updatePreserve',{id:this.id,name:this.apiName,group:this.value,content,content},{}).then((response) => {
            if (response.data.code == 1) {
              this.$message.error('保存失败');
            } else {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            }
          })
        } else {
          let content = this.msg.mdValue
          this.$ajax.post('/apis/user/insetPreserve',{name:this.apiName,group:this.value,content,content},{}).then((response) => {
            if (response.data.code == 1) {
              this.$message.error('保存失败');
            } else {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            }
          })
        }
      },
      closeMaskFn:function(){
        this.msgShow='';
        this.dilogStatus=false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .text{
    margin-left: 0!important;
    margin-right: 2rem;
  }
  .api-name{
    width: 15rem;
  }
  .indexContainer{
    height: 780px!important;
  }
  .show{
    position: absolute;
    left: 0;
    top: 0;
  }
  .indexContainer {
    width: 100%;
    height: 100%;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .btnsContainer{
    position: absolute;
    z-index: 10;
    left: 1%;
    top: 16px;
    height: 40px;
    min-width: 300px;
    // background: pink;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .btn{
      display: inline-block;
      border:1px solid #ccc;
      margin-right: 10px;
      box-sizing: border-box;
      padding: 0 10px;
      background: #fff;
      font-size: 12px;
      height: 25px;
      line-height: 25px;
      cursor:pointer;
      moz-user-select: -moz-none;
      -moz-user-select: none;
      -o-user-select:none;
      -khtml-user-select:none; /* you could also put this in a class */
      -webkit-user-select:none;/* and add the CSS class here instead */
      -ms-user-select:none;
      user-select:none;/**禁止选中文字*/
      &:active{
        opacity: 0.8;
        background: lightblue;
      }
    }
  }
  .maskContainer{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.5);
    // z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    .contentContainer{
      width: 60%;
      height: 60%;
      background: #fefefe;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
      .showAreaContainer{
        height: 100%;
        width: 100%;
        outline: none;
        background: #eee;
        display: block;
        resize: none;
        padding: 10px;
        box-sizing: border-box;
      }
      .closeBtnContainer{
        position: absolute;
        height: 30px;
        width: 30px;
        right: -40px;
        top: -40px;
        border:1px solid #fff;
        border-radius: 50%;
        &::before{
          content: '';
          position: absolute;
          width: 70%;
          height: 2px;
          display: bblock;
          background: #fff;
          left: 15%;
          top: calc(50% - 1px);
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
        }
        &::after{
          content: '';
          position: absolute;
          width: 70%;
          height: 2px;
          display: bblock;
          background: #fff;
          left: 15%;
          top: calc(50% - 1px);
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
        }
      }
    }
  }

  .editorContainer {
    margin-top: 4%;
    width: 98%;
    height: 90%;
    border: 1px solid #ddd;
  }
  .el-main{
    padding: 0!important;
  }
</style>
