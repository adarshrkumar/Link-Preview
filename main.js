let openMode = document.documentElement.getAttribute('open-mode')
let openValues = {
  window: 'blank',
  self: 'self', 
}
let properties = [
  'bp-v'
]

var pI = 0
var preview = document.getElementsByClassName('preview')[pI]
var image = preview.querySelector('.image')
var content = preview.querySelector('.content')
var title = content.querySelector('.title')
var domain = content.querySelector('.domain')

preview.href = link
preview.target = `_${openValues[openMode]}`
preview.style.setProperty('--cursor', 'pointer')
let url = link.split('://')[1]
if (url.endsWith('/')) {
  url = url.substring(0, url.split('').length-1)
}
var slashes = url.split('/')
var linkDomain = slashes[0]
var fullLinkDomain = `${link.split('://')[0]}://${linkDomain}`
slashes[0] = slashes[0].replace('www.', '')
slashes[0] = slashes[0].split('.')[slashes[0].split('.').length-2]

var i = 0
var linkData = data
while (i < slashes.length) {
  linkData = linkData[slashes[i]]
  i++
}

properties.forEach(function(p) {
  if (!!linkData[p]) {
    preview.style.setProperty(`--${p}`, linkData[p])
  }
})

document.title = linkData['title']
title.innerHTML = linkData['title']
domain.innerHTML = linkDomain
document.querySelector('link[rel="icon"]').href = `https://www.google.com/s2/favicons?domain=${fullLinkDomain}`
preview.style.backgroundImage = `url('${linkData['image']}')`
if (title.clientWidth > title.parentElement.clientWidth) {
  title.parentElement.getElementsByClassName('more')[0].style.display = ''
}

function changeLocation(href) {
  location.href = href
}