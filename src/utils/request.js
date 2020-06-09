export default (params) => {
  uni.showLoading({
    title: "加载中",
  });
  return new Promise((reslove, reject) => {
    wx.request({
      ...params,
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        reslove(res.data);
      },
      file(err) {
        reject(err);
      },
      complete() {
        uni.hideLoading();
      },
    });
  });
};
