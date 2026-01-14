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
    const style = document.createElement('style')
    style.textContent = `.swal2-popup { max-width: 290px; }
      .swal2-html-container { margin: 0 !important; padding: 2px !important; }
      .swal2-actions { justify-content: flex-end !important; gap: 10px !important; padding: 0 !important; }
      .swal2-styled { margin: 0 !important; padding: 8px !important; font-size: 14px !important; border: none !important; }
      .swal2-confirm { background-color: #ff3f57 !important; color: white !important; }
      .swal2-confirm:hover { background-color: #f1223c !important; }
      .swal2-cancel { background-color: #6b7280 !important; color: white !important; }
      .swal2-cancel:hover { background-color: #4b5563 !important; }`
    document.head.appendChild(style)

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
          cancelButtonText: '稍后再看',
          confirmButtonText: '了解详情',
          position: 'bottom-end',
          showCancelButton: true,
          toast: true,
          html: `
            <div style="text-align: justify; line-height: 1.8; font-size: 15px;">
              <p><span style="color: #ff3f57; font-weight: bold;">简中文档</span>由社区提供维护，随着访问量不断增长，服务器与 CDN 等基础设施成本也在持续增加。</p>
              <p>为了文档能够稳定、长期地运行下去，我们与<span style="color: #ff3f57; font-weight: bold;">雨云</span>建立合作关系，由其为本项目提供技术支持。</p>
              <h2 style="font-size: 17px; font-weight: 900; line-height: 2;">为什么选择雨云</h2>
              <p>雨云是一家国产云计算服务商，提供常见开发与部署场景的云服务产品：</p>
              <ul style="margin: 6px 0px; font-size: 14px;">
                <li>☁️ 云服务器、🛡️ 物理机、🖥️ 显卡云</li>
                <li>🌐 域名注册、🔒 SSL 证书、🚀 CDN</li>
                <li>🐳 Docker 云应用、📦 对象存储</li>
              </ul>
              <p>如果您<span style="color: #ff3f57; font-weight: bold;">正好有相关需求</span>，可以了解一下雨云的产品。</p>
            </div>
          `,
          preConfirm: () => {
            window.open(
              atob('aHR0cHM6Ly93d3cucmFpbnl1bi5jb20vbW1fP3M9emhjbmRvYw'),
            )
          },
          didOpen: () => {
            Swal.getConfirmButton().dataset.umamiEvent = 'ads-swal-click'
            // Swal.getCancelButton().dataset.umamiEvent = 'ads-swal-close'
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
}

loadSwalAndRun()
