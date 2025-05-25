import db from "../index.js";
import columnModel from "../models/column.model.js";

const Op = db.Sequelize.Op;
const Column = db.columns;
const Board = db.boards;

const VerifyColumnOwner = async (columnId, userId) => {
    const column = await Column.findByPk(columnId, {
        include: {
            model: Board,
            where: { userId },
        },
    });

    if(!column) {
        return { error: 404, message: `Column with id=${columnId} not found or unauthorised. `};
    }

    return { column };
}

export const create = async (req, res) => {
    const { boardId, title, description, order } = req.body;

    if (!title || !boardId) {
        return res.status(400).send({ message: "Title and boardId are required. "});
    }

    try {
        const board = await Board.findByPk(boardId, {
            where: { userId: req.user.id },
        });

        if(!board) {
            return res.status(403).send({ message: "Unauthorised or invalid board. "});
        }

        const column = await Column.create({ title, description, order, boardId });
        res.status(201).send(column);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message || "An error occurred while creating this column.",
        });
    };

}

export const findAll = async (req, res) => {
    try {
        const columns = await Column.findAll({
            include: {
                model: Board,
                where: { userId: req.user.id },
            },
         });

        res.status(200).send(columns);
    } catch (err) {
        console.error(err);

        res.status(500).send({
            message: err.message || "An error occurred while fetching the columns.",
        });
    }
};

export const findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const { column, error, message } = await VerifyColumnOwner(id, req.user.id);
        if (error) return res.status(error).send({ message });

        res.status(200).send(column);

    } catch (err) {
        console.error(err);

        res.status(500).send({
            message: err.message || "An error occurred while fetching this column.",
        });
    }
};

export const findByBoardId = async (req, res) => {
    const boardId = req.params.boardId;

    try {
        const board = await Board.findOne({
            where: { id: boardId, userId: req.user.id },
        });

        if (!board) {
            return res.status(403).send({ message: "Unauthorised access or board not found."});
        }

        const columns = await Column.findAll({
            where: { boardId },
            order: [['position', 'ASC']],
            include: {
                association: Column.associations.cards,
                order: [['createdAt', 'ASC']],
            },
        });

        res.status(200).send(columns);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message || "An error occurred while fetching columns.",
        });
    }
};

export const update = async (req, res) => {
    const id = req.params.id;

    try {
        const { column, error, message } = await VerifyColumnOwner(id, req.user.id);
        if (error) return res.status(error).send({ message });

        await column.update(req.body);
        res.send({ message: "Column was updated successfully. "});

    } catch (err) { 
        console.error(err);
        res.status(500).send({
            message: err.message || "An error occurred while updating the column.",
        });
    }
};

export const deleteOne = async (req,res) => {
    const id = req.params.id;

    try {
        const { column, error, message } = await VerifyColumnOwner(id, req.user.id);
        if (error) return res.status(error).send({ message });

        await column.destroy();
        res.send({ message: "Column was deleted successfully. "});

    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message || "An error occurred while deleting the column.",
        });
    }
};

export const deleteAll = async (req, res) => {
    const boardId = req.params.boardId;

    try {
        const numDeleted = await Column.destroy({ where: { boardId } });

        res.status(200).send({
            message: `${numDeleted} columns were successfully deleted.`,
        });

        } catch (err) {
            console.error(err);
            res.status(500).send({
                message: err.message || "An error occurred while deleting all columns.",
        });
    }
};