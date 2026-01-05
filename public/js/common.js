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

function loadCopyright() {
  const copyright = document.getElementById('zhcndoc-copyright');
  
  if (copyright) {
    copyright.innerHTML = `
      <p style="text-decoration: none;">
        <a target="_blank" href="https://www.zhcndoc.com">简中文档</a>
        <span> | </span>
        <a rel="nofollow" target="_blank" href="https://beian.miit.gov.cn">沪ICP备2024070610号-3</a>
      </p>
    `;
  }
}

if (window.location.hostname.endsWith('zhcndoc.com')) {
  loadBaiduAnalytics()
  loadUmami()
  loadCopyright()
}
