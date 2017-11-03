
app.get('/getData',function(req,res){

    var length = req.query.num
    // var pageIndex = req.query.page
    var news = []
    for(var i =0;i<length;i++){
      var randomWidth = parseInt(Math.random()*300+300)
      var randomHeight = parseInt(Math.random()*200+200)
      news.push({img:'https://picsum.photos/'+300+'/'+randomHeight+'/'})
    }

    res.send({
      status:0,
      data:news
    })
  })

