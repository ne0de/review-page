const db = require("../models");
const Games = db.Games;

/* Routes */

exports.showCreate = (req, res) => {
    res.render('games/insert');
}

exports.addGame = async (req, res) => {
    var game = req.body;
    await Games.create(game);
    console.log(game)
    res.send("Juego agregado satisfactoriamente");
}

exports.findAll = async (req, res) => { 
    const query = await Games.findAll();
    console.log(query);
    res.send({
        response: query.games
    });
};

/* Database */

exports.findGameByName = async (gameName) => {
    return await Games.findOne({ where: 
        { name : gameName } 
    });
}


