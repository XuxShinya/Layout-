
document.write('<script src="./function.js" type="text/javascript" charset="utf-8"></script>');
//运动方式
const Effect = {
  linear: function (curTime, begin, change, durTime) {
    return change / durTime * curTime + begin
  }
}
function animate ({ ele, target = {}, duration, after }) {
  //1.参数检验
  if (!ele || ele.nodeType !== 1) {
    throw TypeError('ele is not a DOM element')
  }
  //2.准备动画所需的参数
  let begin = {}
  let change = {}
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      begin[key] = CSS(ele, key)
      change[key] = target[key] - begin[key]
    }
  }
  let time = 0
  let interval = 16
  //清除上面可能存在的定时器
  ele.timer && clearInterval(ele.timer)//ele.timer存在则清楚
  ele.timer = setInterval(() => {
    time += interval
    if (time > duration) {
      CSS(ele, target)
      clearInterval(ele.timer)
      if (typeof after === 'function') {
        after.call(ele)
      }
      return
    }
    let curState = {}
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        curState[key] = Effect.linear(time, begin[key], change[key], duration)
      }
    }
    CSS(ele, curState)
  }, interval);



}