const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({width:'toggle'}, 350);
};

const redirect = (response) => {
    $("domoMessage").animate({width:'hide'}, 350);
    window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
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
            handleError(messageObj.error);
        }
    });
};