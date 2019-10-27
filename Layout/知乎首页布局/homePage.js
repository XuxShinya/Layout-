let siderbar = document.getElementById('globalSidebar')
console.log(offset(siderbar))
let subSiderbar4 = document.getElementById('sidebar4')
console.log(offset(subSiderbar4))   //left 744,top878,bottom = 878+194 = 1072
var winH = win('clientHeight')
console.log(siderbar.clientHeight)
// console.log('窗口可视距离', window.innerHeight)
window.addEventListener('scroll', () => {
  let scrollTop = win('scrollTop')
  let distTop = offset(subSiderbar4).top
  console.log(offset(mainPart))
  if (scrollTop > distTop - window.innerHeight + 194) {
    console.log(distTop - window.innerHeight + 194)
    addClass(siderbar, 'positionRelative')
    let flag = offset(mainPart).left + 704
    CSS(siderbar, 'left', flag)
    console.log('aaaa')
  }
  if (scrollTop < 323) {
    removeClass(siderbar, 'positionRelative')
    console.log('bbbbb')
  }
})

let title = ['你们的匡威是烂到什么程度才换的', '想学习多看书，可是看不下去，怎么办，心静不下来?', '如何评价电影《少年的你》?', '大学生买苹果手机不能评贫困生合理吗？', '《网易云音乐》上看到过最触动的热评是什么？']
let content1 = ['匡威坏道什么样子才换，脱胶到什么程度？Lorem ipsum dolor sit asaaaaaaadadsdaadadffafsdadamet consectetur adipisicing elit',
  ' ', '相关问题： 如何评价电影《少年的你》中周冬雨的表现？ 如何评价电影《少年的你》中易烊千玺的表现？ 你如何理解 《少年的你》的结局？ 电影《少年的你》中有哪些虐心的情节？ 演完《少年的你》，易烊千玺会从流量小生转型为实力派吗？',
  '这个问题是两面性的，既有它的合理性，也有它的不合理性。', ' ']
let imgs = ['https://pic1.zhimg.com/50/v2-f9195a7f3f3d44123c623d029b37b2d1_400x224.jpg',
  'https://pic1.zhimg.com/50/v2-ac9ac5a422a70cdd7d86f4e62a043c6e_400x224.jpg',
  './1.gif',
  'https://pic1.zhimg.com/50/v2-516f040d8b6445b1fb2d7454079edecc_400x224.gif',
  './2.jpg']

function createContent(index) {
  let section = document.getElementById('contentContainer')
  let content = document.createElement('div')
  content.className = 'content'
  let a = Math.floor(Math.random() * 5)
  console.log(a)
  console.log(content1[0])
  content.innerHTML = `
    <div id="contentNum">${index + 1}</div>
    <div id="contentMain">
      <a id="contentTitle">
        <h3>${title[a]}</h3>
      </a>
      <div id="contentSub">${content1[a]}</div>
      <div id="contentlabel">
        a 307万热度&nbsp;&nbsp;&nbsp;a 分享
      </div>
    </div>
    <a id="contentImg"><img src="${imgs[a]}"
        alt=""></a>
    `

  section.appendChild(content)
}
for (let i = 0; i < 20; i++) {
  createContent(i)
}