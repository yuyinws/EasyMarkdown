<!--
 * @Descripttion: 
 * @Author: lyc
 * @Date: 2021-01-22 15:36:13
 * @LastEditTime: 2021-01-27 17:46:26
 * @FilePath: \easy-markdown\src\pages\index\index.vue
-->
<template>
    <div>
        <img src="https://www.yuyinws.top/storage/images/icon/emd-logo.png" class="logo">
        <div class="slogan">
            <span style="display:block">EasyMarkdown</span>
            <span>一个轻量的md文件编辑、预览小程序</span>
        </div>
        <div class="priview" @click="toPriviewPage">
            <img src="https://www.yuyinws.top/storage/images/icon/emd-priview.png" class="priview-logo">
            <span style="display:block;text-align:center;color:#606266">预览文件</span>
        </div>
        <div class="newFile" @click="toEditPage">
            <img src="https://www.yuyinws.top/storage/images/icon/emd-newfile.png" class="priview-logo">
            <span style="display:block;text-align:center;color:#606266">新建文件</span>
        </div>
        <div class="how2Use" @click="toUsePage">
            <img src="https://www.yuyinws.top/storage/images/icon/emd-how2Use.png" class="priview-logo">
            <span style="display:block;text-align:center;color:#606266">食用方法</span>
        </div>
        <div class="info">
            <span style="display:block">{{version}}</span>
            <span>Copyright © {{year}} YuYin</span>
            
        </div>
    </div>
</template>

<script>
    export default {
        mounted () {
            this.getVersion();
        },
        data() {
            return {
                year: new Date().getFullYear(),
                version : 'V1.0.1'
            }
        },
        methods: {
        toPriviewPage(){
            var fsm = wx.getFileSystemManager();
                wx.chooseMessageFile({
                    count: 1,
                    type: 'file',
                    extension:['md'],
                    success:(res) => {
                        setTimeout(() => {
                            uni.$emit('fileName',{fileName:res.tempFiles[0].name.split('.')[0]})
                        },500)
                        //uni.$emit('update',{msg:'页面更新'})
                        fsm.readFile({
                            filePath:res.tempFiles[0].path,
                            encoding:"utf-8",
                            success:(res) => {
                                setTimeout(() => {
                                    uni.$emit('rawMD',{rawMD:res.data})
                                },500)
                                uni.navigateTo({
                                    url:"/pages/priview/priview"
                                })
                            }
                        })
                    },
                    fail:(err) =>{
                        console.log(err)
                    }
                })


        },
        toEditPage(){
            uni.navigateTo({
                url:"/pages/edit/edit"
            })
        },
        toUsePage(){
            uni.navigateTo({
                url:"/pages/how2use/how2use"
            })
        },
        getVersion(){
            const info = wx.getAccountInfoSync()
            if(info.miniProgram.version){
                this.version = info.miniProgram.version
            }
            
        }
        },

    }
</script>

<style>
.logo{
    width:100rpx;
    height:100rpx;
    margin-left:325rpx;
    margin-top:200rpx
}

.slogan{
    width:100%;
    text-align: center;
    color: #909399;
}

.priview-logo{
    width:100rpx;
    height:100rpx;
    margin-left:325rpx;
    margin-top:50rpx
}

.info{
    width:100%;
    position: absolute;
    bottom: 30rpx;
    text-align: center;
    color: #909399;
    font-size:28rpx
}
</style>