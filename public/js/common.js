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

function loadSwalAndRun() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwal)
  } else {
    initSwal()
  }

  function initSwal() {
    const script = document.createElement('script')
    script.src =
      'https://unpkg.com/sweetalert2@11.26.17/dist/sweetalert2.all.min.js'
    script.crossOrigin = 'anonymous'

    script.onload = () => {
      const STORAGE_KEY = 'swal_no_remind_date'
      const today = new Date().toISOString().slice(0, 10)
      const noRemindDate = localStorage.getItem(STORAGE_KEY)

      if (noRemindDate !== today) {
        Swal.fire({
          allowEscapeKey: false,
          allowOutsideClick: false,
          cancelButtonText: '今日不再提示',
          confirmButtonText: '前往注册',
          showCancelButton: true,
          title: '社区赞助计划',
          html: `
            <div style="text-align:justify; line-height:1.8; font-size:16px;">
              <p>简中文档由社区提供长期维护，随着内容逐渐完善、访问量不断增长，服务器与 CDN 等基础设施成本也在持续增加。</p>
              <p>
                为了让文档能够稳定、长期地运行下去，我们选择跟
                <span style="color:#45bded; font-weight:bold; font-size:18px;">雨云</span>
                建立合作关系，由其为项目提供支持。
              </p>
              <h2 style="font-size:22px; font-weight:900; line-height:2.5;">为什么选择雨云</h2>
              <p>雨云是一家国产云计算服务提供商，提供常见开发与部署场景的云服务产品，包括：</p>
              <ul style="margin:12px 0px 12px 16px; list-style: disc;">
                <li>☁️ 云服务器、🛡️ 物理机、🖥️ 显卡云</li>
                <li>🌐 域名注册、🔒 SSL 证书、🚀 CDN</li>
                <li>🐳 Docker 云应用、📦 对象存储</li>
              </ul>
              <p>
                如果您
                <span style="color:#45bded; font-weight:bold; font-size:18px;">正好有相关需求</span>，
                可以了解一下雨云的产品。通过下方链接注册，您将获得：
              </p>
              <ul style="margin:12px 0px 0px 16px; list-style: disc;">
                <li>🎁 首月无门槛 <span style="color:#e53e3e; font-weight:bold; font-size:18px;">5 折</span> 优惠</li>
                <li>💰 会员消费最高 <span style="color:#e53e3e; font-weight:bold; font-size:18px;">20%</span> 返利</li>
              </ul>
            </div>
          `,
          preConfirm: () => {
            window.open('https://www.rainyun.com/mm_?s=zhcndoc', '_blank')
          },
          didOpen: () => {
            Swal.getConfirmButton().dataset.umamiEvent = 'ads-swal-click'
            Swal.getCancelButton().dataset.umamiEvent = 'ads-swal-close'
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.cancel) {
            localStorage.setItem(STORAGE_KEY, today)
          }
        })
      }
    }

    document.head.appendChild(script)
  }
}

if (window.location.hostname.endsWith('zhcndoc.com')) {
  loadBaiduAnalytics()
  loadUmami()
  loadSwalAndRun()
}
