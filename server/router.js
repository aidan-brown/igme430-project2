const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // Account
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.post('/togglePremium', mid.requiresSecure, controllers.Account.togglePremium);
  app.post('/updatePassword', mid.requiresSecure, controllers.Account.updatePassword);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  
  // Board
  app.get('/getCreatedBoards', mid.requiresSecure, controllers.Board.getCreatedBoards);
  app.get('/getSharedBoards', mid.requiresSecure, controllers.Board.getSharedBoards);
  app.get('/user', mid.requiresLogin, controllers.Board.userPage);

  app.post('/createboard', mid.requiresLogin, controllers.Board.createBoard);
  app.post('/updateBoard', mid.requiresLogin, controllers.Board.updateBoard);
  app.post('/deleteBoard', mid.requiresLogin, controllers.Board.deleteBoard);

  // Task
  app.get('/getTasks/:boardID', mid.requiresSecure, controllers.Task.getTasks);
  app.get('/board/:boardID', mid.requiresLogin, controllers.Task.boardPage);
  
  app.post('/createTask', mid.requiresLogin, controllers.Task.createTask);
  app.post('/updateTask', mid.requiresLogin, controllers.Task.updateTask);
  app.post('/deleteTask', mid.requiresLogin, controllers.Task.deleteTask);
};

module.exports = router;
