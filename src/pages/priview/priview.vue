<!--
 * @Descripttion: 
 * @Author: lyc
 * @Date: 2021-01-22 16:02:37
 * @LastEditTime: 2021-01-27 17:08:40
 * @FilePath: \easy-markdown\src\pages\priview\priview.vue
-->
<template>
    <div style="height:100%;position:absolute;width:100%">
        <!-- <button @click="toEditPage">编辑</button> -->
        <div class="preview" v-html="markedMD"></div>
        <img @click="toEditPage" src="https://www.yuyinws.top/storage/images/icon/emd-edit.png" class="edit">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fileName:"",
                rawMD:"",
                markedMD:""
            }
        },
        onLoad(event){
            let that = this
            uni.$once('fileName',function(data){
            uni.setNavigationBarTitle({
                title: '正在预览-'+data.fileName+'.md'
            });
            that.fileName = data.fileName
            })
            uni.$once('rawMD',function(data){
                that.rawMD = data.rawMD 
                that.markedMD = that.marked(data.rawMD)
                console.log(that.markedMD)
            })
            uni.$once('priviewRawMD',function(data){
                that.rawMD = data.rawMD
                that.markedMD = that.marked(data.rawMD)
                console.log(that.markedMD)
            })
            if(event.fileName){
                that.fileName = event.fileName
                uni.setNavigationBarTitle({
                    title: '正在预览-'+event.fileName+'.md'
                });
            }

        },
        methods: {
            toEditPage() {
                let that = this
                setTimeout(() => {
                    uni.$emit('editRawMD',{rawMD:that.rawMD})
                },500)
                setTimeout(() => {
                    uni.$emit('editFileName',{fileName:that.fileName})
                },500)
                uni.redirectTo({
                    url:'/pages/edit/edit',
                })
            }
        },
    }
</script>

<style scoped>
.preview {
  background-color: white;
  padding: 2.5%;
  width: 90%;
  margin-left: 2.5%;
  margin-top: 30rpx;
  border-radius: 10rpx;
  height:92%;
  overflow:auto;
  line-height: 80rpx;
}

.edit{
  width:60rpx;
  height: 60rpx;
  position: absolute;
  right:50rpx;
  bottom: 100rpx;
  z-index: 99;
}

table{
    border:1px solid
}
</style>