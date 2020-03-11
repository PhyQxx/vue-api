<template>
    <div id="app">
      <el-button type="danger" @click="del">删除</el-button>
      <el-button type="info" @click="edit">编辑</el-button>
      <div :id="id">
        <textarea class="editormd-markdown-textarea" name="test-editormd-markdown-doc" style="display: none;" v-text="content"></textarea>
      </div>
    </div>
</template>

<script>
  import $ from "jquery";
  import uuid from "uuid/v4";
    export default {
      inject:["reload"],
      name: "Content2",
      data:function(){
        return {
          id:this.$route.query.apiId,
          content:"",
          group:'',
          //最终生成的编辑器
          editor:null,
          //默认选项
          defaultOptions:{
            //width: "90%",
            //height: 740,
            path : "/static/editor.md/lib/",
            theme : "",
            previewTheme : "",
            editorTheme : "pastel-on",
            // markdown : md,   //动态设置的markdown文本
            codeFold : true,
            //syncScrolling : false,
            saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
            searchReplace : true,
            //watch : false,                // 关闭实时预览
            htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
            toolbar  : false,             //关闭工具栏
            //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
            emoji : true,
            taskList : true,
            tocm            : true,         // Using [TOCM]
            tex : true,                   // 开启科学公式TeX语言支持，默认关闭
            flowChart : true,             // 开启流程图支持，默认关闭
            sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
            //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
            //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
            //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
            //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
            //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
            imageUpload : true,
            imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL : "./php/upload.php",
            onload : function(md) {
              // console.log(data.markdown);
              this.fullscreen();
              this.unwatch();
              this.watch().fullscreen();
              // this.setMarkdown(md);
              this.width("100%");
              this.height(480);
              this.resize("100%", 640);
            },
          }
        }
      },
      watch: {
        '$route' (to, from) { //监听路由是否变化
          if(to.query.apiId != from.query.apiId){
            console.log(this.id)
            this.apiId = to.query.apiId;
            this.$ajax.post('/apis/user/selectbyid',{id:this.$route.query.apiId},{}).then((response) => {
              // this.$set(this.$data,'content',response.data[0].api_content)
              this.reload();
              this.content = response.data[0].api_content;
              this.group = response.data[0].api_group;
              // console.log(this.content)
           })
          }
        }
      },
      created() {

      },
      mounted(){

        let vm=this;
        //加载editormd
        this.requireEditor(function(){
          vm.editor=editormd(vm.id,vm.getOptions());
        })
        this.$ajax.post('/apis/user/selectbyid',{id:this.$route.query.apiId},{}).then((response) => {
          this.content = response.data[0].api_content;
          this.group = response.data[0].api_group;
        });
      },
      props:{
        /**
         * editormd挂载元素的id
         */
        id:{
          type:String,
          default:uuid()
        },
        /**
         * editormd的选项对象
         */
        options:{
          type:Object
        }
      },

      methods: {
        edit() {
          this.$router.push({
            path: '/edit',
            query: {
              id:this.$route.query.apiId
            }
          });
        },
        del() {
          this.$confirm('此操作将删除该接口文档, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$ajax.post('/apis/user/updateDelete',{id:this.$route.query.apiId},{}).then((response) => {
              console.log(response)
              if (response.status == 200) {
                this.$message({
                  message:'删除成功',
                  type:'success'
                })
              } else {
                this.$message.error('删除失败')
              }
            });
            setTimeout(()=>{
              this.$router.push({
                path: '/',
                query: {}
              });
              history.go(0)
            },1000)
          });

        },
        /**
         * 异步加载editormd
         * callback 成功后的回调函数
         */
        requireEditor(callback){
          let vm=this;
          //设置全局变量，因为editormd依赖jquery
          window.$=window.jQuery=$;
          //异步加载并执行
          $.getScript("/static/editor.md/editormd.min.js",function(script){
            callback();
          });
          //加载css
          $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', '/static/editor.md/css/editormd.min.css') );
        },
        /**
         * 得到最终的options，组件属性上获得的选项覆盖此处的默认选项
         */

        getOptions(){
          return Object.assign(this.defaultOptions,this.options);
        },
      },

    }
</script>

<style>
  .el-button{
    float: right;
    margin: 1rem 0 1rem 1rem ;
  }
.cm-s-pastel-on{
  display: none !important;
}
.editormd-vertical{
  height: 690px!important;
}
.editormd-preview{
  width: 100%!important;
  height: 690px!important;
}
</style>
