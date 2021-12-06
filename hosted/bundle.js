"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _MaterialUI = MaterialUI,
    Typography = _MaterialUI.Typography,
    Box = _MaterialUI.Box,
    Button = _MaterialUI.Button,
    IconButton = _MaterialUI.IconButton,
    TextField = _MaterialUI.TextField,
    Radio = _MaterialUI.Radio,
    RadioGroup = _MaterialUI.RadioGroup,
    FormControlLabel = _MaterialUI.FormControlLabel,
    Grid = _MaterialUI.Grid,
    Stack = _MaterialUI.Stack,
    Card = _MaterialUI.Card,
    CardContent = _MaterialUI.CardContent,
    CardActions = _MaterialUI.CardActions,
    CardActionArea = _MaterialUI.CardActionArea,
    Dialog = _MaterialUI.Dialog,
    DialogActions = _MaterialUI.DialogActions,
    DialogContent = _MaterialUI.DialogContent,
    DialogContentText = _MaterialUI.DialogContentText,
    DialogTitle = _MaterialUI.DialogTitle;

var TaskForm = function TaskForm(props) {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var _React$useState3 = React.useState(""),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      taskName = _React$useState4[0],
      setTaskName = _React$useState4[1];

  var _React$useState5 = React.useState(""),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      taskDesc = _React$useState6[0],
      setTaskDesc = _React$useState6[1];

  var _React$useState7 = React.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      nameValid = _React$useState8[0],
      setNameValid = _React$useState8[1];

  var _React$useState9 = React.useState(false),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      descValid = _React$useState10[0],
      setDescValid = _React$useState10[1];

  var handleOpen = function handleOpen() {
    setOpen(true);
  };

  var handleClose = function handleClose() {
    setOpen(false);
    setTaskName("");
    setTaskDesc("");
  };

  var handleTask = function handleTask(e) {
    e.preventDefault();
    $("#createError").text("");

    if (taskName == '' || taskDesc == '') {
      handleError('All fields are required');
      return false;
    }

    sendAjax('POST', '/createTask', "name=".concat(taskName, "&description=").concat(taskDesc, "&group=").concat(props.group, "&boardID=").concat(document.querySelector('#boardID').value, "&_csrf=").concat(props.csrf), function () {
      return loadTasksFromServer();
    }, "#createError");
    handleClose();
    return false;
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AddTaskButton, {
    openDialog: handleOpen
  }), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    className: "taskForm"
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "Create New Task"), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(TextField, {
    error: !nameValid,
    helperText: nameValid ? "" : "Name cannot not be empty",
    margin: "dense",
    id: "name",
    label: "Task Name",
    type: "text",
    fullWidth: true,
    variant: "standard",
    value: taskName,
    onInput: function onInput(e) {
      setTaskName(e.target.value);
      setNameValid(e.target.value !== '');
    }
  }), /*#__PURE__*/React.createElement(TextField, {
    error: !descValid,
    helperText: descValid ? "" : "Description cannot not be empty",
    margin: "dense",
    id: "description",
    label: "Task Description",
    type: "text",
    fullWidth: true,
    variant: "standard",
    multiline: true,
    rows: 10,
    value: taskDesc,
    onInput: function onInput(e) {
      setTaskDesc(e.target.value);
      setDescValid(e.target.value !== '');
    }
  }), /*#__PURE__*/React.createElement(Typography, {
    color: 'red',
    variant: "body2",
    id: "createError"
  })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: handleClose
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    onClick: handleTask,
    disabled: !nameValid || !descValid
  }, "Create Task"))));
};

