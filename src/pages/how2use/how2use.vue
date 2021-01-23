<!--
 * @Descripttion: 
 * @Author: lyc
 * @Date: 2021-01-22 14:43:48
 * @LastEditTime: 2021-01-23 15:08:22
 * @FilePath: \easy-markdown\src\pages\how2use\how2use.vue
-->
<template>
    <div>
        <van-collapse accordion :value="active" @change="onChange">
        <van-collapse-item title="如何选择手机里的md文件" name="1">
            由于微信小程序的限制，无法直接从手机系统中选择文件。因此需要您将需要打开的md文件先发送给“微信文件传输助手”或者是其他联系人，再点击“预览文件”按钮选择对应的文件。
        </van-collapse-item>
        <van-collapse-item title="md文件下载说明" name="2">
            同样由于微信小程序的限制，无法直接将编辑的内容生成一个md文件保存到手机。因此采取了先将编辑内容上传到服务器生成下载链接这种方式。上传到服务器的文档内容在一段时间后会被删除，请即使进行下载。
        </van-collapse-item>
        <van-collapse-item title="关于本软件" name="3">
            软件已经在
            <span @click="copy" style="color:#3498db">github</span>
            开源，欢迎大家来交流。
        </van-collapse-item>
        <van-collapse-item title="关于作者" name="4">
            线上拓客，随时预约，贴心顺手的开单收银
        </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: ""
            }
        },
        mounted () {
            ;
        },
        methods: {
           onChange(event){
               this.active = event.detail
           },
           copy(event){
               
           }
        },
    }
</script>

<style scoped>

</style>