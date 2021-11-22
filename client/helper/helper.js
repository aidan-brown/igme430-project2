const {
    Typography,
    AppBar,
    Toolbar,
    Menu,
    MenuItem,
    IconButton,
    Link,
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

    const handleMenu = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" component="div" sx={{flexGrow: 1}}>Fello</Typography>
                {window.location.pathname == '/maker' && (
                    <div>
                        <IconButton aria-label="menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                            <span className="material-icons">menu</span>
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{vertical: 'top', horizontal: 'right'}} keepMounted transformOrigin={{vertical: 'top', horizontal: 'right'}} open={Boolean(anchorEl)} onClose={handleClose}>
                            <MenuItem><Link href='/logout' underline="none">Logout</Link></MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}