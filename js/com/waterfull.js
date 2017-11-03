	// $(function(){
		define(function(){
			function _Waterfull($ct){
			this.$ct = $ct
			this.init()
			this.show()
			this.bind()
		}
		_Waterfull.prototype = {
			init: function(){
				this.perPageCount = 10
				this.curPage = 1
				this.arr = []
				this.count = parseInt(this.$ct.width() / this.$ct.find($('.item')).outerWidth())
				for(var i=0;i<this.count;i++){
					this.arr[i] = 0
				}
			},
			bind: function(){
				var _this = this
				var clock
				this.$ct.find($('.more')).on('click',function(){
					if(clock){
						clearTimeout(clock)
					}
					clock = setTimeout(function(){
						_this.show()
					},200)
				})
			},
			getData:function(callback){
				var _this = this
				$.ajax({
					url: '/getData',
					dataType: 'json',
					data: {
						num: this.perPageCount,
						page: this.curPage
					}
				}).done(function(ret){
					if(ret && ret.status === 0){
						callback(ret.data)
						_this.curPage++
					}else{
						console.log('get error')
					}
				}).fail(function(){
					console.log('系统异常')
				})
			},
			getNode: function(data){
				var html = ''
				html += '<li class="item">'
				html += '<img src="'+data.img+'" alt="">'
				html += '</li>'
				return $(html)
			},
			layout: function($node){
				var minValue = Math.min.apply(null,this.arr)
				var index = this.arr.indexOf(minValue)
				$node.css({
					top: this.arr[index],
					left: $node.outerWidth(true)*index,
					opacity: 1
				})
				this.arr[index] += $node.outerHeight(true)
				this.$ct.height(Math.max.apply(null,this.arr))
			},
			show: function(){
				var _this =this
				this.getData(function(e){
					$.each(e,function(idx,data){
						var $node = _this.getNode(data)
						$node.find('img').on('load',function(){
							_this.$ct.find($('ul')).append($node)
							_this.layout($node)
						})
					})
				})
			}
		}
		return _Waterfull
		})
		
		// new _Waterfull($('.waterfull'))
	// })