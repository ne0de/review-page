const db = require("../models");
const app = require("../app");
const Review = db.Review;


exports.showCreate = (req, res) => {
    res.render('review/create');
}


exports.findAll = async (req, res) => { 
    let reviews = await Review.findAll();
    console.log(reviews);
    if(reviews == 0)
        res.render('review/all', { error: "No hay reseñas registradas" });
    else
        res.render('review/all', { reviews });
};