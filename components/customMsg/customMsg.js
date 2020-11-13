Component({

  behaviors: [],

  properties: {
    // isShow: { // 属性名
    //   type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
    //   value: false, // 属性初始值（可选），如果未指定则会根据类型选择一个
    //   observer: function (newVal, oldVal) {// 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    //      console.log(newVal,oldVal)
    //      setTimeout(()=>{
    //        this.properties.isShow=false;
    //      },1000)
    //   } 
    // },
    // myProperty2: String // 简化的定义方式
  },
  data: {
    isShow:false, //显示控制
    text:"",//弹出条文字
    iconType:""//左侧图标文字
  }, // 私有数据，可用于模版渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
  },

  methods: {
    //延时自动隐藏事件
    latencyHiding(){
      setTimeout(() => {
        this.setData({
          isShow: false
        })
      }, 1500)
    },
    //成功弹窗弹出事件
     success(txt){
       this.setData({
         isShow: true,
         text: txt ? txt:"操作成功",
         iconType:"success"
       })
      this.latencyHiding()
     },
     //失败弹窗弹出事件
    cancel(txt){
         this.setData({
           isShow: true,
           text: txt ? txt : "操作失败",
           iconType: "cancel"
         })
         this.latencyHiding()
     }
  }

})