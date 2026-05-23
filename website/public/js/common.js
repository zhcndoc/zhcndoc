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

function loadWwads() {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.charset = 'UTF-8'
  script.src = 'https://cdn.wwads.cn/js/makemoney.js'
  script.async = true
  document.head.appendChild(script)
}

function loadMarkHubAd() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAd)
  } else {
    initAd()
  }

  function initAd() {
    const style = document.createElement('style')
    style.textContent = `.markhub-ad {
      position: fixed;
      right: 16px;
      bottom: 16px;
      z-index: 9999;
      width: 200px;
      max-width: calc(100vw - 24px);
      line-height: 0;
    }
    .markhub-ad__link {
      display: block;
    }
    .markhub-ad__image {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 10px;
      box-shadow: 0 18px 45px rgb(15 23 42 / 22%);
    }
    .markhub-ad__close {
      position: absolute;
      top: 3px;
      right: 3px;
      display: grid;
      width: 22px;
      height: 22px;
      padding: 0;
      place-items: center;
      border: none;
      border-radius: 999px;
      background: rgb(255 255 255 / 20%);
      color: rgb(75 85 99 / 32%);
      cursor: pointer;
      font-size: 18px;
      line-height: 1;
      opacity: 0.3;
      transition:
        background-color 160ms ease,
        color 160ms ease,
        opacity 160ms ease;
    }
    .markhub-ad__close:hover {
      background: rgb(255 255 255 / 62%);
      color: rgb(75 85 99 / 72%);
      opacity: 0.72;
    }`
    document.head.appendChild(style)

    const ad = document.createElement('div')
    ad.className = 'markhub-ad'
    ad.innerHTML = `
      <a class="markhub-ad__link" href="https://open.markhub.top" target="_blank" rel="noopener">
        <img class="markhub-ad__image" src="https://img.meituan.net/poiugc/52bca2debb6f7933630da63c98a8d824101010.webp" alt="MarkHub AI">
      </a>
      <button class="markhub-ad__close" type="button" aria-label="关闭广告">&times;</button>
    `

    ad.querySelector('.markhub-ad__link').addEventListener('click', () => {
      window.umami?.track?.('ads-markhub-click', { source: window.location.hostname })
    })

    ad.querySelector('.markhub-ad__close').addEventListener('click', () => {
      window.umami?.track?.('ads-markhub-close', { source: window.location.hostname })
      ad.remove()
    })

    document.body.appendChild(ad)
  }
}

if (window.location.hostname.endsWith('zhcndoc.com')) {
  loadBaiduAnalytics()
  loadUmami()
}

loadWwads()
loadMarkHubAd()
