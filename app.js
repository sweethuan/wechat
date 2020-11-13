//app.js
import "./utils/util.js"
require('./utils/v-request.js')
// import jwtDecode from "jwt-decode"; 

App({
  onLaunch: function () {
    wx.cloud.init({
      traceUser: true,
      env: "admin-7t65b"
    })
  },
  globalData:{

    user:null

    }
  
})