var Task = function Task(props) {
  var task = props.task;

  var _React$useState11 = React.useState(false),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      open = _React$useState12[0],
      setOpen = _React$useState12[1];

  var _React$useState13 = React.useState(task.name),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      taskName = _React$useState14[0],
      setTaskName = _React$useState14[1];

  var _React$useState15 = React.useState(task.description),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      taskDesc = _React$useState16[0],
      setTaskDesc = _React$useState16[1];

  var _React$useState17 = React.useState(task.group),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      taskGroup = _React$useState18[0],
      setTaskGroup = _React$useState18[1];

  var _React$useState19 = React.useState(true),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      nameValid = _React$useState20[0],
      setNameValid = _React$useState20[1];

  var _React$useState21 = React.useState(true),
      _React$useState22 = _slicedToArray(_React$useState21, 2),
      descValid = _React$useState22[0],
      setDescValid = _React$useState22[1];

  var handleOpen = function handleOpen() {
    setOpen(true);
    setTaskName(task.name);
    setTaskDesc(task.description);
  };

  var handleClose = function handleClose() {
    setOpen(false);
  };

  var handleTask = function handleTask(e, taskID) {
    e.preventDefault();
    $("#editError").text("");

    if (taskName == '' || taskDesc == '') {
      handleError('All fields are required');
      return false;
    }

    sendAjax('POST', '/updateTask', "taskID=".concat(taskID, "&name=").concat(taskName, "&description=").concat(taskDesc, "&group=").concat(taskGroup, "&_csrf=").concat(props.csrf), function () {
      return loadTasksFromServer();
    }, '#editError');
    handleClose();
    return false;
  };

  var handleDelete = function handleDelete(e, taskID, csrf) {
    e.preventDefault();
    $("#errorMessage").text("");

    if (!taskID) {
      handleError('Valid task ID required');
      return false;
    }

    sendAjax('POST', '/deleteTask', "taskID=".concat(taskID, "&_csrf=").concat(csrf), function () {
      return loadTasksFromServer();
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "task"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardActionArea, {
    onClick: handleOpen
  }, /*#__PURE__*/React.createElement(CardContent, {
    sx: {
      bgcolor: 'rgb(231, 231, 231)'
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h5",
    component: "div",
    className: "taskName"
  }, task.name), /*#__PURE__*/React.createElement(Typography, {
    variant: "body2",
    className: "taskDescription"
  }, task.description))), /*#__PURE__*/React.createElement(CardActions, null, /*#__PURE__*/React.createElement(Box, {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: function onClick(e) {
      return handleDelete(e, task._id, props.csrf);
    },
    className: "removeTask"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-icons"
  }, "delete"))))), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    className: "taskForm"
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "Edit Task [", task.name, "]"), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(TextField, {
    error: !nameValid,
    helperText: nameValid ? "" : "Name cannot not be empty",
    margin: "dense",
    id: "name",
    label: "Task Name",
    type: "text",
    fullWidth: true,
    variant: "standard",
    value: taskName,
    onInput: function onInput(e) {
      setTaskName(e.target.value);
      setNameValid(e.target.value !== '');
    }
  }), /*#__PURE__*/React.createElement(TextField, {
    error: !descValid,
    helperText: descValid ? "" : "Description cannot not be empty",
    margin: "dense",
    id: "description",
    label: "Task Description",
    type: "text",
    fullWidth: true,
    variant: "standard",
    multiline: true,
    rows: 10,
    value: taskDesc,
    onInput: function onInput(e) {
      setTaskDesc(e.target.value);
      setDescValid(e.target.value !== '');
    }
  }), /*#__PURE__*/React.createElement(RadioGroup, {
    row: true,
    "aria-label": "group",
    name: "group-radio",
    value: taskGroup,
    onChange: function onChange(e) {
      return setTaskGroup(e.target.value);
    }
  }, /*#__PURE__*/React.createElement(FormControlLabel, {
    value: "backlog",
    control: /*#__PURE__*/React.createElement(Radio, null),
    label: "Backlog"
  }), /*#__PURE__*/React.createElement(FormControlLabel, {
    value: "inProgress",
    control: /*#__PURE__*/React.createElement(Radio, null),
    label: "In Progress"
  }), /*#__PURE__*/React.createElement(FormControlLabel, {
    value: "complete",
    control: /*#__PURE__*/React.createElement(Radio, null),
    label: "Completed"
  })), /*#__PURE__*/React.createElement(Typography, {
    color: 'red',
    variant: "body2",
    id: "editError"
  })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: handleClose
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    onClick: function onClick(e) {
      return handleTask(e, task._id);
    },
    disabled: !nameValid || !descValid
  }, "Update Task"))));
};

