const {
    Typography,
    Box,
    Button, 
    IconButton,
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

const BoardForm = (props) => {
    const [open, setOpen] = React.useState(false);
    const [boardName, setBoardName] = React.useState("");
    const [boardDesc, setBoardDesc] = React.useState("");

    const [nameValid, setNameValid] = React.useState(false);
    const [descValid, setDescValid] = React.useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setBoardName("")
        setBoardDesc("")
    }

    const handleBoard = (e) => {
        e.preventDefault();
    
        $("#createError").text("");
    
        if(boardName == '' || boardDesc == ''){
            handleError('All fields are required');
            return false;
        }
    
        sendAjax('POST', '/createBoard', `name=${boardName}&description=${boardDesc}&_csrf=${props.csrf}`, () => loadBoardsFromServer(), "#createError");

        handleClose();
    
        return false;
    }

    return (
        <div>
            <AddBoardButton openDialog={handleOpen}/>
            <Dialog open={open} className='boardForm'>
                <DialogTitle>Create New Board</DialogTitle>
                <DialogContent>
                    <TextField
                        error={!nameValid}
                        helperText={nameValid ? "" : "Name cannot not be empty"}
                        margin="dense"
                        id="name"
                        label="Board Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={boardName}
                        onInput={e => {
                            setBoardName(e.target.value)
                            setNameValid(e.target.value !== '')
                        }}
                    />
                    <TextField
                        error={!descValid}
                        helperText={descValid ? "" : "Description cannot not be empty"}
                        margin="dense"
                        id="description"
                        label="Board Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        multiline
                        rows={10}
                        value={boardDesc}
                        onInput={e => {
                            setBoardDesc(e.target.value)
                            setDescValid(e.target.value !== '')
                        }}
                    />
                    <Typography color={'red'} variant="body2" id="createError"></Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleBoard} disabled={!nameValid || !descValid}>Create Board</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const Board = (props) => {
    const board = props.board;
    const [open, setOpen] = React.useState(false);
    const [boardName, setBoardName] = React.useState(board.name);
    const [boardDesc, setBoardDesc] = React.useState(board.description);

    const [nameValid, setNameValid] = React.useState(true);
    const [descValid, setDescValid] = React.useState(true);

    const handleOpen = () => {
        setOpen(true)
        setBoardName(board.name)
        setBoardDesc(board.description)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleUpdateBoard = (e, boardID) => {
        e.preventDefault();
    
        $("#editError").text("");
    
        if(boardName == '' || boardDesc == ''){
            handleError('All fields are required');
            return false;
        }
    
        sendAjax('POST', '/updateBoard', `boardID=${boardID}&name=${boardName}&description=${boardDesc}&_csrf=${props.csrf}`, () => loadBoardsFromServer(), '#editError');

        handleClose();
    
        return false;
    }

    const handleDelete = (e, boardID, csrf) => {
        e.preventDefault();
    
        $("#errorMessage").text("");
    
        if(!boardID){
            handleError('Valid board ID required');
            return false;
        }
    
        sendAjax('POST', '/deleteBoard', `boardID=${boardID}&_csrf=${csrf}`, () => loadBoardsFromServer());
    }

    const handleBoard = (e) => {
        e.preventDefault();

        $("#editError").text("");
    
        window.location.pathname = `/board/${board._id}`
    }

    return (
        <div>
            <Card className='board'>
                <CardActionArea onClick={handleBoard}>
                    <CardContent sx={{bgcolor: 'rgb(231, 231, 231)'}}>
                            <Typography variant="h5" component="div" className='boardName'>{board.name}</Typography>
                            <Typography variant="body2" className='boardDescription'>{board.description}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '100%'}}>
                        <IconButton onClick={handleOpen} className="editBoard"><span className="material-icons">edit</span></IconButton>
                        <IconButton onClick={e => handleDelete(e, board._id, props.csrf)} className="removeBoard"><span className="material-icons">delete</span></IconButton>
                    </Box>
                </CardActions>
            </Card>
            <Dialog open={open} className='boardForm'>
                <DialogTitle>Edit Board [{board.name}]</DialogTitle>
                <DialogContent>
                    <TextField
                        error={!nameValid}
                        helperText={nameValid ? "" : "Name cannot not be empty"}
                        margin="dense"
                        id="name"
                        label="Board Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={boardName}
                        onInput={e => {
                            setBoardName(e.target.value)
                            setNameValid(e.target.value !== '')
                        }}
                        />
                    <TextField
                        error={!descValid}
                        helperText={descValid ? "" : "Description cannot not be empty"}
                        margin="dense"
                        id="description"
                        label="Board Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        multiline
                        rows={10}
                        value={boardDesc}
                        onInput={e => {
                            setBoardDesc(e.target.value)
                            setDescValid(e.target.value !== '')
                        }}
                    />
                    <Typography color={'red'} variant="body2" id="editError"></Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={e => handleUpdateBoard(e, board._id)} disabled={!nameValid || !descValid}>Update Board</Button>
                </DialogActions>
            </Dialog>
        </div>
        
    );
}

const AddBoardButton = (props) => {
    return (
        <Card className='board'>
            <CardActionArea sx={{height: "100%"}} onClick={props.openDialog}>
                <CardContent>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <span className="material-icons">add_circle_outline</span>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

const BoardList = (props) => {
    let createdBoardCount = 0;
    const getCreatedBoardNodes = () => props.createdBoards.map(board => {
        createdBoardCount++;
        return (
            <Board key={board._id} board={board} csrf={props.csrf}></Board>
        );
    });
    const getSharedBoardNodes = () => props.sharedBoards.map(board => {
        return (
            <Board key={board._id} board={board} csrf={props.csrf}></Board>
        );
    });

    return (
        <div id='boardLists'>
            <Typography variant="h2">Created by You</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row wrap', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}} className='boardList'>
                {getCreatedBoardNodes()}
                {(props.premium || createdBoardCount < 3) && <BoardForm csrf={props.csrf}/>}
            </Box>
            <Typography variant="h2">Created by Others</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row wrap', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}} className='boardList'>
                {getSharedBoardNodes()}
            </Box>
            <input type="hidden" name="_csrf" id="csrf" value={props.csrf} />
        </div>
    );
};

const loadBoardsFromServer = () => {
    sendAjax('GET', '/getCreatedBoards', null, createdData => {
        sendAjax('GET', '/getSharedBoards', null, sharedData => {
                ReactDOM.render(
                    <BoardList createdBoards={createdData.boards} sharedBoards={sharedData.boards} premium={createdData.premium} csrf={document.querySelector('#csrf').value}/>,
                    document.querySelector('#boards')
                );
        });
    });
};