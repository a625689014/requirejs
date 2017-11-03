// $(function(){
	define(function(){
		function _Carousel($ct){
			this.$ct = $ct
			this.init()
			this.bind()
		}
		_Carousel.prototype = {
			init: function(){
				var $list = this.$list = this.$ct.find($('.img-box>li')) 
				var $imgBox = this.$imgBox = this.$ct.find($('.img-box'))
				var count = this.count = $list.length
				var imgWidth = this.imgWidth = $list.width()
				//克隆第一个li加到末尾，克隆最后一个li加到开始
				$imgBox.append($list.first().clone())
				$imgBox.prepend($list.last().clone())
				//设置要滚动的盒子的宽度
				$imgBox.width((count+2)*imgWidth)
				$imgBox.css({left:-imgWidth})

				this.$prevBtn = this.$ct.find($('.prev')) 
				this.$nextBtn = this.$ct.find($('.next'))
				this.pageIndex = 0
				this.isRun = false
			},
			bind: function(){
				var _this =this
				this.$prevBtn.on('click',function(){
					_this.playPrev(1)
				})
				this.$nextBtn.on('click',function(){
					_this.playNext(1)
				})
				this.$ct.find($('.bullet')).on('click','li',function(){
					var index = $(this).index()
					if(index >_this.pageIndex){
						_this.playNext(index-_this.pageIndex)
						// console.log(pageIndex)
					}
					else if(index < _this.pageIndex){
						_this.playPrev(_this.pageIndex-index)
						// console.log(pageIndex)
					}
						// console.log(index)
					})
			},
			playPrev: function(len){
				if(this.isRun){				//	防止在动画完成之前用户重复点击
					return
				}
				var _this =this
				this.isRun = true
				this.$imgBox.animate({
					left: '+='+len*_this.imgWidth
				},function(){
					_this.pageIndex -= len
					if(_this.pageIndex < 0){
						_this.pageIndex = _this.count-1
						_this.$imgBox.css({left:-_this.count*_this.imgWidth})
					}
					_this.isRun = false
					_this.setBullet()
					// console.log(pageIndex)
				})
			},
			playNext: function(len){
				if(this.isRun){
					return
				}
				var _this = this
				this.isRun = true
				this.$imgBox.animate({
					left:'-='+len*_this.imgWidth
				},function(){
					_this.pageIndex += len
					if(_this.pageIndex === _this.count){
						_this.pageIndex = 0
						_this.$imgBox.css({left:-_this.imgWidth})
					}
					_this.isRun =false
					_this.setBullet()
					// console.log(pageIndex)
				})
			},
			setBullet: function(){
				this.$ct.find($('.bullet>li')).removeClass('active').eq(this.pageIndex).addClass('active')
			}
		}
		return _Carousel
	})
		
		// new _Carousel($('.carousel'))
	// })