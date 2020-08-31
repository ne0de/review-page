const db = require("../models");
const Review = db.Review;
const Games = db.Games;
const User = db.User;
const UserReview = db.UserReview;
const GameReview = db.GameReview;

exports.showCreate = async (req, res) => {
    const games = await Games.findAll();
    res.render('review/create', { games } );
}

exports.newReview = async (req, res) => {
    const account = req.user;
    const values = req.body;
    if(values.review == 0 || values.title == 0 || !values.gameId)
        res.sendStatus(403);
    else{
        console.log(values);
        const { dataValues } = await Review.create({ 
            title: values.title,
            description: values.review
        });
        const newUserReview = await UserReview.create({
            userId: account.id,
            reviewId: dataValues.id
        });
        const newGameReview = await GameReview.create({
            gameId: values.gameId,
            reviewId: dataValues.id
        });
        //console.log(newReview);
        console.log(dataValues);
        console.log(newUserReview);
        res.sendStatus(200);
    }
}

exports.showAll = async (req, res) => { 
    const allReviews = await Review.findAll({
        raw: true,
        nest: true,
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: User,
                as: "users",
                attributes: ['id', 'name', 'surname', 'avatar']
            },
            {
                model: Games,
                as: "games",
                attributes: ['id', 'name', 'image']
            }
        ]
    });
    console.log(allReviews);
    res.render('review/all', {allReviews });
};