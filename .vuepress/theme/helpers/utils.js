export const hashRE = /#.*$/
export const extRE = /\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^(https?:|mailto:|tel:)/

export function normalize(path) {
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '')
}

export function getHash(path) {
  const match = path.match(hashRE)
  if (match) {
    return match[0]
  }
}

export function isExternal(path) {
  return outboundRE.test(path)
}

export function isMailto(path) {
  return /^mailto:/.test(path)
}

export function isTel(path) {
  return /^tel:/.test(path)
}

export function ensureExt(path) {
  if (isExternal(path)) {
    return path
  }
  const hashMatch = path.match(hashRE)
  const hash = hashMatch ? hashMatch[0] : ''
  const normalized = normalize(path)

  if (endingSlashRE.test(normalized)) {
    return path
  }
  return normalized + '.html' + hash
}

export function isActive(route, path) {
  const routeHash = route.hash
  const linkHash = getHash(path)
  if (linkHash && routeHash !== linkHash) {
    return false
  }
  const routePath = normalize(route.path)
  const pagePath = normalize(path)
  return routePath === pagePath
}

export function resolvePage(pages, rawPath, base) {
  if (base) {
    rawPath = resolvePath(rawPath, base)
  }
  const path = normalize(rawPath)
  for (let i = 0; i < pages.length; i++) {
    if (normalize(pages[i].regularPath) === path) {
      return Object.assign({}, pages[i], {
        type: 'page',
        path: ensureExt(pages[i].path)
      })
    }
  }
  console.error(`[vuepress] No matching page found for sidebar item "${rawPath}"`)
  return {}
}

function resolvePath(relative, base, append) {
  const firstChar = relative.charAt(0)
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  const stack = base.split('/')

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop()
  }

  // resolve relative path
  const segments = relative.replace(/^\//, '').split('/')
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (segment === '..') {
      stack.pop()
    } else if (segment !== '.') {
      stack.push(segment)
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('')
  }

  return stack.join('/')
}

/**
 * @param { Page } page
 * @param { string } regularPath
 * @param { SiteData } site
 * @param { string } localePath
 * @returns { SidebarGroup }
 */
export function resolveSidebarItems(page, regularPath, site, localePath) {
  const { pages, themeConfig } = site

  const localeConfig = localePath && themeConfig.locales
    ? themeConfig.locales[localePath] || themeConfig
    : themeConfig

  const sidebarConfig = localeConfig.sidebar || themeConfig.sidebar

  const { base, config } = resolveMatchingConfig(regularPath, sidebarConfig)
  return config
    ? config.map(item => resolveItem(item, pages, base))
    : []
}

export function groupHeaders(headers) {
  // group h3s under h2
  headers = headers.map(h => Object.assign({}, h))
  let lastH2
  headers.forEach(h => {
    if (h.level === 2) {
      lastH2 = h
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h)
    }
  })
  return headers.filter(h => h.level === 2)
}

export function resolveNavLinkItem(linkItem) {
  return Object.assign(linkItem, {
    type: linkItem.items && linkItem.items.length ? 'links' : 'link'
  })
}

/**
 * @param { Route } route
 * @param { Array<string|string[]> | Array<SidebarGroup> | [link: string]: SidebarConfig } config
 * @returns { base: string, config: SidebarConfig }
 */
export function resolveMatchingConfig(regularPath, config) {
  if (Array.isArray(config)) {
    return {
      base: '/',
      config: config
    }
  }
  for (const base in config) {
    if (ensureEndingSlash(regularPath).indexOf(encodeURI(base)) === 0) {
      return {
        base,
        config: config[base]
      }
    }
  }
  return {}
}

export function formatDate(time, fmt = 'yyyy-MM-dd hh:mm:ss') {
  time = time.replace(/-/g, '/')
  const date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, date.getFullYear() + '').substr(4 - RegExp.$1.length)
  }

  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (const key in o) {
    if (RegExp(`(${key})`).test(fmt)) {
      const str = o[key] + ''
      fmt = fmt.replace(RegExp.$1, str.length === 2 ? str : '0' + str)
    }
  }
  return fmt
}

// 获取时间的数字类型
export function getTimeNum(date) {
  const dateNum = !date ? 0 : new Date(date).getTime()
  return dateNum
}

// 比对时间
export function compareDate(a, b) {
  const aDateNum = getTimeNum(a.frontmatter.date)
  const bDateNum = getTimeNum(b.frontmatter.date)
  if (aDateNum === 0 || bDateNum === 0) return 0
  return bDateNum - aDateNum
}

// 向 head 中添加 style
export function addLinkToHead(href) {
  const iconLink = document.createElement('link')
  iconLink.rel = 'stylesheet'
  iconLink.href = href

  document.head.append(iconLink)
}

// 向 head 中添加 script
export function addScriptToHead(href) {
  const iconLink = document.createElement('script')
  iconLink.src = href

  document.head.append(iconLink)
}

