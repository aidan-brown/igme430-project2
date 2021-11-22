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

    sendAjax('POST', '/createTask', "name=".concat(taskName, "&description=").concat(taskDesc, "&group=").concat(props.group, "&_csrf=").concat(props.csrf), function () {
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
  sendAjax('GET', '/getTasks', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(TaskList, {
      tasks: data.tasks,
      csrf: document.querySelector('#csrf').value
    }), document.querySelector('#tasks'));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(Navbar, null), document.querySelector('#navbar'));
  ReactDOM.render( /*#__PURE__*/React.createElement(TaskList, {
    tasks: [],
    csrf: csrf
  }), document.querySelector('#tasks'));
  loadTasksFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
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
    AppBar = _MaterialUI.AppBar,
    Toolbar = _MaterialUI.Toolbar,
    Menu = _MaterialUI.Menu,
    MenuItem = _MaterialUI.MenuItem,
    IconButton = _MaterialUI.IconButton,
    Link = _MaterialUI.Link;

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

  var handleMenu = function handleMenu(e) {
    setAnchorEl(e.currentTarget);
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  return /*#__PURE__*/React.createElement(AppBar, {
    position: "static"
  }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(Typography, {
    variant: "h4",
    component: "div",
    sx: {
      flexGrow: 1
    }
  }, "Fello"), window.location.pathname == '/maker' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(IconButton, {
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
    href: "/logout",
    underline: "none"
  }, "Logout"))))));
};
