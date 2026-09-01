var _hmt = _hmt || []

function loadBaiduAnalytics() {
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?8952f7167d0a961aeccca9dba7df5781'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
}

function loadUmami() {
  const script = document.createElement('script')
  script.defer = true
  script.src = 'https://umami.ikxin.com/script.js'
  script.setAttribute('data-website-id', 'f0e90b0d-e086-4fdc-b173-de4857b71900')
  document.head.appendChild(script)
}

function loadGoogleAnalytics() {
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-HYH4TH7PWM'
  document.head.appendChild(script)
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'G-HYH4TH7PWM')
}

function loadWwads() {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.charset = 'UTF-8'
  script.src = 'https://cdn.wwads.cn/js/makemoney.js'
  script.async = true
  document.head.appendChild(script)
}

if (window.location.hostname.endsWith('zhcndoc.com')) {
  loadBaiduAnalytics()
  loadUmami()
  loadGoogleAnalytics()
}

loadWwads()
