const { rateReview } = require("../models");
const db = require("../models");
const gamesController = require('./games.controllers');

/* Tables */
const Review = db.Review;
const Games = db.Games;
const User = db.User;
const UserReview = db.UserReview;
const GameReview = db.GameReview;
const RateReview = db.rateReview;

/* Routes */

exports.showSolo = async (req, res) => {
    const targetId = req.params.id;
    const review = await this.findById(targetId);
    if (Math.floor(Math.random() * 100) < 40) {
        await Review.increment('views', {
            by: 1,
            where: {
                id: targetId
            }
        });
    }
    return res.render('review/solo', { review });
};

exports.showCreate = async (req, res) => {
    const games = await Games.findAll();
    return res.render('review/create', { games });
}

exports.showAll = async (req, res) => {
    const allReviews = await this.findAllWithForeignKeys();
    const tabTitle = 'Más recientes';
    const mainTitle = 'Ultimas reseñas creadas por los usuarios';
    res.render('review/all', { allReviews, tabTitle, mainTitle });
};

exports.showPopular = async (req, res) => {
    const allReviews = await this.findPopularReviews();
    const tabTitle = 'Más populares';
    const mainTitle = 'Reseñas más populares';
    res.render('review/all', { allReviews, tabTitle, mainTitle });
};

exports.addLike = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;
    const currentRate = await this.findUserRate(userId, reviewId);

    if (currentRate) {
        if (currentRate.type == "dislike") {
            await this.decrementRate('dislikes', reviewId);
            await this.incrementRate('likes', reviewId);
            await this.updateUserRate(userId, reviewId, 'like');
        }
        if (currentRate.type == "like") {
            await this.decrementRate('likes', reviewId);
            await this.updateUserRate(userId, reviewId, 'nothing');
        }
        if (currentRate.type == "nothing") {
            await this.incrementRate('likes', reviewId);
            await this.updateUserRate(userId, reviewId, 'like');
        }
    } else {
        await this.newRateReview(userId, reviewId, 'like');
        await this.incrementRate('likes', reviewId);
    }
    res.redirect(req.get('referer'));
}

exports.addDislike = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;
    const currentRate = await this.findUserRate(userId, reviewId);

    if (currentRate) {
        if (currentRate.type == "like") {
            await this.decrementRate('likes', reviewId);
            await this.incrementRate('dislikes', reviewId);
            await this.updateUserRate(userId, reviewId, 'dislike');
        }
        if (currentRate.type == "dislike") {
            await this.decrementRate('dislikes', reviewId);
            await this.updateUserRate(userId, reviewId, 'nothing');
        }
        if (currentRate.type == "nothing") {
            await this.incrementRate('dislikes', reviewId);
            await this.updateUserRate(userId, reviewId, 'dislike');
        }
    } else {
        await this.newRateReview(userId, reviewId, 'dislike');
        await this.incrementRate('dislikes', reviewId);
    }
    res.redirect(req.get('referer'));
}

exports.createReview = async (req, res) => {
    const account = req.user;
    const values = req.body;
    const gameTarget = await gamesController.findGameByName(values.gameName)

    if (values.title.length == 0 || values.description.length == 0 || values.gameName.length == 0) {
        req.flash('messageFailure', "Rellena todos los campos");
        return res.redirect(301, "/review/create");
    }

    if (!gameTarget) {
        req.flash('messageFailure', "El juego que introduciste no existe en nuestro registro de juegos.");
        return res.redirect(301, "/review/create");
    }

    const newReview = await this.newReview(values.title, values.description);
    await this.newUserReview(account.id, newReview.id);
    await this.newGameReview(gameTarget.id, newReview.id);

    res.redirect(301, '/review/all');
}

/* Database */

exports.newReview = async (_title, _description) => {
    return await Review.create({
        raw: true,
        nest: true,
        title: _title,
        description: _description
    });
}

exports.newUserReview = async (_userId, _reviewId) => {
    return await UserReview.create({
        userId: _userId,
        reviewId: _reviewId
    });
}

exports.newGameReview = async (_gameId, _reviewId) => {
    return await GameReview.create({
        gameId: _gameId,
        reviewId: _reviewId
    });
}

exports.newUserReview = async (_userId, _reviewId) => {
    return await UserReview.create({
        userId: _userId,
        reviewId: _reviewId
    });
}

exports.newRateReview = async (_userId, _reviewId, _type) => {
    return await rateReview.create({
        userId: _userId,
        reviewId: _reviewId,
        type: _type,
    });
}

exports.findUserRate = async (_userId, _reviewId) => {
    return await rateReview.findOne({
        where: {
            userId: _userId,
            reviewId: _reviewId
        }
    });
}

exports.decrementRate = async (type, _reviewId) => {
    await Review.decrement(type, {
        where: {
            id: _reviewId
        }
    });
}

exports.incrementRate = async (type, _reviewId) => {
    await Review.increment(type, {
        where: {
            id: _reviewId
        }
    });
}

exports.updateUserRate = async (_userId, _reviewId, _type) => {
    await RateReview.update({
        type: _type
    }, {
        where: {
            userId: _userId,
            reviewId: _reviewId
        }
    });
}

exports.sumAllViews = async () => {
    return await Review.sum('views')
};

exports.findById = async (_id) => {
    return await Review.findOne({
        raw: true,
        nest: true,
        where: {
            id: _id
        },
        include: [
            {
                model: User,
                as: "users",
            },
            {
                model: Games,
                as: "games",
                attributes: ['id', 'name', 'image']
            }
        ]
    });
}

exports.findAllUserReviews = async (_userId) => {
    return await Review.findAll({
        raw: true,
        nest: true,
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: User,
                as: "users",
                where: {
                    id: _userId
                }
            },
            {
                model: Games,
                as: "games",
                attributes: ['id', 'name', 'image']
            }
        ]
    });
}

exports.findPopularReviews = async () => {
    const totalViews = await this.sumAllViews();
    var reviews = await this.findAllWithForeignKeys();
    return reviews.filter(review => {
        return (totalViews / review.views) < 3
    });
};

exports.findAllWithForeignKeys = async () => {
    return await Review.findAll({
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
}

exports.findAllUserRate = async (_id, _type) => {
    return await User.findAll({
        raw: true,
        nest: true,
        attributes: [],
        where: {
            id: _id
        },
        include: [
            {
                model: Review,
                as: "reviews_rate",
                through: {
                    model: rateReview,
                    where: {
                        type: _type
                    }
                },
                include: [
                    {
                        model: Games,
                        as: "games",
                        attributes: ['id', 'name', 'image']
                    }
                ]

            }
        ]
    });
}