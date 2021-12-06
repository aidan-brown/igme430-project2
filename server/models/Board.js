const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let BoardModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();
const setMembers = (members) => members;
const setDescription = (description) => _.escape(description).trim();
const setTasks = (tasks) => tasks;

const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  members: {
    type: [mongoose.Schema.ObjectId],
    required: true,
    trim: true,
    set: setMembers,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    set: setDescription,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

BoardSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  owner: doc.owner,
  members: doc.members,
  description: doc.description,
});

BoardSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return BoardModel.find(search).select('name description owner members').lean().exec(callback);
};

BoardSchema.statics.findByID = (boardId, callback) => {
  const search = {
    _id: convertId(boardId),
  };

  return BoardModel.find(search).select('name description owner members').lean().exec(callback);
};

BoardSchema.statics.findByAssociation = (userId, callback) => {
  const search = {
    members: convertId(userId),
  };

  return BoardModel.find(search).select('name description owner members').lean().exec(callback);
};

BoardSchema.statics.removeByID = (boardID, callback) => {
  const board = {
    _id: convertId(boardID),
  };

  return BoardModel.deleteOne(board, callback);
};

BoardSchema.statics.updateByID = (boardID, data, callback) => {
  const board = {
    _id: convertId(boardID),
  };

  return BoardModel.updateOne(board, { $set: data }, callback);
};

BoardSchema.statics.updateMembersByID = (boardID, members, callback) => {
  const board = {
    _id: convertId(boardID),
  };

  for(let i = 0; i < members.length; i++) {
      members[i] = convertId(members[i])
  }

  const membersData = {
      members: members
  }

  return BoardModel.updateOne(board, { $set: membersData }, callback);
};

BoardModel = mongoose.model('Board', BoardSchema);

module.exports.BoardModel = BoardModel;
module.exports.BoardSchema = BoardSchema;
