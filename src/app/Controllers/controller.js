const controllerOBJ = {
    home(req, res, next){
        res.render('home');
    },
    params(req, res, next){
        res.render('parametersDiff');
    }
}


module.exports = controllerOBJ;
