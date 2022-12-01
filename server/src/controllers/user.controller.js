const Sequelize = require("sequelize");
const { User, Subscription, sequelize } = require("../models");

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            order: ['id'],
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*) 
                            FROM "Subscriptions" 
                            WHERE "Subscriptions"."person_id" = "User"."id"
                        )`), 
                        "subscribers_amount"
                    ],
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*) 
                            FROM "Subscriptions"
                            WHERE "Subscriptions"."subscriber_id" = "User"."id"
                        )`), "following_amount"
                    ]
                ],
            },
            include: [
                {
                    model: User,
                    as: 'subscribers',
                    attributes: [],
                    through: {
                        attributes: [],
                    }
                },
                
            ],
            group: ["User.id", "subscribers.id"],
        });

        res.send(JSON.stringify(users));
    } catch (error) {
        console.log(error.message);
    }

    res.end();
};

module.exports.getNotFollowingUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            order: ['id'],
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*) 
                            FROM "Subscriptions" 
                            WHERE "Subscriptions"."person_id" = "User"."id"
                        )`), 
                        "subscribers_amount"
                    ],
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*) 
                            FROM "Subscriptions"
                            WHERE "Subscriptions"."subscriber_id" = "User"."id"
                        )`), "following_amount"
                    ]
                ],
            },
            include: [
                {
                    model: User,
                    as: 'subscribers',
                    attributes: [],
                    through: {
                        attributes: [],
                    }
                },
                
            ],
            having: Sequelize.literal(`
                (SELECT COUNT(*) 
                FROM "Subscriptions"
                WHERE "Subscriptions"."subscriber_id" = "User"."id") = 0`),
            group: ["User.id", "subscribers.id"],
        });

        res.send(JSON.stringify(users));
    } catch (error) {
        console.log(error.message);
    }

    res.end();
};

module.exports.getMaxFollowing = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*) 
                            FROM "Subscriptions" 
                            WHERE "Subscriptions"."person_id" = "User"."id"
                        )`), 
                        "subscribers_amount"
                    ],
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*) 
                            FROM "Subscriptions"
                            WHERE "Subscriptions"."subscriber_id" = "User"."id"
                        )`), "following_amount"
                    ]
                ],
            },
            include: [
                {
                    model: User,
                    as: 'subscribers',
                    attributes: [],
                    through: {
                        attributes: [],
                    }
                },
                
            ],
            order: [[Sequelize.literal('following_amount'), 'DESC']],
            limit: 5,
            subQuery: false,
            group: ["User.id"],
        });

        res.send(JSON.stringify(users));
    } catch (error) {
        console.log(error.message);
    }

    res.end();
};

module.exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const { order_by, order_type } = req.query;

    try {
        const friends = await User.findOne({
            where: {
                id
            },
            attributes: [],
            order: [[{model: User, as: 'subscribers'}, Sequelize.literal(order_by), order_type.toUpperCase()]],
            include: [
                {
                    model: User,
                    as: 'subscribers',
                    through: {
                        model: Subscription,
                        where: {
                            person_id: id,
                            subscriber_id: [Sequelize.literal(`
                                SELECT person_id FROM "Subscriptions" 
                                WHERE "Subscriptions".subscriber_id = ${id}
                            `)]
                        },
                        attributes: [],
                    },
                },
            ],
            attributes: [
                [
                    Sequelize.literal(`
                        (
                            SELECT COUNT(*) FROM "Subscriptions" 
                            WHERE "Subscriptions".person_id = 125 AND 
                            "Subscriptions".subscriber_id IN (
                                SELECT person_id FROM "Subscriptions" 
                                WHERE "Subscriptions".subscriber_id = 125
                            )
                        )
                    `),
                    "friends_amount"
                ]
            ],
        });

        res.send(JSON.stringify(friends));
    } catch (error) {
        console.log(error.message);
    }

    res.end();
};