// 将函数挂载window，满足 href="javascript:getCode()" 调用
window.getCode = function(type) {
  const popover = document.getElementById('qrModal')
  const titleDom = document.getElementById('qr-title')
  const imgDom = document.getElementById('qr-img')

  const qrAsset = {
    weixin: {
      title: '扫码添加我的微信',
      src: '/img/social/weixincode.webp'
    },
    qq: {
      title: '扫码添加我的QQ',
      src: '/img/social/qqcode.webp'
    }
  }

  const assetInfo = qrAsset[type]
  titleDom.innerText = assetInfo.title
  imgDom.src = assetInfo.src

  popover.classList.add('show')
}

// 关闭弹窗公共函数
function closeQRModal() {
  const popover = document.getElementById('qrModal')
  popover.classList.remove('show')
}

// 1.点击右上角 × 关闭
document.addEventListener('click', e => {
  if (e.target.classList.contains('qr-close')) {
    closeQRModal()
  }
})

// 2.点击遮罩空白区域关闭（点击弹窗内部不会关闭）
document.addEventListener('click', e => {
  const popover = document.getElementById('qrModal')
  if (e.target === popover) {
    closeQRModal()
  }
})

// PJax切换页面自动关闭弹窗
document.addEventListener('pjax:complete', () => {
  closeQRModal()
})