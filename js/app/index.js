
// 首页功能
define(['com/carousel','com/goTop','com/waterfull'],function(carousel,goTop,waterfull){
	new carousel($('.carousel'))
	new goTop($('.goTop'))
	new waterfull($('.waterfull'))
})