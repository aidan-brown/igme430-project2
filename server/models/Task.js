const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let TaskModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();
const setGroup = (group) => _.escape(group).trim();
const setDescription = (description) => _.escape(description).trim();
const setTags = (tags) => tags;

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  group: {
    type: String,
    required: true,
    trim: true,
    set: setGroup,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    set: setDescription,
  },
  tags: {
    type: Array,
    required: true,
    set: setTags,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

TaskSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  description: doc.description,
  tags: doc.tags,
});

TaskSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return TaskModel.find(search).select('name description group tags').lean().exec(callback);
};

TaskSchema.statics.removeByID = (taskID, callback) => {
  const task = {
    _id: convertId(taskID),
  };

  return TaskModel.deleteOne(task, callback);
};

TaskSchema.statics.updateByID = (taskID, data, callback) => {
  const task = {
    _id: convertId(taskID),
  };

  return TaskModel.updateOne(task, { $set: data }, callback);
};

TaskModel = mongoose.model('Task', TaskSchema);

module.exports.TaskModel = TaskModel;
module.exports.TaskSchema = TaskSchema;
