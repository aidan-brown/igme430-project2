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

const TaskForm = (props) => {
    const [open, setOpen] = React.useState(false);
    const [taskName, setTaskName] = React.useState("");
    const [taskDesc, setTaskDesc] = React.useState("");

    const [nameValid, setNameValid] = React.useState(false);
    const [descValid, setDescValid] = React.useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setTaskName("")
        setTaskDesc("")
    }

    const handleTask = (e) => {
        e.preventDefault();
    
        $("#createError").text("");
    
        if(taskName == '' || taskDesc == ''){
            handleError('All fields are required');
            return false;
        }
    
        sendAjax('POST', '/createTask', `name=${taskName}&description=${taskDesc}&group=${props.group}&boardID=${document.querySelector('#boardID').value}&_csrf=${props.csrf}`, () => loadTasksFromServer(), "#createError");

        handleClose();
    
        return false;
    }

    return (
        <div>
            <AddTaskButton openDialog={handleOpen}/>
            <Dialog open={open} className='taskForm'>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        error={!nameValid}
                        helperText={nameValid ? "" : "Name cannot not be empty"}
                        margin="dense"
                        id="name"
                        label="Task Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={taskName}
                        onInput={e => {
                            setTaskName(e.target.value)
                            setNameValid(e.target.value !== '')
                        }}
                    />
                    <TextField
                        error={!descValid}
                        helperText={descValid ? "" : "Description cannot not be empty"}
                        margin="dense"
                        id="description"
                        label="Task Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        multiline
                        rows={10}
                        value={taskDesc}
                        onInput={e => {
                            setTaskDesc(e.target.value)
                            setDescValid(e.target.value !== '')
                        }}
                    />
                    <Typography color={'red'} variant="body2" id="createError"></Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleTask} disabled={!nameValid || !descValid}>Create Task</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const Task = (props) => {
    const task = props.task;
    const [open, setOpen] = React.useState(false);
    const [taskName, setTaskName] = React.useState(task.name);
    const [taskDesc, setTaskDesc] = React.useState(task.description);
    const [taskGroup, setTaskGroup] = React.useState(task.group);

    const [nameValid, setNameValid] = React.useState(true);
    const [descValid, setDescValid] = React.useState(true);

    const handleOpen = () => {
        setOpen(true)
        setTaskName(task.name)
        setTaskDesc(task.description)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleTask = (e, taskID) => {
        e.preventDefault();
    
        $("#editError").text("");
    
        if(taskName == '' || taskDesc == ''){
            handleError('All fields are required');
            return false;
        }
    
        sendAjax('POST', '/updateTask', `taskID=${taskID}&name=${taskName}&description=${taskDesc}&group=${taskGroup}&_csrf=${props.csrf}`, () => loadTasksFromServer(), '#editError');

        handleClose();
    
        return false;
    }

    const handleDelete = (e, taskID, csrf) => {
        e.preventDefault();
    
        $("#errorMessage").text("");
    
        if(!taskID){
            handleError('Valid task ID required');
            return false;
        }
    
        sendAjax('POST', '/deleteTask', `taskID=${taskID}&_csrf=${csrf}`, () => loadTasksFromServer());
    }

    return (
        <div className='task'>
            <Card>
                <CardActionArea onClick={handleOpen}>
                    <CardContent sx={{bgcolor: 'rgb(231, 231, 231)'}}>
                            <Typography variant="h5" component="div" className='taskName'>{task.name}</Typography>
                            <Typography variant="body2" className='taskDescription'>{task.description}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '100%'}}>
                        <IconButton onClick={e => handleDelete(e, task._id, props.csrf)} className="removeTask"><span className="material-icons">delete</span></IconButton>
                    </Box>
                </CardActions>
            </Card>
            <Dialog open={open} className='taskForm'>
                <DialogTitle>Edit Task [{task.name}]</DialogTitle>
                <DialogContent>
                    <TextField
                        error={!nameValid}
                        helperText={nameValid ? "" : "Name cannot not be empty"}
                        margin="dense"
                        id="name"
                        label="Task Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={taskName}
                        onInput={e => {
                            setTaskName(e.target.value)
                            setNameValid(e.target.value !== '')
                        }}
                        />
                    <TextField
                        error={!descValid}
                        helperText={descValid ? "" : "Description cannot not be empty"}
                        margin="dense"
                        id="description"
                        label="Task Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        multiline
                        rows={10}
                        value={taskDesc}
                        onInput={e => {
                            setTaskDesc(e.target.value)
                            setDescValid(e.target.value !== '')
                        }}
                    />
                    <RadioGroup row aria-label='group' name='group-radio' value={taskGroup} onChange={e => setTaskGroup(e.target.value)}>
                        <FormControlLabel value='backlog' control={<Radio/>} label='Backlog' />
                        <FormControlLabel value='inProgress' control={<Radio/>} label='In Progress' />
                        <FormControlLabel value='complete' control={<Radio/>} label='Completed' />
                    </RadioGroup>
                    <Typography color={'red'} variant="body2" id="editError"></Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={e => handleTask(e, task._id)} disabled={!nameValid || !descValid}>Update Task</Button>
                </DialogActions>
            </Dialog>
        </div>
        
    );
}

