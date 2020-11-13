const app = getApp()

Page({
  data: {
    audioCtx: null,
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://m10.music.126.net/20200930143309/f860e39f548b3205cf987c9ccb75b97d/ymusic/2f6d/f7c5/d4f5/eae825aa9f717ac7fadc1623bc0ef6d4.mp3',
  },
  audioPlay() {
    this.data.audioCtx.play()
  },
  audioPause() {
    this.data.audioCtx.pause()
  },
  audio14() {
    this.data.audioCtx.seek(60)
  },
  audioStart() {
    this.data.audioCtx.seek(0)
  },
  onLoad: function() {

  },
  getInfo(e) {
    console.log(e)
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          console.log(res)

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onReady: function(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.setData({
      audioCtx: wx.createAudioContext('myAudio')
    })
  },
})