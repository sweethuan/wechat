// pages/index/index.js
import clientReq from "../../utils/axios.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customMsgIsShow: false,
    pageCurrent: 1,
    dateFlag: false,
    tableList: [],
    whereForm: {
      userName: "",
      gzrqEnd: "",
      gzrqStart: "",
      pageCurrent: 1,
      pageSize: 10,
      sfsh: "",
      ssxm: "",
      ywlx: "",
    }
  },
  //筛选栏点击事件
  screen() {
    this.selectComponent("#screenModel").show()
  },
  // 日期排序
  sortDate() {
    let data
    // 大于是正序  小于是倒叙
    if (this.data.dateFlag) {
      this.setData({
        dateFlag: false
      })
      data = this.data.tableList.sort(function(a, b) {
        return a.gzrq < b.gzrq ? 1 : -1
      })
    } else {
      this.setData({
        dateFlag: true
      })
      data = this.data.tableList.sort(function(a, b) {
        return a.gzrq > b.gzrq ? 1 : -1
      })
    }
    //console.log(data)
    this.setData({
      tableList: data
    })
  },
  getTableList() {
    clientReq(
      wx,
      "/workLog/selectWorkLogByCondition", this.data.whereForm, (state, rspMessage, rspData) => {
        if (state == "FAIL") {
          this.selectComponent("#customMsg").error("查询失败！")
        }
        if (state == "ERROR") {
          this.selectComponent("#customMsg").error(rspMessage)
        }
        if (state == "SUCCESS") {
          wx.stopPullDownRefresh()
          let data = this.data.tableList;
          this.setData({
            tableList: data.concat(rspData.list)
          })
          // this.selectComponent("#customMsg").success("加载完成") 
        }

      })
  },
  goDetailLog(e) {
    let query = e.currentTarget.dataset['item']
    wx.navigateTo({
      url: '/pages/detailLog/detailLog',
      success(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          gzrq: query.gzrq,
          userId: query.userId
        })
      }
    })
  },
  onMyButtonTap() {

  },
  changFormData(e) {
    // console.log(e)
    this.setData({
      whereForm: e.detail,
      tableList: []
    })
    this.getTableList()
  },
  goaddLog() {
    wx.navigateTo({
      url: '/pages/addLog/addLog'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(getApp().globalData.user)
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
    this.getTableList()

    // let that=this;
    // console.log(this.data.whereFrom)
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
    this.setData({
      'whereForm.pageCurrent': 1,
      tableList: []
    })
    this.getTableList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      'whereForm.pageCurrent': this.data.whereForm.pageCurrent + 1
    })
    if(this.data.dateFlag){
      this.sortDate()
    }
    this.getTableList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})