var AddTaskButton = function AddTaskButton(props) {
  return /*#__PURE__*/React.createElement(Card, {
    className: "task"
  }, /*#__PURE__*/React.createElement(CardActionArea, {
    onClick: props.openDialog
  }, /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-icons"
  }, "add_circle_outline")))));
};

var TaskList = function TaskList(props) {
  var getTaskNodes = function getTaskNodes(groupName) {
    return props.tasks.filter(function (task) {
      return task.group === groupName;
    }).map(function (task) {
      return /*#__PURE__*/React.createElement(Task, {
        key: task._id,
        task: task,
        csrf: props.csrf
      });
    });
  };

  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 2,
    className: "taskList"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 4,
    className: "backlogTasks"
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h4"
  }, "Backlog"), /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, getTaskNodes('backlog'), /*#__PURE__*/React.createElement(TaskForm, {
    group: "backlog",
    csrf: props.csrf
  }))), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 4,
    className: "inprogTasks"
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h4"
  }, "In Progress"), /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, getTaskNodes('inProgress'), /*#__PURE__*/React.createElement(TaskForm, {
    group: "inProgress",
    csrf: props.csrf
  }))), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 4,
    className: "completeTasks"
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h4"
  }, "Completed"), /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, getTaskNodes('complete'), /*#__PURE__*/React.createElement(TaskForm, {
    group: "complete",
    csrf: props.csrf
  }))), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    id: "csrf",
    value: props.csrf
  }));
};

var loadTasksFromServer = function loadTasksFromServer() {
  sendAjax('GET', "/getTasks/".concat(document.querySelector('#boardID').value), null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(TaskList, {
      tasks: data.tasks,
      csrf: document.querySelector('#csrf').value
    }), document.querySelector('#tasks'));
  });
};

var setup = function setup(csrf, username) {
  ReactDOM.render( /*#__PURE__*/React.createElement(Navbar, {
    username: username
  }), document.querySelector('#navbar'));

  if (window.location.pathname.includes('/board')) {
    ReactDOM.render( /*#__PURE__*/React.createElement(TaskList, {
      tasks: [],
      csrf: csrf
    }), document.querySelector('#tasks'));
    ReactDOM.render( /*#__PURE__*/React.createElement(Typography, {
      variant: "h2",
      id: "boardName"
    }, document.querySelector('#boardName').innerHTML), document.querySelector('#boardName'));
    ReactDOM.render( /*#__PURE__*/React.createElement(Typography, {
      variant: "h6",
      id: "boardDescription"
    }, document.querySelector('#boardDescription').innerHTML), document.querySelector('#boardDescription'));
    loadTasksFromServer();
  } else if (window.location.pathname == '/user') {
    ReactDOM.render( /*#__PURE__*/React.createElement(BoardList, {
      createdBoards: [],
      sharedBoards: [],
      csrf: csrf
    }), document.querySelector('#boards'));
    loadBoardsFromServer();
  }
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken, result.username);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _MaterialUI = MaterialUI,
    Typography = _MaterialUI.Typography,
    Box = _MaterialUI.Box,
    Button = _MaterialUI.Button,
    IconButton = _MaterialUI.IconButton,
    TextField = _MaterialUI.TextField,
    Radio = _MaterialUI.Radio,
    RadioGroup = _MaterialUI.RadioGroup,
    FormControlLabel = _MaterialUI.FormControlLabel,
    Grid = _MaterialUI.Grid,
    Stack = _MaterialUI.Stack,
    Card = _MaterialUI.Card,
    CardContent = _MaterialUI.CardContent,
    CardActions = _MaterialUI.CardActions,
    CardActionArea = _MaterialUI.CardActionArea,
    Dialog = _MaterialUI.Dialog,
    DialogActions = _MaterialUI.DialogActions,
    DialogContent = _MaterialUI.DialogContent,
    DialogContentText = _MaterialUI.DialogContentText,
    DialogTitle = _MaterialUI.DialogTitle;

