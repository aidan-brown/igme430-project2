const models = require('../models');

const { Board, Task } = models;

const boardPage = (req, res) => {
  Task.TaskModel.findByAssociation(req.params.boardID, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return Board.BoardModel.findByID(req.params.boardID, (error, boardDocs) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error: 'An error occurred' });
      }

      return res.render('board', { csrfToken: req.csrfToken(), tasks: docs, board: boardDocs[0] });
    });
  });
};

const createTask = (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.group || !req.body.boardID) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const taskData = {
    name: req.body.name,
    description: req.body.description,
    group: req.body.group,
    tags: [],
    board: req.body.boardID,
    owner: req.session.account._id,
  };

  const newTask = new Task.TaskModel(taskData);

  const taskPromise = newTask.save();

  taskPromise.then(() => res.json({ redirect: '/board' }));

  taskPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Task already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return taskPromise;
};

const updateTask = (req, res) => {
  if (!req.body.taskID || !req.body.name || !req.body.description || !req.body.group) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const taskData = {
    name: req.body.name,
    description: req.body.description,
    group: req.body.group,
    tags: [],
  };

  return Task.TaskModel.updateByID(req.body.taskID, taskData, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ results: docs });
  });
};

const deleteTask = (req, res) => {
  if (!req.body.taskID) {
    return res.status(400).json({ error: 'Valid task ID required' });
  }

  return Task.TaskModel.removeByID(req.body.taskID, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ results: docs });
  });
};

const getTasks = (request, response) => {
  const req = request;
  const res = response;

  return Task.TaskModel.findByAssociation(req.params.boardID, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ tasks: docs });
  });
};

module.exports.boardPage = boardPage;
module.exports.getTasks = getTasks;
module.exports.createTask = createTask;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;
