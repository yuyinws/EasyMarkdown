<script>
	export default {
		onLaunch: function() {
			this.initMarked();
			this.checkUpdate();

		},
		onShow: function() {
			//console.log('App Show')
		},
		onHide: function() {
			//console.log('App Hide')
		},
		methods: {
			initMarked() {
				let render = new this.marked.Renderer()
				render.image = function(href,title,text){
					return `<img src="${href}" class="md_img" >`
				};
				render.blockquote = function(quote){
					return `<blockquote class="md_blockquote"><p>${quote}</p></blockquote>`
				};
				render.table = function(header,body){
					return `<div class="md_table">${header}${body}</div>`
				};
				render.codespan = function(src){
					return `${src}1212`
					//return `<pre><code class="language-${infostring}">${code}</code></pre>`
				};
				this.marked.setOptions({
				renderer: render,
				highlight: (code,language) => {
					const validLanguage = this.hljs.getLanguage(language) ? language : 'plaintext';
					return this.hljs.highlight(validLanguage, code).value;
				},
				gfm: true,
				tables: true,
				breaks: true,
				pedantic: false,
				sanitize: false,
				smartLists: true,
				smartypants: false,
				});
			},
			checkUpdate(){
				const updateManager = wx.getUpdateManager()
				updateManager.onCheckForUpdate(function (res) {
				// 请求完新版本信息的回调
				})
				updateManager.onUpdateReady(function () {
				wx.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate()
					}
					}
				})
				})
				updateManager.onUpdateFailed(function () {
					wx.showToast({
						title:"更新失败！",
						icon:"none",
						duration:2000
					})
				})

			}
		},
	}
</script>

<style>
@import "/wxcomponents/vant/dist/common/index.wxss";

	/*每个页面公共css */
	body{
		background-color: #ededed;
	}

	.md_img{
		margin-left:145rpx;
		width:400rpx;
		height:auto;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}

	.md_blockquote {
		border-left: 8rpx solid #42b983;
		padding: 10rpx 15rpx;
		color:#777;
		background-color: #eef8f2;
	}

	.md_table {
		border:1px solid
	}
</style>
