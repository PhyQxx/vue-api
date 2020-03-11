<template>
  <div id="app">
    <!--<el-input v-model="input" placeholder="请输入接口名称"></el-input>-->
    <div :id="id">

    </div>
    <!--<el-button type="" plain>保存</el-button>-->

    <!--<el-button type="info" @click="submit">提交</el-button>-->
  </div>

</template>
<script>
  import $ from "jquery";
  import uuid from "uuid/v4";

  export default {
    name:"Editor",
    data:function(){
      return {
        //最终生成的编辑器
        editor:null,
        //默认选项
        defaultOptions:{
          width: "50%",
          height: 740,
          path : "/static/editor.md/lib/",
          theme : "",
          previewTheme : "",
          editorTheme : "pastel-on",
          //markdown : md,   //动态设置的markdown文本
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
          onload : function() {
            // console.log(this);
            this.fullscreen();
            this.unwatch();
            this.watch().fullscreen();
            this.setMarkdown("" +
              "## 导航页\n" +
              "------------\n" +
              "### 1.数据字典\n" +
              "| 页面  |接口编号|  接口名  | 接口编码 | API对接人  |  Android对接人  |  API完成  |  Android完成  |\n" +
              "| ------------| ------------ | ------------ | ------------ |------------ |------------ |------------ |------------ |\n" +
              "| `公共请求信息` |1.1| 公共请求信息 |[公共请求信息](http://wiki.onehaier.com/api/index.php/17?page_id=672 \"\") | `向寒`  | 涂钊、李松  | yes| no  |\n" +
              "\n" +
              "\n" +
              "### 2.视听\n" +
              "| 页面  |接口编号|  接口名  | 接口编码 | API对接人  |  Android对接人  |  API完成  |  Android完成  |\n" +
              "| ------------| ------------ | ------------ | ------------ |------------ |------------ |------------ |------------ |\n" +
              "| `专辑收藏` |2.1| 收藏专辑 |[收藏专辑](http://wiki.onehaier.com/api/index.php/17?page_id=641 \"\") | `张昭`  | 葛艳艳  | yes| no  |\n" +
              "| `专辑取消收藏` |2.2| 专辑取消收藏 |[专辑取消收藏](http://wiki.onehaier.com/api/index.php/17?page_id=642 \"\") | `张昭`  | 葛艳艳  | yes| no  |\n" +
              "\n" +
              "### 3.消息\n" +
              "| 页面  |接口编号|  接口名  | 接口编码 | API对接人  |  Android对接人  |  API完成  |  Android完成  |\n" +
              "| ------------| ------------ | ------------ | ------------ |------------ |------------ |------------ |------------ |\n" +
              "| `消息初始化` |3.1| 消息初始化 |[消息初始化](http://wiki.onehaier.com/api/index.php/17?page_id=644 \"\") | `张昭`  | 亓斌  | yes| no  |\n" +
              "| `根据消息分类获取消息列表` |3.2| 消息初始化 |[消息初始化](http://wiki.onehaier.com/api/index.php/17?page_id=645 \"\") | `张昭`  | 亓斌  | yes| no  |\n" +
              "| `消息状态变更` |3.3| 消息状态变更 |[消息状态变更](http://wiki.onehaier.com/api/index.php/17?page_id=665 \"\") | `张昭`  | 亓斌  | yes| no  |\n" +
              "| `消息未读数量` |3.4| 消息未读数量 |[消息未读数量](http://wiki.onehaier.com/api/index.php/17?page_id=795 \"\") | `张昭`  | 亓斌  | yes| no  |\n" +
              "\n" +
              "### 6.OTA\n" +
              "| 页面  |接口编号|  接口名  | 接口编码 | API对接人  |  Android对接人  |  API完成  |  Android完成  |\n" +
              "| ------------| ------------ | ------------ | ------------ |------------ |------------ |------------ |------------ |\n" +
              "| `OTA升级包查询接口` |6.1| OTA升级包查询接口 |[OTA升级包查询接口](http://wiki.onehaier.com/api/index.php/17?page_id=643 \"\") | `张昭`  | 涂钊  | yes| no  |\n" +
              "\n" +
              "### 7.登录注册\n" +
              "| 页面  |接口编号|  接口名  | 接口编码 | API对接人  |  Android对接人  |  API完成  |  Android完成  |\n" +
              "| ------------| ------------ | ------------ | ------------ |------------ |------------ |------------ |------------ |\n" +
              "| `获取注册验证码` |7.1| 获取注册验证码 |[获取注册验证码](ht");
            this.width("50%");
            this.height(480);
            this.resize("100%", 720);
          },
        }
      }
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
    mounted(){
      let vm=this;
      //加载editormd
      this.requireEditor(function(){
        vm.editor=editormd(vm.id,vm.getOptions());
      })

    },

    methods:{
      // submit: function() {
      //   console.log(this.$data.editor.preview[0])
      // },
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

    }
  }
</script>
<style>
  .cm-s-pastel-on{
    display: none !important;
  }
  .editormd-vertical{
    height: 764px!important;
  }
  .editormd-preview{
    width: 100%!important;
    height: 764px!important;
  }
</style>
