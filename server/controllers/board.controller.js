import db from '../index.js';

const Op = db.Sequelize.Op;
const Board = db.boards;

const findUserBoard = async (id, userId) => {
    const board = await Board.findByPk(id);

    if(!board) return { error: 404, message: `Board with id=${id} not found.` };
    if (board.userId !== userId) return { error: 403, message: "Unauthorised." };

    return { board };
}

export const create = async (req, res) => {

    try {
        if(!req.body.title) {
            res.status(400).send({
                message: "Field cannot be empty!",
            });
            return;
        }

        if(!req.user || !req.user.id) {
            res.status(401).send({
                message: "You're not authorized to access this feature.",
            });
            return;
        }

        const board = await Board.create({
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
        const { board, error, message } = await findUserBoard(id, req.user.id);
        if (error) return res.status(error).send({ message });

        res.status(200).send(board);

    } catch (err) {
        console.error(err);

        res.status(500).send({
            message: err.message || "An error occurred while fetching this board by Id",
        });
    }
};

export const update = async (req, res) => {
    const id = req.params.id;

    try {
        const { board, error, message } = await findUserBoard(id, req.user.id);
        if (error) return res.status(error).send({ message });

        await board.update(req.body);
        res.send({ message: "Board was updated successfully. "});

    } catch (err) { 
        console.error(err);
        res.status(500).send({
            message: err.message || "An error occurred while updating the board.",
        });
    }
};

export const deleteOne = async (req,res) => {
    const id = req.params.id;

    try {
        const { board, error, message } = await findUserBoard(id, req.user.id);
        if (error) return res.status(error).send({ message });

        await board.destroy();
        res.send({ message: "Board was deleted successfully. "});
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message || "An error occurred while deleting the board.",
        });
    }
};

export const deleteAll = async (req, res) => {
    const condition = { userId: req.user.id }

    try {
        const numDeleted = await Board.destroy({ where: condition });

        res.status(200).send({
            message: `${numDeleted} boards were successfully deleted.`,
        });

        } catch (err) {
            console.error(err);
            res.status(500).send({
                message: err.message || "An error occurred while deleting all boards.",
        });
    }
};