var BoardForm = function BoardForm(props) {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var _React$useState3 = React.useState(""),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      boardName = _React$useState4[0],
      setBoardName = _React$useState4[1];

  var _React$useState5 = React.useState(""),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      boardDesc = _React$useState6[0],
      setBoardDesc = _React$useState6[1];

  var _React$useState7 = React.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      nameValid = _React$useState8[0],
      setNameValid = _React$useState8[1];

  var _React$useState9 = React.useState(false),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      descValid = _React$useState10[0],
      setDescValid = _React$useState10[1];

  var handleOpen = function handleOpen() {
    setOpen(true);
  };

  var handleClose = function handleClose() {
    setOpen(false);
    setBoardName("");
    setBoardDesc("");
  };

  var handleBoard = function handleBoard(e) {
    e.preventDefault();
    $("#createError").text("");

    if (boardName == '' || boardDesc == '') {
      handleError('All fields are required');
      return false;
    }

    sendAjax('POST', '/createBoard', "name=".concat(boardName, "&description=").concat(boardDesc, "&_csrf=").concat(props.csrf), function () {
      return loadBoardsFromServer();
    }, "#createError");
    handleClose();
    return false;
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AddBoardButton, {
    openDialog: handleOpen
  }), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    className: "boardForm"
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "Create New Board"), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(TextField, {
    error: !nameValid,
    helperText: nameValid ? "" : "Name cannot not be empty",
    margin: "dense",
    id: "name",
    label: "Board Name",
    type: "text",
    fullWidth: true,
    variant: "standard",
    value: boardName,
    onInput: function onInput(e) {
      setBoardName(e.target.value);
      setNameValid(e.target.value !== '');
    }
  }), /*#__PURE__*/React.createElement(TextField, {
    error: !descValid,
    helperText: descValid ? "" : "Description cannot not be empty",
    margin: "dense",
    id: "description",
    label: "Board Description",
    type: "text",
    fullWidth: true,
    variant: "standard",
    multiline: true,
    rows: 10,
    value: boardDesc,
    onInput: function onInput(e) {
      setBoardDesc(e.target.value);
      setDescValid(e.target.value !== '');
    }
  }), /*#__PURE__*/React.createElement(Typography, {
    color: 'red',
    variant: "body2",
    id: "createError"
  })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: handleClose
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    onClick: handleBoard,
    disabled: !nameValid || !descValid
  }, "Create Board"))));
};

