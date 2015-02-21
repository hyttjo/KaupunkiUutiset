$(document).ready(function () {
    // Näyttää käsikursosin Login alueen päällä
    $('#login').css('cursor', 'pointer');

    // Muuttaa profiili kuvakkeen tummaksi kun kursori liikkuu päälle
    $('#login').hover(function () {
        $('#login_icon').attr('src', 'img/user_icon_darker.png');
    }, function () {
        $('#login_icon').attr('src', 'img/user_icon.png');
    });

    // Jos kirjautunut sisään niin avaa profiili ikkunan, muuten sisäänkirjautumis ikkunan
    $("#login").click(function () {
        if ($("#login_text").text() == "Kirjaudu") {
            $("#login_window").dialog("open");
        } else {
            $("#profile_window").dialog("open");
        }
        return false;
    });

    // Näyttää käsikursosin navigointi alueiden päällä
    $('li').css('cursor', 'pointer');

    // Ohjaa oikeaan osoitteeseen navigointi aluetta klikatessa lukemalla data-section_id attribuutin
    $('li').click(function () {
        var id = $(this).data('section_id');
        $(location).attr('href', 'index.php?section_id=' + id);
    });
});