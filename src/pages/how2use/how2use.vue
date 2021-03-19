<!--
 * @Descripttion: 
 * @Author: lyc
 * @Date: 2021-01-22 14:43:48
 * @LastEditTime: 2021-03-19 14:09:34
 * @FilePath: \easy-markdown\src\pages\how2use\how2use.vue
-->
<template>
    <div>
        <van-collapse accordion :value="active" @change="onChange">
        <van-collapse-item title="如何选择手机里的md文件" name="1">
            由于微信小程序的限制，无法直接从手机系统中选择文件。因此需要您将需要打开的md文件先发送给“微信文件传输助手”或者是其他联系人，再点击“预览文件”按钮选择对应的文件。
        </van-collapse-item>
        <van-collapse-item title="md文件下载说明" name="2">
            同样由于微信小程序的限制，无法直接将编辑的内容生成一个md文件保存到手机。因此采取了先将编辑内容上传到服务器生成下载链接这种方式。上传到服务器的文档内容在一段时间后会被删除，请及时进行下载。
        </van-collapse-item>
        <van-collapse-item title="关于本软件" name="3">
            软件已经在
            <span @click="copy" style="color:#3498db">GitHub</span>
            开源，欢迎大家来交流。
            <br>
            
            <span>邮箱联系方式：</span><span style="color:#3498db" @click="email">lyc657508366@outlook.com</span>
            <br>
            <span>QQ联系方式：</span><span style="color:#3498db" @click="qq">657508366</span>
            <br>
            本软件承诺不会添加任何广告！
            <br>
            <div style="text-align:center;margin-top:30rpx;font-size:28rpx">
                <wemark :md="updateLog" link highlight type="wemark"></wemark>
            </div>
        </van-collapse-item>
        <van-collapse-item title="关于作者" name="4">
            我是一个业余的独立软件开发者。如果你想了解我更多欢迎来访问
            <span @click="blog" style="color:#3498db">我的博客。</span>
            <span></span>
            <br>
            <span>如果你喜欢本软件，不妨请我喝杯奶茶吧！(❁´◡`❁)</span>
            <img src="https://www.yuyinws.top/storage/images/icon/donate.png" style="width:600rpx;height:600rpx">
        </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: "",
                updateLog:""
            }
        },
        mounted () {
            this.getUpdateLog();
        },
        methods: {
           onChange(event){
               this.active = event.detail
           },
           copy(){
               uni.setClipboardData({
                   data:"https://github.com/yuyinws/EasyMarkdown",
                   success:() => {
                       uni.hideToast()
                       uni.showToast({
                           title:"GitHub地址已复制!",
                           icon:"none",
                           duration:2000
                       })
                   }
               })
           },
           blog(){
               uni.setClipboardData({
                   data:"https://yuyinws.github.io",
                   success:() => {
                       uni.hideToast()
                       uni.showToast({
                           title:"博客地址已复制!",
                           icon:"none",
                           duration:2000
                       })
                   }
               })
           },
           email(){
               uni.setClipboardData({
                   data:"lyc657508366@outlook.com",
                   success:() => {
                       uni.hideToast()
                       uni.showToast({
                           title:"邮箱地址已复制!",
                           icon:"none",
                           duration:2000
                       })
                   }
               })
           },
           qq(){
               uni.setClipboardData({
                   data:"657508366",
                   success:() => {
                       uni.hideToast()
                       uni.showToast({
                           title:"QQ已复制!",
                           icon:"none",
                           duration:2000
                       })
                   }
               })
           },
           getUpdateLog(){
               uni.request({
                   url:"https://www.yuyinws.top/api/updateLog",
                   method:"GET",
                   success:(res) => {
                       if(res.data.code == 200){
                           this.updateLog = res.data.data
                       }
                   },
                   fail:(err) => {
                       console.log(err)
                   }
               })
           }
        },
    }
</script>

<style scoped>

</style>