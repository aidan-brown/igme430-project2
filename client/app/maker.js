const handleDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'}, 350);

    if($('#domoName').val() == '' || $('#domoAge').val() == ''){
        handleError('RAWR! All fields are required');
        return false;
    }

    sendAjax('POST', $('#domoForm').attr('action'), $('#domoForm').serialize(), () => loadDomosFromServer());

    return false;
}

const handleDelete = (e, domoID, csrf) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'}, 350);

    if(!domoID){
        handleError('RAWR! Valid domo ID required');
        return false;
    }

    sendAjax('POST', '/deleteDomo', `domoID=${domoID}&_csrf=${csrf}`, () => loadDomosFromServer());
}

const DomoForm = (props) => {
    return (
        <form id='domoForm' name='DomoForm' onSubmit={handleDomo} action='/maker' method='POST' className='domoForm'>
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="text" name="age" placeholder="Domo Age"/>
            <label htmlFor="color">Favorite Color: </label>
            <input id="domoColor" type="color" name="color"/>
            <input type="hidden" name="_csrf" id="csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo"/>
        </form>
    )
}

const DomoList = (props) => {
    if (props.domos.length === 0) {
        return (
            <div className='domoList'>
                <h3 className='emptyDomo'>No Domos yet</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        return (
            <div key={domo._id} className='domo' style={{backgroundColor: domo.color}}>
                <img src='/assets/img/domoface.jpeg' alt='domo face' className='domoFace'/>
                <h3 className='domoName'> Name: {domo.name} </h3>
                <h3 className='domoAge'> Age: {domo.age} </h3>
                <button type="button" className="removeDomo" onClick={e => handleDelete(e, domo._id, props.csrf)}><span class="material-icons">delete</span></button>
            </div>
        );
    });

    return (
        <div className='domoList'>
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, data => {
        ReactDOM.render(
            <DomoList domos={data.domos} csrf={document.querySelector('#csrf').value}/>,
            document.querySelector('#domos')
        );
    });
};

const setup = csrf => {
    ReactDOM.render(
        <DomoForm csrf={csrf}/>,
        document.querySelector('#makeDomo')
    );

    ReactDOM.render(
        <DomoList domos={[]} csrf={csrf}/>,
        document.querySelector('#domos')
    );

    loadDomosFromServer();
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(() => {
    getToken();
})