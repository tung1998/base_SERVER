$(document).ready(function () {
    $('#signinButton').on('click', () => {
        let data = {
            username: $("#inputUsername").val(),
            password: $("#inputPassword").val()
        }
        console.log(data)
        $.ajax({
            method: 'post',
            url: '/users/checkPassword',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data)
        }).done(function (data) {
            console.log(data)
            alert("Request success: " + data.message);
        }).fail(function (jqXHR, textStatus) {
            console.log(jqXHR, textStatus)
            alert("Request failed: " + textStatus);
        });
    })
});
