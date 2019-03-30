//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    typelist:[],
    imgUrls:[]
  },

  onLoad: function() {
    var that = this
    
    const db = wx.cloud.database()
    db.collection('ec').get({
      success(res){
        console.log(res.data)
        console.log(res.data[0].dianshang_typelist)
        
        console.log(res.data[2].dianshang_imgUrls)
        that.setData({
          typelist:res.data[0].dianshang_typelist,
          imgUrls: res.data[2].dianshang_imgUrls
        })
      }
    })



    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

 

  swiperchange: function (event) {
    var that = this;
    console.log(event.currentTarget)
    var swiper = event.currentTarget.dataset.swiper.id
    var image = event.currentTarget.dataset.swiper.image
    console.log(image)
    wx.navigateTo({
      url: '/pages/goods-details/goods-details?id=' + swiper + "&image=" + image,
    })
  },

  navigateToShop: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log("navigateToShop--> ID:", id)
    wx.navigateTo({
      url: './good/good?typeId=' + id
    })
  },

  navigateToGood: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(e)
    var typelist = this.data.typelist
    console.log(typelist)
    console.log("navigateToGood--> ID:", id)
    wx.navigateTo({
      url: './good/detail/detail?id=' + id,
    })
  },


  

})