var Board = function Board(props) {
  var board = props.board;

  var _React$useState11 = React.useState(false),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      open = _React$useState12[0],
      setOpen = _React$useState12[1];

  var _React$useState13 = React.useState(board.name),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      boardName = _React$useState14[0],
      setBoardName = _React$useState14[1];

  var _React$useState15 = React.useState(board.description),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      boardDesc = _React$useState16[0],
      setBoardDesc = _React$useState16[1];

  var _React$useState17 = React.useState(true),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      nameValid = _React$useState18[0],
      setNameValid = _React$useState18[1];

  var _React$useState19 = React.useState(true),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      descValid = _React$useState20[0],
      setDescValid = _React$useState20[1];

  var handleOpen = function handleOpen() {
    setOpen(true);
    setBoardName(board.name);
    setBoardDesc(board.description);
  };

  var handleClose = function handleClose() {
    setOpen(false);
  };

  var handleUpdateBoard = function handleUpdateBoard(e, boardID) {
    e.preventDefault();
    $("#editError").text("");

    if (boardName == '' || boardDesc == '') {
      handleError('All fields are required');
      return false;
    }

    sendAjax('POST', '/updateBoard', "boardID=".concat(boardID, "&name=").concat(boardName, "&description=").concat(boardDesc, "&_csrf=").concat(props.csrf), function () {
      return loadBoardsFromServer();
    }, '#editError');
    handleClose();
    return false;
  };

  var handleDelete = function handleDelete(e, boardID, csrf) {
    e.preventDefault();
    $("#errorMessage").text("");

    if (!boardID) {
      handleError('Valid board ID required');
      return false;
    }

    sendAjax('POST', '/deleteBoard', "boardID=".concat(boardID, "&_csrf=").concat(csrf), function () {
      return loadBoardsFromServer();
    });
  };

  var handleBoard = function handleBoard(e) {
    e.preventDefault();
    $("#editError").text("");
    window.location.pathname = "/board/".concat(board._id);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
    className: "board"
  }, /*#__PURE__*/React.createElement(CardActionArea, {
    onClick: handleBoard
  }, /*#__PURE__*/React.createElement(CardContent, {
    sx: {
      bgcolor: 'rgb(231, 231, 231)'
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h5",
    component: "div",
    className: "boardName"
  }, board.name), /*#__PURE__*/React.createElement(Typography, {
    variant: "body2",
    className: "boardDescription"
  }, board.description))), /*#__PURE__*/React.createElement(CardActions, null, /*#__PURE__*/React.createElement(Box, {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: handleOpen,
    className: "editBoard"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-icons"
  }, "edit")), /*#__PURE__*/React.createElement(IconButton, {
    onClick: function onClick(e) {
      return handleDelete(e, board._id, props.csrf);
    },
    className: "removeBoard"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-icons"
  }, "delete"))))), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    className: "boardForm"
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "Edit Board [", board.name, "]"), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(TextField, {
    error: !nameValid,
    helperText: nameValid ? "" : "Name cannot not be empty",
    margin: "dense",
    id: "name",
    label: "Board Name",
    type: "text",
    fullWidth: true,
    variant: "standard",
    value: boardName,
    onInput: function onInput(e) {
      setBoardName(e.target.value);
      setNameValid(e.target.value !== '');
    }
  }), /*#__PURE__*/React.createElement(TextField, {
    error: !descValid,
    helperText: descValid ? "" : "Description cannot not be empty",
    margin: "dense",
    id: "description",
    label: "Board Description",
    type: "text",
    fullWidth: true,
    variant: "standard",
    multiline: true,
    rows: 10,
    value: boardDesc,
    onInput: function onInput(e) {
      setBoardDesc(e.target.value);
      setDescValid(e.target.value !== '');
    }
  }), /*#__PURE__*/React.createElement(Typography, {
    color: 'red',
    variant: "body2",
    id: "editError"
  })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: handleClose
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    onClick: function onClick(e) {
      return handleUpdateBoard(e, board._id);
    },
    disabled: !nameValid || !descValid
  }, "Update Board"))));
};

var AddBoardButton = function AddBoardButton(props) {
  return /*#__PURE__*/React.createElement(Card, {
    className: "board"
  }, /*#__PURE__*/React.createElement(CardActionArea, {
    sx: {
      height: "100%"
    },
    onClick: props.openDialog
  }, /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-icons"
  }, "add_circle_outline")))));
};

