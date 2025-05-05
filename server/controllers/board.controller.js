import db from '../index.js';

const Op = db.Sequelize.Op;
const Board = db.boards;

export const create = (req, res) => {

    try {
        if(!req.body.title) {
            res.status(400).send({
                message: "Field cannot be empty!",
            });
            return;
        }

        if(!req.user || !req.user.id) {
            res.status(400).send({
                message: "You're not authorized to access this feature.",
            });
            return;
        }

        const board = await.Board.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.user.id,
        });

        res.status(201).send(board);

    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message || "An error occurred while creating this board.",
        });
    };

}

export const findAll = async (req, res) => {
    const title = req.query.title;

    const condition = { userId: req.user.id, ...(title && { title: { [Op.like]: `%${title}%` } }) }

    try {
        const boards = await Board.findAll({ where: condition });

        res.status(200).send(boards);
    } catch (err) {
        console.error(err);

        res.status(500).send({
            message: err.message || "An error occurred while fetching the boards",
        });
    }

};

export const findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const board = await Board.findByPk(id);

        if(!board) {
            return res.status(404).send({
                message: err.message || "Board with id=${id} not found.",
            });
        }

        res.status(200).send(board);

    } catch (err) {
        console.error(err);

        res.status(500).send({
            message: err.message || "An error occurred while fetching this board by Id",
        });
    }
};