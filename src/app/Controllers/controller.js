const controllerOBJ = {
    home(req, res, next) {
        res.render('home');
    },
    rolesParamsProfilesDiff(req, res, next) {
        res.render('rolesParamsProfilesDiff');
    }
}


module.exports = controllerOBJ;
