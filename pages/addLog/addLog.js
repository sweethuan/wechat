// pages/addLog/addLog.js
import clientReq from "../../utils/axios.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addLogData: {
      gzrq: '',
      ssxm: '',
      ywlx: '',
      xhsc: '',
      wcjd: '',
      gznr: '',
      canDelete: false,
      isContentEmpty: false,
      isPercentEmpty: false,
      isProjectEmpty: false,
      isTimeEmpty: false,
      isTypeEmpty: false,
      xh: 1
    },
    projectData: [],
    toSData: [],
    today: '',
  },
  // 选择日期
  bindDateChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'addLogData.gzrq': e.detail.value
    })
  },
  // 选择项目
  changeX(e) {
    // console.log(e)
    this.setData({
      'addLogData.ssxm': this.data.projectData[e.detail.value].itemName
    })
  },
  // 选择业务类型
  changeY(e) {
    //console.log(e)
    this.setData({
      'addLogData.ywlx': this.data.toSData[e.detail.value].itemName
    })
  },
  // 时长
  changeSC(e) {
    //console.log(typeof +e.detail.value)
    let date
    if (+e.detail.value > 24) {
      date = 24
    } else if (+e.detail.value < 0) {
      date = 0
    } else {
      date = e.detail.value
    }
    this.setData({
      'addLogData.xhsc': date
    })
  },
  // 进度
  changeJD(e) {
    let jd
    if (+e.detail.value > 100) {
      jd = 100
    } else if (+e.detail.value < 0) {
      jd = 0
    } else {
      jd = e.detail.value
    }
    this.setData({
      'addLogData.wcjd': jd
    })
  },
  // 内容
  bindinput(e) {
    this.setData({
      'addLogData.gznr': e.detail.value
    })
  },
  // 返回上一级
  goHome() {
    wx.navigateBack()
  },
  // 重置
  reset() {
    this.setData({
      addLogData: {
        gzrq: '',
        ssxm: '',
        ywlx: '',
        xhsc: '',
        wcjd: '',
        gznr: '',
        canDelete: false,
        isContentEmpty: false,
        isPercentEmpty: false,
        isProjectEmpty: false,
        isTimeEmpty: false,
        isTypeEmpty: false,
        xh: 1
      }
    })
  },
  //
  sava() {
    if (!this.data.addLogData.gzrq.trim()) {
      return this.showModal('请选择日期')
    } else if (!this.data.addLogData.ssxm.trim()) {
      return this.showModal('请选择项目')
    } else if (!this.data.addLogData.ywlx.trim()) {
      return this.showModal('请选择类型')
    } else if (!this.data.addLogData.xhsc.trim()) {
      return this.showModal('请输入时长')
    } else if (!this.data.addLogData.wcjd.trim()) {
      return this.showModal('请输入进度')
    } else if (!this.data.addLogData.gznr.trim()) {
      return this.showModal('请选择工作内容')
    }

    clientReq(
      wx,
      "/workLog/addWorkLog", { addList: [this.data.addLogData]}, (state, rspMessage, rspData) => {
        if (state == "FAIL") {
          this.selectComponent("#customMsg").error("查询失败！")
        }
        if (state == "ERROR") {
          console.log(rspMessage)
          this.selectComponent("#customMsg").error(rspMessage)
        }
        if (state == "SUCCESS") {
          // console.log(rspData)
          wx.switchTab({
            url: '/pages/index/index'
          })
        }

      })
  },
  //报错 
  showModal(error) {
    wx.showModal({
      content: error,
      showCancel: false,
    })
  },
  //获取所有项目信息
  getDictData() {
    clientReq(
      wx,
      "/dictItem/selectDictionaryByCondition", {
        dictId: "7f84919bfd254ba9b658dae71e1c826a",
        pid: "",
        status: "1",
        dim: ""
      }, (state, rspMessage, rspData) => {
        if (state == "FAIL") {
          this.selectComponent("#customMsg").error("查询失败！")
        }
        if (state == "ERROR") {
          console.log(rspMessage)
          this.selectComponent("#customMsg").error(rspMessage)
        }
        if (state == "SUCCESS") {
          // console.log(rspData)
          this.setData({
            projectData: rspData
          })
        }

      }, "server")
  },
  //获取业务类型信息
  getToSData() {
    clientReq(
      wx,
      "/dictItem/selectDictionaryByCondition", {
        dictId: "1f0ea74a23454119b1ab6c81d919b9d2",
        pid: "",
        status: "1",
        dim: ""
      }, (state, rspMessage, rspData) => {
        if (state == "FAIL") {
          this.selectComponent("#customMsg").error("查询失败！")
        }
        if (state == "ERROR") {
          console.log(rspMessage)
          this.selectComponent("#customMsg").error(rspMessage)
        }
        if (state == "SUCCESS") {
          // console.log(rspData)
          this.setData({
            toSData: rspData
          })
        }
      }, "server")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDictData()
    this.getToSData()
    let today = new Date()
    let y = today.getFullYear()
    let m = (today.getMonth() + 1 + '').padStart(2, '0')
    let d = (today.getDate() + '').padStart(2, '0')
    let todays = y + "-" + m + "-" + d

    this.setData({
      today: todays
    })
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