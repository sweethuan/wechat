/**
 * this.$clientReq(
 *  参数1：wx
 *  参数2：url
 *  参数3：请求参数(reqData)
 *  参数4：回调函数(fn)
 *  参数5：请求类型 (server,client) 默认：client
 * )
*/
let serverUrl = "http://222.217.61.68:8888/pms-admin/api/v1"
let clientUrl = "http://222.217.61.68:8888/pms/api/v1";

var clientReq = function (wx, url, reqData, fn, urlType) {
  let commonUrl = "";
  if (urlType == "server") {
    commonUrl = serverUrl
  } else {
    commonUrl = clientUrl
  }
  wx.request({
    url: commonUrl + url, //仅为示例，并非真实接口地址。
    data: createParameter(reqData),
    method: "post",
    header: {
      "H-User-Token": wx.getStorageSync('userToken')
    },
    success: res => {
      let response = res.data;
      if (typeof response == 'undefined') {
        fn('FAIL', '请求失败！');
      } else {
        if (response.rspCode == '03') {
          ajaxToken(wx, url, reqData, fn, urlType, clientReq);
        } else if (response.rspCode == '02') {
          // wx.showToast({
          //   title: response.rspMessage,
          //   icon: 'cancel',
          //   duration: 100000
          // })
          getLogin(wx)
        } else if (response.rspCode == '00') {
          fn('SUCCESS', response.rspMessage, response.rspData)

        } else {
          fn('ERROR', response.rspMessage)
        }
      }

    },
    fail: msg => {
      console.log(msg)
      fn('FAIL', '请求失败！');
    }
  });

}
//token超时续期
function ajaxToken(wx, url, reqData, fn, urlType, wxReq) {
  wx.request({
    url: serverUrl + "/token/tokenExtension",
    data: createParameter({}),
    header: {
      "Content-Type": "application/json"
    },
    success: res => {

      let response = res.data;
      if (typeof response == 'undefined') {
        fn('FAIL', 'Token续期失败');
      } else {
        if (response.rspCode == '00') {
          wx.setStorageSync('userToken', response.rspData.userToken);
          wxReq(wx, url, reqData, fn, urlType);
        } else {
          //跳登录页
          fn('FAIL', 'Token续期失败');
          getLogin(wx)
        }
      }
    },
    fail: msg => {
      fn('FAIL', 'Token续期失败');
      getLogin(wx)
    }
  })
}
function getLogin(wx) {
  console.log('come')
  setTimeout(() => {
    wx.navigateTo({
      url: "../login/login", success: function (res) {
        wx.setStorageSync('userToken', "");
      }, fail: (msg) => { console.log(msg) }
    });
  }, 1000)
}
const createParameter = reqData => {
  let sendData = {
    "appId": "hz_app",
    "signType": "signType",
    "sign": "sign",
    "reqTime": (new Date()).Format("yyyy-MM-dd hh:mm:ss:S"),
    "method": "method",
    reqData: reqData
  }
  return sendData;
}


export default clientReq;