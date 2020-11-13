//index.js
//获取应用实例
const app = getApp()
import clientReq from "../../utils/axios.js"
const jwtDecode = require("jwt-decode")
Page({
  data: {
    rules: [],
    isUserNameCancel: false,
    isPasswordCancel: false,
    formData: {
      userName: "",
      password: ""
    }
  },
  methods: {

  },
  //input框数据变化事件
  inputChange(val) {
    switch (val.target.id) {
      case "userName":
        this.data.formData.userName = val.detail.value;
        this.setData({
          isUserNameCancel: val.detail.value ? false : true
        });
        break;
      case "password":
        this.data.formData.password = val.detail.value;
        this.setData({
          isPasswordCancel: val.detail.value ? false : true
        });
        break;
    }

  },
  //登录点击事件
  submitForm() {
    app.globalData.user = 'res.data.data.uid'
    clientReq(
      wx,
      "/user/login", {
        account: this.data.formData.userName,
        password: this.data.formData.password
      }, (state, rspMessage, rspData) => {
        if (state == "FAIL") {
          console.log("FAIL")
        }
        if (state == "ERROR") {
          console.log(rspMessage)
        }
        if (state == "SUCCESS") {
          wx.setStorageSync('userToken', rspData.userToken);
          wx.setStorageSync('userId', jwtDecode(rspData.userToken).userId);
          wx.switchTab({
            url: '../index/index'
          })
        }

      }, "server")
  },
  onLoad: function () {
    let token = wx.getStorageSync("userToken");
    if (token) {
      wx.switchTab({
        url: '../index/index'
      })
    }
  }
})