const AddTaskButton = (props) => {
    return (
        <Card className='task'>
            <CardActionArea onClick={props.openDialog}>
                <CardContent>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <span className="material-icons">add_circle_outline</span>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

const TaskList = (props) => {
    const getTaskNodes = (groupName) => props.tasks.filter(task => task.group === groupName).map(task => {
        return (
            <Task key={task._id} task={task} csrf={props.csrf}></Task>
        );
    });

    return (
        <Grid container spacing={2} className='taskList'>
            <Grid item xs={4} className='backlogTasks'>
                <Typography variant="h4">Backlog</Typography>
                <Stack spacing={2}>
                    {getTaskNodes('backlog')}
                    <TaskForm group='backlog' csrf={props.csrf}/>
                </Stack>
            </Grid>
            <Grid item xs={4} className='inprogTasks'>
                <Typography variant="h4">In Progress</Typography>
                <Stack spacing={2}>
                    {getTaskNodes('inProgress')}
                    <TaskForm group='inProgress' csrf={props.csrf}/>
                </Stack>
            </Grid>
            <Grid item xs={4} className='completeTasks'>
                <Typography variant="h4">Completed</Typography>
                <Stack spacing={2}>
                    {getTaskNodes('complete')}
                    <TaskForm group='complete' csrf={props.csrf}/>
                </Stack>
            </Grid>
            <input type="hidden" name="_csrf" id="csrf" value={props.csrf} />
        </Grid>
    );
};

const loadTasksFromServer = () => {
    sendAjax('GET', `/getTasks/${document.querySelector('#boardID').value}`, null, data => {
        ReactDOM.render(
            <TaskList tasks={data.tasks} csrf={document.querySelector('#csrf').value}/>,
            document.querySelector('#tasks')
        );
    });
};

const setup = (csrf, username) => {
    ReactDOM.render(
        <Navbar username={username} />,
        document.querySelector('#navbar')
    );

    if(window.location.pathname.includes('/board')) {
        ReactDOM.render(
            <TaskList tasks={[]} csrf={csrf}/>,
            document.querySelector('#tasks')
        );
        ReactDOM.render(
            <Typography variant="h2" id='boardName'>{document.querySelector('#boardName').innerHTML}</Typography>,
            document.querySelector('#boardName')
        );
        ReactDOM.render(
            <Typography variant="h6" id='boardDescription'>{document.querySelector('#boardDescription').innerHTML}</Typography>,
            document.querySelector('#boardDescription')
        );
    
        loadTasksFromServer();
    } else if(window.location.pathname == '/user') {
        ReactDOM.render(
            <BoardList createdBoards={[]} sharedBoards={[]} csrf={csrf}/>,
            document.querySelector('#boards')
        );

        loadBoardsFromServer();
    }
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken, result.username);
    });
};

$(document).ready(() => {
    getToken();
})