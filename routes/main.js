module.exports = function(app, utils)
{
     app.get('/',function(req, res){
        var name = req.query.name;
        var auth_flag = false;

        if(name)
         var auth_flag = utils.set_auth(name);

        if(auth_flag){
         res.render('index', {auth:name});
        }
        else{
         utils.set_auth("");
         res.render('index', {auth:""});
        }
     });
     app.get('/dashboard',function(req, res){
        res.render('dashboard', {auth:req.query.auth});
    });
}