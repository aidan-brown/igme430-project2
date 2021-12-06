const {
    Typography,
    Box,
    AppBar,
    Toolbar,
    Menu,
    MenuItem,
    IconButton,
    Link,
    SvgIcon,
} = MaterialUI;

const handleError = (message, errorId) => {
    $(errorId).text(message);
};

const redirect = (response) => {
    $("errorMessage").text("");
    window.location = response.redirect;
};

const sendAjax = (type, action, data, success, errorId="#errorMessage") => {
    console.log(`Type: ${type}, Action: ${action}, Data: ${data}`)
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: 'json',
        success: success,
        error: (xhr, status, error) => {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error, errorId);
        }
    });
};

const Navbar = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const [open, setOpen] = React.useState(false);
    const [passOld, setPassOld] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [pass2, setPass2] = React.useState('');

    const [passOldValid, setPassOldValid] = React.useState(false);
    const [passValid, setPassValid] = React.useState(false);
    const [pass2Valid, setPass2Valid] = React.useState(false);

    const handleMenu = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const handlePassOpen = () => {
        setOpen(true)
        setPassOld('');
        setPass('');
        setPass2('');
    }

    const handlePassClose = () => {
        setOpen(false)
    }

    const handleUpdatePassword = e => {
        e.preventDefault();

        $('#passError').text("");

        if(passOld == '' || pass == '' || pass2 == ''){
            handleError('All fields are required', '#passError');
            return false;
        }
        if(pass !== pass2){
            handleError('Passwords do not match', '#passError');
            return false;
        }

        return sendAjax('POST', '/updatePassword', `oldPass=${passOld}&pass=${pass}&pass2=${pass2}&_csrf=${document.querySelector('#csrf').value}`, () => {handlePassClose(); location.reload();}, '#passError');
    }

    const togglePremium = e => {
        e.preventDefault();

        return sendAjax('POST', '/togglePremium', `_csrf=${document.querySelector('#csrf').value}`, () => {location.reload()});
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Link underline="none" href="/user" sx={{flexGrow: 1, color: "white", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                    <img src="/assets/svg/fello_logo.svg" alt="Fello logo" id="logo"/>
                    <Typography variant="h4">Fello</Typography>
                </Link>
                <Typography variant="h5" component="div" sx={{flexGrow: 1}}>{props.username}</Typography>
                {(window.location.pathname !== '/' && window.location.pathname !== '/login') && (
                    <div>
                        <IconButton aria-label="menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                            <span className="material-icons">menu</span>
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{vertical: 'top', horizontal: 'right'}} keepMounted transformOrigin={{vertical: 'top', horizontal: 'right'}} open={Boolean(anchorEl)} onClose={handleClose}>
                            <MenuItem><Link href='#' onClick={togglePremium} underline="none">Toggle Premium</Link></MenuItem>
                            <MenuItem><Link href='#' onClick={handlePassOpen} underline="none">Change Password</Link></MenuItem>
                            <MenuItem><Link href='/logout' underline="none">Logout</Link></MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
            <Dialog open={open} className='passForm'>
                <DialogContent>
                    <TextField
                        error={!passOldValid}
                        helperText={passOldValid ? "" : "Old Password cannot not be empty"}
                        margin="dense"
                        id="oldPass"
                        label="Old Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={passOld}
                        onInput={e => {
                            setPassOld(e.target.value)
                            setPassOldValid(e.target.value !== '')
                        }}
                        />
                    <TextField
                        error={!passValid}
                        helperText={passValid ? "" : "Old Password cannot not be empty"}
                        margin="dense"
                        id="pass"
                        label="New Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={pass}
                        onInput={e => {
                            setPass(e.target.value)
                            setPassValid(e.target.value !== '' && e.target.value === pass2)
                            setPass2Valid(pass2 !== '' && e.target.value === pass2)
                        }}
                        />
                    <TextField
                        error={!pass2Valid}
                        helperText={pass2Valid ? "" : "Old Password cannot not be empty"}
                        margin="dense"
                        id="pass2"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={pass2}
                        onInput={e => {
                            setPass2(e.target.value)
                            setPass2Valid(e.target.value !== '' && e.target.value === pass)
                            setPassValid(pass !== '' && e.target.value === pass)
                        }}
                        />
                    <Typography color={'red'} variant="body2" id="passError"></Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePassClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleUpdatePassword} disabled={!passOldValid || !passValid|| !pass2Valid}>Update Password</Button>
                </DialogActions>
            </Dialog>
        </AppBar>
    );
}