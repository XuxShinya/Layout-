//获取浏览器窗口的盒子模型
function win (attr, val) {
  if (typeof val !== 'undefined') {
    document.documentElement[attr] = document.body[attr] = val
  }
  // 
  return document.documentElement[attr] || document.body[attr]
}

//查找距离bo'd'y的offset值
function offset (ele) {
  var top = ele.offsetTop
  var left = ele.offsetLeft
  var parent = ele.offsetParent
  while (parent && parent.nodeName.toLowerCase !== 'body') {
    top += parent.offsetTop + parent.clientTop
    left += parent.offsetLeft + parent.clientLeft
    parent = parent.offsetParent
  }
  return {
    left, top
  }
}

//获取样式，删除单位，统一透明度
function getCss (ele, attr) {
  var value
  if ('getComputedStyle' in window) {  //判断是否有getComputed方法存在，大多数浏览器有，IE没有，所以没有要考虑是不是IE，是IE则需相应操作
    // console.log('000')
    value = window.getComputedStyle(ele, null)[attr];//获取某一个属性的值（attr）
  } else {
    // 判读获取的属性是否是透明度，如果是需要给IE的透明度属性进行特殊处理
    if (attr === 'opacity') {
      value = ele.currentStyle['filter'];
      var reg2 = /^alpha\(opacity=(.+)\)$/;//IE浏览器存在alpha滤镜
      value = reg2.exec(value)[1] / 100;      //用来捕获上行中的（。+）中的数据
    } else {
      value = ele.currentStyle[attr];
    }
  }
  var reg = /^-?\d+(\.\d+)?(px|rem|pt|em)$/i  //正则表达式用于判断是否有单位，有才需要删除
  if (reg.test(value)) {
    value = parseFloat(value)
  }
  return value
}

//设置单一CSS属性
function setCss (ele, attr, value) {
  if (attr === 'opacity') {
    ele.style.filter = 'alpha(opacity=' + value * 100 + ')'
  }
  if (attr === 'float') {
    ele.style.cssFloat = value
    ele.style.styleFloat = value
    return
  }
  let reg2 = /^(width|height|(margin|padding)?(top|left|right|bottom)?)$/i
  if (reg2.test(attr) && !isNaN(value)) {
    value += 'px'
  }
  ele.style[attr] = value
  // console.log('1111', ele.style[attr])
}

//参数以对象的形式设置CSS属性
function setBatchCss (ele, batch) {
  if (typeof batch !== 'object') return;
  for (const key in batch) {
    if (batch.hasOwnProperty(key)) {//判断batch中的键对应的是否有值
      setCss(ele, key, batch[key])

    }
  }
}

//封装CSS方法
function CSS (ele, param, value) {
  if (typeof param === 'object') {
    setBatchCss(ele, param)
  }
  if (typeof param === 'string' && typeof value === 'undefined') {
    return getCss(ele, param)
  }
  if (value !== 'undefined') {
    setCss(ele, param, value)
  }
}

//判断元素是否有一个类名
function hasClass (ele, className) {
  let clazzName = className.trim()
  var classList = ele.className.split(' ')
  for (const i in classList) {
    var cN = classList[i]
    var reg = new RegExp('^' + clazzName + '$')
    // console.log('1', reg)
    if (cN.match(reg)) {
      // console.log('2', cN)
      // console.log(cN.match(reg))
      return true
    }
  }
  return false
}
// function hasClass (ele, className) {
//   let cN = className.trim()
//   console.log(ele.className)
//   return ele.className.includes(cN)
// }


//增加类名
function addClass (ele, className) {
  if (hasClass(ele, className)) return;
  ele.className += ` ${className}`;
}

//删除类名
function removeClass (ele, className) {
  var clazzName = className.trim()
  var clazzStr = clazzName.split(' ')
  clazzStr.forEach(clazz => {
    clazz = clazz.trim()
    var reg = new RegExp(`${clazz}`, 'g')
    ele.className = ele.className.replace(reg, '')
    console.log(ele.className)
  });
}

//封装发布订阅
class Subscribe {
  constructor() {
    this.pond = []
  }
  includes (fn) {
    return this.pond.includes(fn)
  }
  addListener (fn) {
    if (!this.includes(fn)) {
      this.pond.push(fn)
    }
    return this
  }
  removeListener (fn) {
    if (this.includes(fn)) {
      this.pond = this.pond.filter(item => item !== fn)
    }
    return this
  }
  fire (...args) {
    this.pond.forEach(item => item(...args))
  }
}