var BoardList = function BoardList(props) {
  var createdBoardCount = 0;

  var getCreatedBoardNodes = function getCreatedBoardNodes() {
    return props.createdBoards.map(function (board) {
      createdBoardCount++;
      return /*#__PURE__*/React.createElement(Board, {
        key: board._id,
        board: board,
        csrf: props.csrf
      });
    });
  };

  var getSharedBoardNodes = function getSharedBoardNodes() {
    return props.sharedBoards.map(function (board) {
      return /*#__PURE__*/React.createElement(Board, {
        key: board._id,
        board: board,
        csrf: props.csrf
      });
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    id: "boardLists"
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h2"
  }, "Created by You"), /*#__PURE__*/React.createElement(Box, {
    sx: {
      display: 'flex',
      flexDirection: 'row wrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%'
    },
    className: "boardList"
  }, getCreatedBoardNodes(), (props.premium || createdBoardCount < 3) && /*#__PURE__*/React.createElement(BoardForm, {
    csrf: props.csrf
  })), /*#__PURE__*/React.createElement(Typography, {
    variant: "h2"
  }, "Created by Others"), /*#__PURE__*/React.createElement(Box, {
    sx: {
      display: 'flex',
      flexDirection: 'row wrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%'
    },
    className: "boardList"
  }, getSharedBoardNodes()), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    id: "csrf",
    value: props.csrf
  }));
};

var loadBoardsFromServer = function loadBoardsFromServer() {
  sendAjax('GET', '/getCreatedBoards', null, function (createdData) {
    sendAjax('GET', '/getSharedBoards', null, function (sharedData) {
      ReactDOM.render( /*#__PURE__*/React.createElement(BoardList, {
        createdBoards: createdData.boards,
        sharedBoards: sharedData.boards,
        premium: createdData.premium,
        csrf: document.querySelector('#csrf').value
      }), document.querySelector('#boards'));
    });
  });
};
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _MaterialUI = MaterialUI,
    Typography = _MaterialUI.Typography,
    Box = _MaterialUI.Box,
    AppBar = _MaterialUI.AppBar,
    Toolbar = _MaterialUI.Toolbar,
    Menu = _MaterialUI.Menu,
    MenuItem = _MaterialUI.MenuItem,
    IconButton = _MaterialUI.IconButton,
    Link = _MaterialUI.Link,
    SvgIcon = _MaterialUI.SvgIcon;

var handleError = function handleError(message, errorId) {
  $(errorId).text(message);
};

var redirect = function redirect(response) {
  $("errorMessage").text("");
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  var errorId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "#errorMessage";
  console.log("Type: ".concat(type, ", Action: ").concat(action, ", Data: ").concat(data));
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: 'json',
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error, errorId);
    }
  });
};

