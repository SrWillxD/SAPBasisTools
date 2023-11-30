const fs = require('fs');
const path = require('path');

const controllerOBJ = {
    home(req, res, next){
        try{
            const filePath = path.join(__dirname, '../Public/HTML/home.html');

            fs.readFile(filePath, 'utf8', (err, data)=>{
                if(err){throw err;}
                res.send(data);
            });
        }catch(err){
            console.error("Error displaying home", err);
            res.status(500).json({ message: 'Internal Server Error.'});
        }
    }
}

module.exports = controllerOBJ;
