// $(function(){
	define(function(){
		function GoTop($ct){
			this.$ct = $ct
			this.bind()
		}
		GoTop.prototype.bind = function(){
			this.$ct.on('click',function(){
				$(window).scrollTop(0)
			})
		}
		return GoTop
	})
	
	// new GoTop($('.goTop'))
// })