var Navbar = function Navbar(props) {
  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      anchorEl = _React$useState2[0],
      setAnchorEl = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      open = _React$useState4[0],
      setOpen = _React$useState4[1];

  var _React$useState5 = React.useState(''),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      passOld = _React$useState6[0],
      setPassOld = _React$useState6[1];

  var _React$useState7 = React.useState(''),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      pass = _React$useState8[0],
      setPass = _React$useState8[1];

  var _React$useState9 = React.useState(''),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      pass2 = _React$useState10[0],
      setPass2 = _React$useState10[1];

  var _React$useState11 = React.useState(false),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      passOldValid = _React$useState12[0],
      setPassOldValid = _React$useState12[1];

  var _React$useState13 = React.useState(false),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      passValid = _React$useState14[0],
      setPassValid = _React$useState14[1];

  var _React$useState15 = React.useState(false),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      pass2Valid = _React$useState16[0],
      setPass2Valid = _React$useState16[1];

  var handleMenu = function handleMenu(e) {
    setAnchorEl(e.currentTarget);
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  var handlePassOpen = function handlePassOpen() {
    setOpen(true);
    setPassOld('');
    setPass('');
    setPass2('');
  };

  var handlePassClose = function handlePassClose() {
    setOpen(false);
  };

  var handleUpdatePassword = function handleUpdatePassword(e) {
    e.preventDefault();
    $('#passError').text("");

    if (passOld == '' || pass == '' || pass2 == '') {
      handleError('All fields are required', '#passError');
      return false;
    }

    if (pass !== pass2) {
      handleError('Passwords do not match', '#passError');
      return false;
    }

    return sendAjax('POST', '/updatePassword', "oldPass=".concat(passOld, "&pass=").concat(pass, "&pass2=").concat(pass2, "&_csrf=").concat(document.querySelector('#csrf').value), function () {
      handlePassClose();
      location.reload();
    }, '#passError');
  };

  var togglePremium = function togglePremium(e) {
    e.preventDefault();
    return sendAjax('POST', '/togglePremium', "_csrf=".concat(document.querySelector('#csrf').value), function () {
      location.reload();
    });
  };

  return /*#__PURE__*/React.createElement(AppBar, {
    position: "static"
  }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(Link, {
    underline: "none",
    href: "/user",
    sx: {
      flexGrow: 1,
      color: "white",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/assets/svg/fello_logo.svg",
    alt: "Fello logo",
    id: "logo"
  }), /*#__PURE__*/React.createElement(Typography, {
    variant: "h4"
  }, "Fello")), /*#__PURE__*/React.createElement(Typography, {
    variant: "h5",
    component: "div",
    sx: {
      flexGrow: 1
    }
  }, props.username), window.location.pathname !== '/' && window.location.pathname !== '/login' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "menu",
    "aria-controls": "menu-appbar",
    "aria-haspopup": "true",
    onClick: handleMenu,
    color: "inherit"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-icons"
  }, "menu")), /*#__PURE__*/React.createElement(Menu, {
    id: "menu-appbar",
    anchorEl: anchorEl,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    keepMounted: true,
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    open: Boolean(anchorEl),
    onClose: handleClose
  }, /*#__PURE__*/React.createElement(MenuItem, null, /*#__PURE__*/React.createElement(Link, {
    href: "#",
    onClick: togglePremium,
    underline: "none"
  }, "Toggle Premium")), /*#__PURE__*/React.createElement(MenuItem, null, /*#__PURE__*/React.createElement(Link, {
    href: "#",
    onClick: handlePassOpen,
    underline: "none"
  }, "Change Password")), /*#__PURE__*/React.createElement(MenuItem, null, /*#__PURE__*/React.createElement(Link, {
    href: "/logout",
    underline: "none"
  }, "Logout"))))), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    className: "passForm"
  }, /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(TextField, {
    error: !passOldValid,
    helperText: passOldValid ? "" : "Old Password cannot not be empty",
    margin: "dense",
    id: "oldPass",
    label: "Old Password",
    type: "password",
    fullWidth: true,
    variant: "standard",
    value: passOld,
    onInput: function onInput(e) {
      setPassOld(e.target.value);
      setPassOldValid(e.target.value !== '');
    }
  }), /*#__PURE__*/React.createElement(TextField, {
    error: !passValid,
    helperText: passValid ? "" : "Old Password cannot not be empty",
    margin: "dense",
    id: "pass",
    label: "New Password",
    type: "password",
    fullWidth: true,
    variant: "standard",
    value: pass,
    onInput: function onInput(e) {
      setPass(e.target.value);
      setPassValid(e.target.value !== '' && e.target.value === pass2);
      setPass2Valid(pass2 !== '' && e.target.value === pass2);
    }
  }), /*#__PURE__*/React.createElement(TextField, {
    error: !pass2Valid,
    helperText: pass2Valid ? "" : "Old Password cannot not be empty",
    margin: "dense",
    id: "pass2",
    label: "Confirm New Password",
    type: "password",
    fullWidth: true,
    variant: "standard",
    value: pass2,
    onInput: function onInput(e) {
      setPass2(e.target.value);
      setPass2Valid(e.target.value !== '' && e.target.value === pass);
      setPassValid(pass !== '' && e.target.value === pass);
    }
  }), /*#__PURE__*/React.createElement(Typography, {
    color: 'red',
    variant: "body2",
    id: "passError"
  })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: handlePassClose
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    onClick: handleUpdatePassword,
    disabled: !passOldValid || !passValid || !pass2Valid
  }, "Update Password"))));
};
