const controllerOBJ = {
    home(req, res, next) {
        res.render('home');
    },
    params(req, res, next) {
        res.render('rolesParamsProfilesDiff');
    }
}


module.exports = controllerOBJ;
