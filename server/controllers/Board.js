const models = require('../models');

const { Board } = models;

const userPage = (req, res) => {
  Board.BoardModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), boards: docs, username: req.session.account.username });
  });
};

const createBoard = (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const boardData = {
    name: req.body.name,
    members: [],
    description: req.body.description,
    owner: req.session.account._id,
  };

  const newBoard = new Board.BoardModel(boardData);

  const boardPromise = newBoard.save();

  boardPromise.then(() => res.json({ redirect: '/user' }));

  boardPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Board already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return boardPromise;
};

const updateBoard = (req, res) => {
  if (!req.body.boardID || !req.body.name || !req.body.description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const boardData = {
    name: req.body.name,
    description: req.body.description,
  };

  return Board.BoardModel.updateByID(req.body.boardID, boardData, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ results: docs });
  });
};

const deleteBoard = (req, res) => {
  if (!req.body.boardID) {
    return res.status(400).json({ error: 'Valid board ID required' });
  }

  return Board.BoardModel.removeByID(req.body.boardID, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ results: docs });
  });
};

const getCreatedBoards = (request, response) => {
  const req = request;
  const res = response;

  return Board.BoardModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ boards: docs, premium: req.session.account.premium });
  });
};

const getSharedBoards = (request, response) => {
  const req = request;
  const res = response;

  return Board.BoardModel.findByAssociation(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ boards: docs });
  });
};

const addMemberToBoard = (req, res) => {
  if (!req.body.boardID || !req.body.userID) {
    return res.status(400).json({ error: 'Valid board ID and user ID required' });
  }

  return Board.BoardModel.findByID(req.body.boardID, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    const { members } = docs;
    members.push(req.body.userID);

    return Board.BoardModel.updateMembersByID(req.body.boardID, members, (error, docs2) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error: 'An error occurred' });
      }

      return res.json({ results: docs2 });
    });
  });
};

const removeMemberFromBoard = (req, res) => {
  if (!req.body.boardID || !req.body.userID) {
    return res.status(400).json({ error: 'Valid board ID and user ID required' });
  }

  return Board.BoardModel.findByID(req.body.boardID, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    const { members } = docs;
    const index = members.indexOf(req.body.userID);
    if (index > -1) {
      members.splice(index, 1);
    } else {
      return res.status(400).json({ error: 'Member does not exist for this board' });
    }

    return Board.BoardModel.updateMembersByID(req.body.boardID, members, (error, docs2) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error: 'An error occurred' });
      }

      return res.json({ results: docs2 });
    });
  });
};

module.exports.userPage = userPage;
module.exports.getCreatedBoards = getCreatedBoards;
module.exports.getSharedBoards = getSharedBoards;
module.exports.createBoard = createBoard;
module.exports.updateBoard = updateBoard;
module.exports.deleteBoard = deleteBoard;
module.exports.addMemberToBoard = addMemberToBoard;
module.exports.removeMemberFromBoard = removeMemberFromBoard;
