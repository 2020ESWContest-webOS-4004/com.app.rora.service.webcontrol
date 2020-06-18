module.exports = function(app, utils)
{
     app.get('/',function(req, res){
        var name = req.query.name;
        var power = req.query.power;
        var auth_flag = false;

        var welcome_voice = utils.welcome_voice;

        if(name)
         var auth_flag = utils.set_auth(name);

        if(power == "1")
         utils.set_engine(power);
         //utils.start_engine(utils.io.sockets.sockets);

        if(auth_flag){
         res.render('index', {auth:name, welcome_voice:welcome_voice});
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