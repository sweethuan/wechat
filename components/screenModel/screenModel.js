// components/screenModel/screenModel.js
import clientReq from "../../utils/axios.js"
Component({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false, //模块显示控制
    //表单信息
    whereForm: {
      userName: "",
      gzrqEnd: "",
      gzrqStart: "",
      pageCurrent: 1,
      pageSize: 10,
      sfsh: 0,
      ssxm: "",
      ywlx: "",
    },
    //登记人列表
    userNameData: [],
    projectData: [],
    toSData: [],
    signData: [{
      value: '已签约',
      key: 1
    }, {
      value: '未签约',
      key: ''
    }]
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {
      this.getUserNameData()
      this.getDictData()
      this.getToSData()
    },
  },

  methods: {
    //弹窗关闭事件
    close() {
      this.setData({
        isShow: false
      })
    },
    //弹窗打开事件
    show() {
      this.setData({
        isShow: true
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
    //获取登记人信息
    getUserNameData() {
      clientReq(
        wx,
        "/workLog/selectUserNameAll", {}, (state, rspMessage, rspData) => {
          if (state == "FAIL") {
            this.selectComponent("#customMsg").cancel("查询失败！")
          }
          if (state == "ERROR") {
            console.log(rspMessage)
            this.selectComponent("#customMsg").cancel(rspMessage)
          }
          if (state == "SUCCESS") {
            // rspData.unshift({
            //   userName:"全部",
            //   userId:"0"
            // })
            this.setData({
              userNameData: rspData
            })
          }

        })
    },
    // 选择登记人
    changeR(e) {
      //console.log(e)
      this.setData({
        'whereForm.userName': this.data.userNameData[e.detail.value].userName
      })
    },
    // 选择项目
    changeX(e) {
      //console.log(e)
      this.setData({
        'whereForm.ssxm': this.data.projectData[e.detail.value].itemName
      })
    },
    // 选择业务类型
    changeY(e) {
      //console.log(e)
      this.setData({
        'whereForm.ywlx': this.data.toSData[e.detail.value].itemName
      })
    },
    // 选择签约
    changeQ(e) {
      //console.log(e)
      this.setData({
        'whereForm.sfsh': this.data.signData[e.detail.value].key
      })
    },
    bindStartDateChange(e) {
      // console.log(e)
      this.setData({
        'whereForm.gzrqStart': e.detail.value
      })
    },
    bindEndDateChange(e) {
      console.log(e)
      this.setData({
        'whereForm.gzrqEnd': e.detail.value
      })
    },
    // 重置
    formReset(e) {
      let whereForm = {
        userName: "",
        gzrqEnd: "",
        gzrqStart: "",
        pageCurrent: 1,
        pageSize: 10,
        sfsh: 0,
        ssxm: "",
        ywlx: "",
      }
      this.setData({
        //chosen: ''
        whereForm: whereForm
      })
    },
    formSubmit(e) {
      this.close()
      this.triggerEvent("changFormData", this.data.whereForm)
    }
  }

})