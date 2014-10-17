// Name        : manage.js
// Author(s)   : Cerek Hillen
// Date Created: 10/16/2014
// Date Changed: 10/16/2014
//
// Description:
//   Some front-end stuff for the manage page.

//////////
// Code //

// Running the AJAX call to the server for putting a new goal.
function pushGoal() {
    var json = joinJSON($('#goalForm').serializeArray());
    json.userId = $.cookie('logged');
    json.userId = json.userId.slice(3, json.userId.length - 1);

    $.ajax({
        url: '/api/push/goal',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(json)
    }).done(function (data) {
        if (data.success)  {
            successMessage(data.message + ' Refreshing in a sec!');
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }
        else
            dangerMessage(data.message);
    });
}

// Page initialization code.
$(document).ready(function () {
    $('#goalForm').submit(function () {
        pushGoal();
        return false;
    });
});
