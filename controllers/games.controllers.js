const db = require("../models");
const Games = db.Games;

/* Routes */
exports.mostrarTodo = async (req, res) => {
    var allGames = await Games.findAll({
        raw: true,
        nest: true
    });
    res.render('games/all', {allGames});
}

exports.showCreate = (req, res) => {
    res.render('games/insert');
}

exports.addGame = async (req, res) => {
    var game = req.body;
    await Games.create(game);

    res.send("Juego agregado satisfactoriamente");
}

exports.findAll = async (req, res) => { 
    const query = await Games.findAll();
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


