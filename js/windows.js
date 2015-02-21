$(document).ready(function () {
    // Alustaa sisäänkirjautumis ikkunan
    $("#login_window").dialog({ autoOpen: false, modal: true, closeText: "X", show: "fold", hide: "blind" });

    // Sisäänkirjautumis painikkeen logiikka
    $("#login_button").click(function () {
        var username = $("#login_username").val();
        var password = $("#login_password").val();

        if (username.length > 3 && username.length < 15  && password.length > 5 && password.length < 21) {
            $.ajax({
                type: "post",
                url: "php/scripts/login.php",
                data: "username=" + username + "&password=" + password,
                success: function (data) {
                    $("#info_window_message").html(data);
                    $("#login_window").dialog("close");
                    $("#info_window").dialog("open");
                    $("#nav_area").load("../php/nav.php");
                    $("#windows").load("../php/windows.php");
                }
            });
        }
    });

    // Avaa rekisteröinti ikkunan auki ja sulkee sisään kirjautumis ikkunan
    $("#registration_link").click(function () {
        $("#login_window").dialog("close");
        $("#registration_window").dialog("open");
        return false;
    });

    // Alustaa rekisteröinti ikkunan
    $("#registration_window").dialog({ autoOpen: false, modal: true, closeText: "X", show: "fold", hide: "blind" });

    // Rekisteröinti painikkeen logiikka
    $("#registration_button").click(function () {
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        var username = $("#username").val();
        var email = $("#email").val();
        var password = $("#password").val();

        if (username.length > 3 && username.length < 15  && password.length > 5 && password.length < 21) {
            $.ajax({
                type: "post",
                url: "php/scripts/registration.php",
                data: "firstname=" + firstname + "&lastname=" + lastname + "&username=" + username + "&email=" + email + "&password=" + password,
                success: function (data) {
                    if (data == "Olet rekisteröitynyt onnistuneesti") {
                        $("#registration_window").dialog("close");
                        $("#nav_area").load("../php/nav.php");
                        $("#windows").load("../php/windows.php");
                    }
                    $("#info_window_message").html(data);
                    $("#info_window").dialog("open");
                }
            });
        }
    });

    // Alustaa info ikkunan
    $("#info_window").dialog({ autoOpen: false, modal: true, closeText: "X", show: "fold", hide: "blind" });

    // Ok-painike joka sulkee info ikkunan
    $("#info_window_ok").click(function () {
        $("#info_window").dialog("close");
        location.reload();
        return false;
    });

    // Alustaa profiili ikkunan
    $("#profile_window").dialog({ autoOpen: false, modal: true, closeText: "X", show: "fold", hide: "blind" });

    // Sulje-painike joka sulkee profiili ikkunan
    $("#profile_window_close").click(function () {
        $("#profile_window").dialog("close");
        return false;
    });

    // Uloskirjautumis painike
    $("#logout_button").click(function () {
        $("#temp").load("../php/scripts/logout.php");
        $("#profile_window").dialog("close");
        $("#info_window_message").html("Olet kirjautunut ulos");
        $("#info_window").dialog("open");
        $("#nav_area").load("../php/nav.php");
        return false;
    });

    // Uuden uutisen lähetys ikkunan alustus
    $("#post_news_window").dialog({ autoOpen: false, modal: true, closeText: "X", show: "fold", hide: "blind", width: "550px" });

    // Lähetä uusi uutinen painike
    $("#post_news_link").click(function () {
        $("#post_news_window").dialog("open");
        return false;
    });
});