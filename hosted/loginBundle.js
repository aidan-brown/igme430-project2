"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _MaterialUI = MaterialUI,
    Typography = _MaterialUI.Typography,
    Button = _MaterialUI.Button,
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

var LoginWindow = function LoginWindow(props) {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var _React$useState3 = React.useState(""),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      username = _React$useState4[0],
      setUsername = _React$useState4[1];

  var _React$useState5 = React.useState(""),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      password = _React$useState6[0],
      setPassword = _React$useState6[1];

  var _React$useState7 = React.useState(true),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      usernameValid = _React$useState8[0],
      setUsernameValid = _React$useState8[1];

  var _React$useState9 = React.useState(true),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      passwordValid = _React$useState10[0],
      setPasswordValid = _React$useState10[1];

  var handleOpen = function handleOpen() {
    setOpen(true);
  };

  var handleClose = function handleClose() {
    setOpen(false);
  };

  var handleLogin = function handleLogin(e) {
    e.preventDefault();
    $("#loginError").text("");

    if (username == '' || password == '') {
      setUsernameValid(username !== '');
      setPasswordValid(password !== '');
      handleError('Username or password is empty');
      return false;
    }

    sendAjax('POST', '/login', "username=".concat(username, "&pass=").concat(password, "&_csrf=").concat(props.csrf), redirect, '#loginError');
    return false;
  };

  return /*#__PURE__*/React.createElement("div", {
    id: "loginForm"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    sx: {
      bgcolor: 'rgb(231, 231, 231)'
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h4"
  }, "Fello Login"), /*#__PURE__*/React.createElement(TextField, {
    error: !usernameValid,
    helperText: usernameValid ? "" : "Please enter your username",
    margin: "dense",
    id: "username",
    label: "Username",
    type: "text",
    fullWidth: true,
    variant: "standard",
    value: username,
    onInput: function onInput(e) {
      setUsername(e.target.value);
    }
  }), /*#__PURE__*/React.createElement(TextField, {
    error: !passwordValid,
    helperText: passwordValid ? "" : "Please enter your password",
    margin: "dense",
    id: "pasword",
    label: "Password",
    type: "password",
    fullWidth: true,
    variant: "standard",
    value: password,
    onInput: function onInput(e) {
      setPassword(e.target.value);
    }
  }), /*#__PURE__*/React.createElement(Typography, {
    color: 'red',
    variant: "body2",
    id: "loginError"
  })), /*#__PURE__*/React.createElement(CardActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: handleOpen
  }, "Sign Up"), /*#__PURE__*/React.createElement(Button, {
    onClick: handleLogin
  }, "Login"))), /*#__PURE__*/React.createElement(SignupWindow, {
    open: open,
    handleClose: handleClose,
    csrf: props.csrf
  }));
};

var SignupWindow = function SignupWindow(props) {
  var _React$useState11 = React.useState(""),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      username = _React$useState12[0],
      setUsername = _React$useState12[1];

  var _React$useState13 = React.useState(""),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      password = _React$useState14[0],
      setPassword = _React$useState14[1];

  var _React$useState15 = React.useState(""),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      password2 = _React$useState16[0],
      setPassword2 = _React$useState16[1];

  var _React$useState17 = React.useState(false),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      usernameValid = _React$useState18[0],
      setUsernameValid = _React$useState18[1];

  var _React$useState19 = React.useState(false),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      passwordValid = _React$useState20[0],
      setPasswordValid = _React$useState20[1];

  var _React$useState21 = React.useState(false),
      _React$useState22 = _slicedToArray(_React$useState21, 2),
      password2Valid = _React$useState22[0],
      setPassword2Valid = _React$useState22[1];

  var handleSignup = function handleSignup(e) {
    e.preventDefault();
    $("#signupError").text("");

    if (username == '' || password == '' || password2 == '') {
      handleError('All fields are required');
      return false;
    }

    if (password !== password2) {
      handleError('Passwords do not match');
      return false;
    }

    sendAjax('POST', '/signup', "username=".concat(username, "&pass=").concat(password, "&pass2=").concat(password2, "&_csrf=").concat(props.csrf), redirect, '#signupError');
    return false;
  };

  return /*#__PURE__*/React.createElement(Dialog, {
    open: props.open,
    className: "taskForm"
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "Fello Sign Up"), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(TextField, {
    error: !usernameValid,
    helperText: usernameValid ? "" : "Please enter a username",
    margin: "dense",
    id: "username",
    label: "Username",
    type: "text",
    fullWidth: true,
    variant: "standard",
    value: username,
    onInput: function onInput(e) {
      setUsername(e.target.value);
      setUsernameValid(e.target.value !== '');
    }
  }), /*#__PURE__*/React.createElement(TextField, {
    error: !passwordValid,
    helperText: passwordValid ? "" : password === password2 ? "Please enter a password" : "Passwords do not match",
    margin: "dense",
    id: "pasword",
    label: "Password",
    type: "password",
    fullWidth: true,
    variant: "standard",
    value: password,
    onInput: function onInput(e) {
      setPassword(e.target.value);
      setPasswordValid(e.target.value !== '' && e.target.value === password2);
      setPassword2Valid(password2 !== '' && e.target.value === password2);
    }
  }), /*#__PURE__*/React.createElement(TextField, {
    error: !password2Valid,
    helperText: password2Valid ? "" : password === password2 ? "Please enter a password" : "Passwords do not match",
    margin: "dense",
    id: "pasword2",
    label: "Validate Password",
    type: "password",
    fullWidth: true,
    variant: "standard",
    value: password2,
    onInput: function onInput(e) {
      setPassword2(e.target.value);
      setPassword2Valid(e.target.value !== '' && e.target.value === password);
      setPasswordValid(password !== '' && e.target.value === password);
    }
  }), /*#__PURE__*/React.createElement(Typography, {
    color: 'red',
    variant: "body2",
    id: "signupError"
  })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: props.handleClose
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    onClick: handleSignup,
    disabled: !usernameValid || !passwordValid || !password2Valid
  }, "Sign Up")));
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(Navbar, null), document.querySelector('#navbar'));
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector('#content'));
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
