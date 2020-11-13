// pages/personalSettings/personalSettings.js
import clientReq from "../../utils/axios.js"
import WxValidate from '../../utils/wxValidata.js'
import CryptoJS from "../../utils/ase.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: '',
    flag: '',
    dialogShow: false,
    tempAvatar: '',
    dialogShow1: false,
    dialogShow2: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    oldPwd: '',
    newPwd: '',
    againPwd:''
  },
  //首页跳转事件
  goHome() {
    wx.navigateTo({
      url: "/pages/login/login",
      success: function(res) {
        wx.setStorageSync('userToken', "");
        wx.setStorageSync('userId', "");
      },
      fail: (msg) => {
        console.log(msg)
      }
    })
  },
  gogogo(){
    wx.navigateTo({
      url: '/pages/emoji/emoji',
    })
  },
  // 打开修改手机/邮箱弹窗
  openConfirm(e) {
    this.setData({
      dialogShow: true,
      flag: e.currentTarget.dataset.flag
    })
  },
  openConfirm1(e) {
    this.setData({
      dialogShow1: true,
      tempAvatar: this.data.userData.icon
    })
  },
  openConfirm2(e) {
    this.setData({
      dialogShow2: true,
      oldPwd: '',
      newPwd: '',
      againPwd: ''
    })
  },
  // 输入框事件
  inputedit(e) {
    let flag
    if (this.data.flag == '邮箱') {
      flag = 'userData.eMail'
    } else {
      flag = 'userData.phoneNum'
    }
    this.setData({
      [flag]: e.detail.value
    })
  },
  inputedit1(e) {
    this.setData({
      'oldPwd': e.detail.value
    })
  },
  inputedit2(e) {
    this.setData({
      'newPwd': e.detail.value
    })
  },
  inputedit3(e) {
    this.setData({
      'againPwd': e.detail.value
    })
  },
  // 修改手机/邮箱弹窗确认事件
  tapDialogButton(e) {
    // console.log(e.detail.item.text)
    if (e.detail.item.text == '确定') {
      let _this = this
      clientReq(
        wx,
        "/user/updateUser", _this.data.userData, (state, rspMessage, rspData) => {
          console.log(state, rspMessage, rspData)
          if (state == "FAIL") {
            console.log("FAIL")
          }
          if (state == "ERROR") {
            console.log(rspMessage)
          }
          if (state == "SUCCESS") {
            this.getUserData()
          }

        }, "server")
    }
    this.setData({
      dialogShow: false,
    })
  },
  // 修改头像弹窗确认事件
  tapDialogButton1(e) {
    if (e.detail.item.text == '确定') {
      let _this = this

      let tempBase64 = 'data:image/png;base64,' + wx.getFileSystemManager().readFileSync(this.data.tempAvatar, 'base64')

      this.setData({
        'userData.icon': tempBase64,
      })
      clientReq(
        wx,
        "/user/updateUser", _this.data.userData, (state, rspMessage, rspData) => {
          console.log(state, rspMessage, rspData)
          if (state == "FAIL") {
            console.log("FAIL")
          }
          if (state == "ERROR") {
            console.log(rspMessage)
          }
          if (state == "SUCCESS") {
            this.getUserData()
          }

        }, "server")
    }
    this.setData({
      dialogShow1: false,
    })
  },
  // 修改密码弹窗确认事件
  tapDialogButton2(e) {
    if (e.detail.item.text == '确定') {
      let _this = this
      if (!this.data.oldPwd.trim()) {
        return this.showModal('请输入旧密码')
      } else if (this.data.newPwd.trim().length < 6 || this.data.newPwd.trim().length > 16) {
        return this.showModal('密码为6~16位的任意字符')
      } else if (this.data.againPwd.trim() != this.data.newPwd.trim()) {
        return this.showModal('两次密码不一致')
      }
      let reqData = {
        password: this.data.oldPwd,
        newPassword: this.data.newPwd
      };
      clientReq(
        wx,
        "/user/updateUserPwd", reqData, (state, rspMessage, rspData) => {
          console.log(state, rspMessage, rspData)
          if (state == "FAIL") {
            return this.showModal(rspMessage)
          }
          if (state == "ERROR") {
            return this.showModal(rspMessage)
          }
          if (state == "SUCCESS") {

          }
        }, "server")
    }
    this.setData({
      dialogShow2: false,
    })
  },
  // 更换头像
  changeavatr() {
    // let _this = this
    // wx.chooseImage({
    //   count: 1, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: [  'album'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function(res) {
    //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //     var imgPaths = res.tempFilePaths
    //     console.log(imgPaths)
    //     // that.updataheadservice(imgPaths[0]);
    //     _this.setData({
    //       tempAvatar: imgPaths[0]
    //     })
    //   }
    // })

    var that = this
    wx.showActionSheet({
      itemList: ['拍照', '从相册中选择'],
      success(res) {
        console.log(res.tapIndex)
        let sourceType = 'camera'
        if (res.tapIndex == 0) {
          sourceType = 'camera'
        } else if (res.tapIndex == 1) {
          sourceType = 'album'
        }
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: [sourceType], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var imgPaths = res.tempFilePaths
            console.log(imgPaths)
            // that.updataheadservice(imgPaths[0]);
            that.setData({
              tempAvatar: imgPaths[0]
            })
          }
        })
      },
    })
  },
  // 请求用户数据
  getUserData() {
    clientReq(
      wx,
      "/user/selectUserDataById", {
        userId: wx.getStorageSync('userId'),
      }, (state, rspMessage, rspData) => {
        if (state == "FAIL") {
          console.log("FAIL")
        }
        if (state == "ERROR") {
          console.log(rspMessage)
        }
        if (state == "SUCCESS") {
          this.setData({
            userData: rspData,
          })
        }

      }, "server")
  },

  //报错 
  showModal(error) {
    wx.showModal({
      content: error,
      showCancel: false,
    })
  },
  //密码加密事件
  getAesString(data) {
      // var key1 = "chen20190103java"; //密钥
      // var iv1 = "chen20190103java";
      var key = CryptoJS.enc.Utf8.parse('BaoWei@ChongQing');
      var iv = CryptoJS.enc.Utf8.parse('BaoWei@ChongQing');
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      // console.log(encrypted.toString())
      // console.log(this.decrypt(encrypted.toString()))
      return encrypted.toString(); //返回的是base64格式的密文
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getUserData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})