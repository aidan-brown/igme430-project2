const {
    Typography,
    Button, 
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    Grid,
    Stack,
    Card,
    CardContent,
    CardActions,
    CardActionArea,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} = MaterialUI;

const LoginWindow = (props) => {
    const [open, setOpen] = React.useState(false)
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [usernameValid, setUsernameValid] = React.useState(true)
    const [passwordValid, setPasswordValid] = React.useState(true)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleLogin = (e) => {
        e.preventDefault();
    
        $("#loginError").text("");
    
        if(username == '' || password == ''){
            setUsernameValid(username !== '')
            setPasswordValid(password !== '')
            handleError('Username or password is empty');
            return false;
        }
    
        sendAjax('POST', '/login', `username=${username}&pass=${password}&_csrf=${props.csrf}`, redirect, '#loginError');
    
        return false;
    }

    return (
        <div id='loginForm'>
            <Card>
                <CardContent sx={{bgcolor: 'rgb(231, 231, 231)'}}>
                    <Typography variant="h4">Fello Login</Typography>
                    <TextField
                        error={!usernameValid}
                        helperText={usernameValid ? "" : "Please enter your username"}
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={username}
                        onInput={e => {
                            setUsername(e.target.value)
                        }}
                        />
                    <TextField
                        error={!passwordValid}
                        helperText={passwordValid ? "" : "Please enter your password"}
                        margin="dense"
                        id="pasword"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onInput={e => {
                            setPassword(e.target.value)
                        }}
                        />
                    <Typography color={'red'} variant="body2" id="loginError"></Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleOpen}>Sign Up</Button>
                    <Button onClick={handleLogin}>Login</Button>
                </CardActions>
            </Card>
            <SignupWindow open={open} handleClose={handleClose} csrf={props.csrf}/>
        </div>
    );
};

const SignupWindow = (props) => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [password2, setPassword2] = React.useState("")

    const [usernameValid, setUsernameValid] = React.useState(false)
    const [passwordValid, setPasswordValid] = React.useState(false)
    const [password2Valid, setPassword2Valid] = React.useState(false)

    const handleSignup = (e) => {
        e.preventDefault();
        
        $("#signupError").text("");
        
        if(username == '' || password == '' || password2 == ''){
            handleError('All fields are required');
            return false;
        }
        if(password !== password2){
            handleError('Passwords do not match');
            return false;
        }
    
        sendAjax('POST', '/signup', `username=${username}&pass=${password}&pass2=${password2}&_csrf=${props.csrf}`, redirect, '#signupError');
    
        return false;
    }

    return (
        <Dialog open={props.open} className='taskForm'>
                <DialogTitle>Fello Sign Up</DialogTitle>
                <DialogContent>
                    <TextField
                        error={!usernameValid}
                        helperText={usernameValid ? "" : "Please enter a username"}
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={username}
                        onInput={e => {
                            setUsername(e.target.value)
                            setUsernameValid(e.target.value !== '')
                        }}
                        />
                    <TextField
                        error={!passwordValid}
                        helperText={passwordValid ? "" : (password === password2 ? "Please enter a password" : "Passwords do not match")}
                        margin="dense"
                        id="pasword"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onInput={e => {
                            setPassword(e.target.value)
                            setPasswordValid(e.target.value !== '' && e.target.value === password2)
                            setPassword2Valid(password2 !== '' && e.target.value === password2)
                        }}
                        />
                    <TextField
                        error={!password2Valid}
                        helperText={password2Valid ? "" : (password === password2 ? "Please enter a password" : "Passwords do not match")}
                        margin="dense"
                        id="pasword2"
                        label="Validate Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password2}
                        onInput={e => {
                            setPassword2(e.target.value)
                            setPassword2Valid(e.target.value !== '' && e.target.value === password)
                            setPasswordValid(password !== '' && e.target.value === password)
                        }}
                        />
                        <Typography color={'red'} variant="body2" id="signupError"></Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={handleSignup} disabled={!usernameValid || !passwordValid || !password2Valid}>Sign Up</Button>
                </DialogActions>
            </Dialog>
    );
};

const setup = (csrf) => {
    ReactDOM.render(
        <Navbar />,
        document.querySelector('#navbar')
    );

    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector('#content')
    );
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(() => {
    getToken();
})