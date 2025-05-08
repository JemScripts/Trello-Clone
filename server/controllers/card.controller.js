import db from '../index.js';

const Op = db.Sequelize.Op;
const Card = db.cards;
const Column = db.columns;
const Board = db.boards;

const verifyCardOwner = async (cardId, userId) => {
    const card = await Card.findByPk(cardId, {
        include: {
            model: Column,
            include: {
                model: Board,
                where: { userId },
            },
        },
    });

    if(!card) return { error: 404, message: `Card with id=${cardId} is not found or unauthorised` };
    return { card };
};

export const create = async (req, res) => {
    const { columnId, title, description, dueDate, status } = req.body;

    if (!title || !columnId) {
        return res.status(400).send({ message: "Title and columnId are required. "});
    }

    try {
        const column = await Column.findByPk(columnId, {
            include: {
                model: Board,
                where: { userId: req.user.id },
            },
        });

        if(!column) {
            return res.status(403).send({ message: "Unauthorised or invalid column. "});
        }

        const card = await Card.create({ title, description, dueDate, status, columnId });
        res.status(201).send(card);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message || "An error occurred while creating this card.",
        });
    };

}

export const findAll = async (req, res) => {
    try {
        const cards = await Card.findAll({
            include: {
                model: Column,
                include: {
                    model: Board,
                    where: {userId: req.user.id},
                },
            },
         });

        res.status(200).send(cards);
    } catch (err) {
        console.error(err);

        res.status(500).send({
            message: err.message || "An error occurred while fetching the cards.",
        });
    }

};

export const findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const { card, error, message } = await verifyCardOwner(id, req.user.id);
        if (error) return res.status(error).send({ message });

        res.status(200).send(card);

    } catch (err) {
        console.error(err);

        res.status(500).send({
            message: err.message || "An error occurred while fetching this card.",
        });
    }
};

export const update = async (req, res) => {
    const id = req.params.id;

    try {
        const { card, error, message } = await verifyCardOwner(id, req.user.id);
        if (error) return res.status(error).send({ message });

        await card.update(req.body);
        res.send({ message: "Card was updated successfully. "});

    } catch (err) { 
        console.error(err);
        res.status(500).send({
            message: err.message || "An error occurred while updating the card.",
        });
    }
};

export const deleteOne = async (req,res) => {
    const id = req.params.id;

    try {
        const { card, error, message } = await verifyCardOwner(id, req.user.id);
        if (error) return res.status(error).send({ message });

        await card.destroy();
        res.send({ message: "Card was deleted successfully. "});

    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message || "An error occurred while deleting the card.",
        });
    }
};

export const deleteAll = async (req, res) => {
    const boardId = req.params.boardId;

    try {
        const numDeleted = await Card.destroy({ where: { boardId } });

        res.status(200).send({
            message: `${numDeleted} cards were successfully deleted.`,
        });

        } catch (err) {
            console.error(err);
            res.status(500).send({
                message: err.message || "An error occurred while deleting all cards.",
        });
    }
};