function ensureEndingSlash(path) {
  return /(\.html|\/)$/.test(path)
    ? path
    : path + '/'
}

function resolveItem(item, pages, base, groupDepth = 1) {
  if (typeof item === 'string') {
    return resolvePage(pages, item, base)
  } else if (Array.isArray(item)) {
    return Object.assign(resolvePage(pages, item[0], base), {
      title: item[1]
    })
  } else {
    if (groupDepth > 3) {
      console.error(
        '[vuepress] detected a too deep nested sidebar group.'
      )
    }
    const children = item.children || []
    if (children.length === 0 && item.path) {
      return Object.assign(resolvePage(pages, item.path, base), {
        title: item.title
      })
    }
    return {
      type: 'group',
      path: item.path,
      title: item.title,
      sidebarDepth: item.sidebarDepth,
      children: children.map(child => resolveItem(child, pages, base, groupDepth + 1)),
      collapsable: item.collapsable !== false
    }
  }
}

/**
 * 冒泡效果canvas实现
 * @param options
 */
export function circleMagic(options) {
  let width
  let height
  let canvas
  let ctx
  let animateHeader = true
  const circles = []

  // 这里进行设置，如果调用circleMagic函数没有传入参数options,会使用默认样式
  const settings = options || {
    color: 'rgba(255,255,255,.5)',
    radius: 10,
    density: 0.3,
    clearOffset: 0.2
  }

  //  Main
  // 获取bubbles 元素节点, 这个节点在HomeBlog/index.vue中
  const container = document.getElementById('bubbles')
  initContainer()
  addListeners()

  function initContainer() {
    width = container.offsetWidth
    height = container.offsetHeight - 120

    // 创建canvas画布
    //  create canvas element
    initCanvas()
    canvas = document.getElementById('homeTopCanvas')
    canvas.width = width
    canvas.height = height
    canvas.style.position = 'absolute'
    canvas.style.left = '0'
    canvas.style.bottom = '0'
    ctx = canvas.getContext('2d')

    //  create circles 画出泡泡
    for (let x = 0; x < width * settings.density; x++) {
      const c = new Circle()
      circles.push(c)
    }
    animate()
  }

  // Init canvas element
  function initCanvas() {
    const canvasElement = document.createElement('canvas')
    canvasElement.id = 'homeTopCanvas'
    canvasElement.style.pointerEvents = 'none'
    container.appendChild(canvasElement)
    canvasElement.parentElement.style.overflow = 'hidden'
  }

  // Event handling
  function addListeners() {
    window.addEventListener('scroll', scrollCheck, false)
    window.addEventListener('resize', resize, false)
  }

  function scrollCheck() {
    if (document.body.scrollTop > height) {
      animateHeader = false
    } else {
      animateHeader = true
    }
  }

  function resize() {
    width = container.clientWidth
    height = container.clientHeight
    container.height = height + 'px'
    canvas.width = width
    canvas.height = height
  }

  function animate() {
    if (animateHeader) {
      // 刷新画布区域
      ctx.clearRect(0, 0, width, height)
      for (const i in circles) {
        circles[i].draw()
      }
    }
    requestAnimationFrame(animate)
  }

  // 设置随机颜色
  function randomColor() {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    const alpha = Math.random().toPrecision(2)
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
  }

  //  Canvas manipulation

  function Circle() {
    const that = this

      // constructor
      ; (function () {
        that.pos = {}
        init()
      })()

    function init() {
      that.pos.x = Math.random() * width
      that.pos.y = height + Math.random() * 100
      that.alpha = 0.1 + Math.random() * settings.clearOffset
      that.scale = 0.1 + Math.random() * 0.2
      that.speed = Math.random() * 0.6
      if (settings.color === 'random') {
        that.color = randomColor()
      } else {
        that.color = settings.color
      }
    }

    this.draw = function () {
      if (that.alpha <= 0) {
        init()
      }
      that.pos.y -= that.speed
      that.alpha -= 0.0005
      ctx.beginPath()
      ctx.arc(
        that.pos.x,
        that.pos.y,
        that.scale * settings.radius,
        0,
        2 * Math.PI,
        false
      )
      ctx.fillStyle = that.color
      ctx.fill()
      ctx.closePath()
    }
  }
}



// 打字效果
// export function typingMagic() {
//   const h1 = document.querySelector('h1')
//   // h1.innerHTML = h1.textContent.replace(/\S/g, "<span>$&</span>")

//   // Support Space:
//   h1.innerHTML = h1.textContent
//     .replace(/\S/g, "<span>$&</span>")
//     .replace(/\s/g, "<span>&nbsp;</span>")

//   let delay = 0
//   document.querySelectorAll('span').forEach((span, index) => {
//     delay += 0.1

//     if (index === 6) delay += 0.3

//     span.style.setProperty('--delay', `${delay}s`)
//   })

//   h1.addEventListener('animationend', (e) => {
//     if (e.target === document.querySelector('h1 span:last-child')) {
//       h1.classList.add('ended')
//     }
//   })
// }