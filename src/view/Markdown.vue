<template>
  <div id="app">
      <el-row class="markdown-body editormd-preview-container">
          <el-col :span="12" >
              <el-input type="textarea" v-model="content" :autosize="{ minRows: 34}" placeholder="请输入内容" >
              </el-input>
          </el-col>
          <el-col :span="12" >
              <div id="show-content" class="text-left">

              </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>

export default {

    data () {
        return {
            'content':'',
            'converter':null
        }
    },
    watch:{
        'content':'contentChanged'
    },
    mounted(){ this.init(); },
    methods: {
        init(){
            var showdown  = require('showdown');
            var converter = new showdown.Converter();
            var converter = new showdown.Converter({tables: true});
            this.converter = converter;
        },
        contentChanged(){
           var html = this.converter.makeHtml(this.content);
           document.getElementById('show-content').innerHTML = html;
        }
    }
}
</script>
<style scoped>

#show-content{
  padding:25px;
}
.el-row .el-col-12{
  width: 810px!important;
  border: 1px solid #C6C6C6;
  padding: 20px;
  min-height: 770px;
}
.el-row .el-col-12:nth-child(2){
  margin-left: 20px;
}
#show-content li code{
  border: 1px solid #ddd;
  background: #f6f6f6;
  padding: 3px;
  border-radius: 3px;
  font-size: 14px;
}

</style>
