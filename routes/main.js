module.exports = function(app)
{
     app.get('/',function(req, res){
        res.render('index', {name:req.query.test});
     });
     app.get('/dashboard',function(req, res){
        res.render('dashboard');
    });
}