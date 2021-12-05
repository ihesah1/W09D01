const todoModel = require("./../../db/models/todo");
const createTodo = (req, res) => {
  const newTodo = new todoModel({ name: req.body.name, user: req.token.id });
  newTodo
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const getTodos = (req, res) => {
  todoModel
    .find({ isDeleted: false, user: req.token.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const getTodosById = (req, res) => {
  const { id } = req.params;
  todoModel
    .find({ _id: id, user: req.token.id })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json("todo does not exist");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
///delete todo item
const deleteTodo = (req, res) => {
  const { id } = req.params;
  todoModel
    .findByIdAndUpdate(id, { $set: { isDeleted: true } })
    .then((result) => {
      if (result) {
        res.status(200).json("removed todo");
      } else {
        res.status(404).json("user does not exist");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateTodo = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  todoModel
    .findByIdAndUpdate(id, { $set: { name: name } })
    .then((result) => {
      if (result) {
        res.status(200).json("todo is updated");
      } else {
        res.status(404).json("todo has not been found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  getTodosById,
};