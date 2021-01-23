<template>
  <div style="height: 100%; position: absolute; width: 100%">
    <textarea
      class="fileName"
      name="fileName"
      id="fileName"
      v-model="fileName"
      placeholder="请输入文档名称"
    >
    </textarea>
    <textarea
      class="extend"
      disabled="disabled"
      name="extend"
      id="extend"
      value=".md"
    >
    </textarea>
    <div class="tips">
      <span class="tip" style="margin-left: 1.5%" @click="tip('#')">#</span>
      <span
        class="tip"
        style="margin-left: 11.5%; line-height: 80rpx"
        @click="tip('*')"
        >*</span
      >
      <span class="tip" style="margin-left: 21.5%" @click="tip('-')">-</span>
      <span
        class="tip"
        style="margin-left: 31.5%; font-size: 24rpx"
        @click="tip('code')"
        >{{ code }}</span
      >
      <span class="tip" style="margin-left: 41.5%" @click="tip('link')"
        >🔗</span
      >
    </div>
    <textarea
      class="markDown"
      name="markDown"
      placeholder="开始你的markdown编写..."
      id="markDown"
      v-model="rawMD"
      :maxlength="-1"
    ></textarea>
    <div style="width: 95%; margin-left: 2.5%; margin-top: 2.5%">
      <van-grid column-num="4">
        <van-grid-item @click="priview" icon="eye-o" text="预览" />
        <van-grid-item @click="download" icon="down" text="下载" />
        <van-grid-item @click="clear" icon="delete-o" text="清空" />
        <van-grid-item @click="copy" icon="https://www.yuyinws.top/storage/images/icon/emd-copy.png" text="复制" />
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rawMD: "",
      fileName: "",
      code: "</>",
    };
  },
  onLoad() {
    this.marked.setOptions({
      renderer: new this.marked.Renderer(),
      highlight: (code) => {
        return this.hljs.highlightAuto(code).value;
      },
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    });
    let that = this;
    uni.$once("editFileName", function (data) {
      that.fileName = data.fileName;
    });
    uni.$once("editRawMD", function (data) {
      that.rawMD = data.rawMD;
    });
  },
  methods: {
    copy(){
      let that = this
      if(!that.rawMD){
        return
      }
      uni.setClipboardData({
        data:that.rawMD
      })
    },
    clear() {
      let that = this;
      if(!that.rawMD){
        return
      }
      uni.showModal({
        content:
          "确定要清空文档内容吗?",
        buttonText: "确定",
        success: () => {
          that.rawMD = ""
        },
      });
    },
    tip(tip) {
      if (tip == "code") {
        tip = "``` js\ninput your code\n```";
      } else if (tip == "link") {
        tip = "[url](https://)";
      }
      this.rawMD = this.rawMD + tip;
    },
    check() {
      if (!this.fileName) {
        uni.showToast({
          title: "请输入文档名称",
          icon: "none",
          duration: 2000,
        });
        return false;
      } else if (!this.rawMD) {
        uni.showToast({
          title: "请输入文档内容",
          icon: "none",
          duration: 2000,
        });
        return false;
      } else {
        return true;
      }
    },
    download() {
      if (!this.check()) {
        return;
      }
      uni.showLoading();
      let that = this;
      uni.request({
        url: "https://www.yuyinws.top/api/mdUpload",
        method: "POST",
        data: {
          rawMD: that.rawMD,
          fileName: that.fileName + ".md",
        },
        success: (res) => {
          uni.hideLoading();
          if (res.data.code == 200) {
            uni.setClipboardData({
              data: res.data.downloadUrl,
              success: () => {
                uni.hideToast();
                uni.showModal({
                  content:
                    "下载链接已经保存到剪切板，请打开浏览器进行下载。下载有效期为1个小时!",
                  showCancel: false,
                  buttonText: "确定",
                  success: () => {},
                });
              },
            });
          }
        },
        fail: (err) => {
          uni.hideLoading();
          uni.showToast({
            title: "获取下载链接失败",
            duration: 2000,
          });
          console.log(err);
        },
      });
    },

    priview() {
      if (!this.check()) {
        return;
      }
      let that = this;
      // console.log(that.rawMD)
      // return
      setTimeout(() => {
        uni.$emit("priviewRawMD", { rawMD: that.rawMD });
      }, 500);
      uni.redirectTo({
        url: "/pages/priview/priview?fileName=" + that.fileName,
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
.priview {
  width: 60rpx;
  height: 60rpx;
  display: inline-block;
}

.download {
  width: 60rpx;
  height: 60rpx;
  display: inline-block;
}

.markDown {
  height: 65%;
  padding: 2.5%;
  width: 90%;
  margin-left: 2.5%;
  margin-top: 20rpx;
  border-radius: 10rpx;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.fileName {
  height: 3%;
  background-color: white;
  padding: 2.5%;
  width: 72%;
  margin-left: 2.5%;
  margin-top: 2.5%;
  border-radius: 10rpx;
  display: inline-block;
}

.extend {
  height: 3%;
  background-color: #dbdee2;
  padding: 2.5%;
  width: 10%;
  margin-left: 2.5%;
  margin-top: 2.5%;
  border-radius: 10rpx;
  display: inline-block;
}

.tips {
  height: 5%;
  margin-top: 1.5%;
  width: 95%;
  margin-left: 2.5%;
}

.tip {
  width: 60rpx;
  height: 60rpx;
  position: absolute;
  background-color: #dbdee2;
  text-align: center;
  line-height: 60rpx;
  font-size: 36rpx;
  border-radius: 10rpx;
}

.operation {
  margin-top: 2.5%;
  width: 95%;
  margin-left: 2.5%;
  height: 8%;
  display: inline-block;
}

.van-grid-item {
  background-color: red !important;
}
</style>
