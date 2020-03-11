<template>
  <div class="all">
    <div class="button">
      <el-row>
        <el-button type="primary" @click="save">保  存</el-button>
        <el-button type="success" @click="submit">提  交</el-button>
        <el-button type="danger" @click="rester">清  空</el-button>
      </el-row>
    </div>

    <div id="app3">
      <el-input class="left box" type="textarea" autosize v-model="content"></el-input>
      <div class="right box">
        <div class="content" v-html="content">{{content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getData } from '@/api/index'
  export default{
    data() {
      return {
        content: "",
      }
    },
    methods: {
      save: function() {
        alert("保存成功 \n内容是: \n  "+this.$data.content);
      },
      submit: function() {
        // alert("提交成功 \n内容是: \n  "+this.$data.content);
        console.log(this.$parent);
        getData().then(res =>{
                  this.content = res
                })

      },
      rester: function() {
        if (confirm("确认清空?")) {
            this.$data.content = "";
            alert("清空成功");
        }
        else {
            alert("取消清空");
        }
      }
    }
  }
</script>

<style>
  #app3{
    display: flex;
    padding: 20px;
  }
  .button{
    padding: 0 20px;
  }
  .box{
    width: 830px;
    min-height: 690px;
    /* margin-left: 20px; */
    border: 1px solid #C6C6C6;
    padding: 20px;

  }
  .left{

  }
  .right{
    margin-left: 20px;
  }
  .el-textarea__inner{
    min-height: 690px !important;
  }
</style>
