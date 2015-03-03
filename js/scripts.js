$(document).ready(function () {
    //////////////////////////////////////////
    // Yleiset
    //////////////////////////////////////////

    // Näyttää käsikursorin pääotsikon päällä
    $('h1').css('cursor', 'pointer');

    // Pääotsikkoa klikatessa ohjaa etusivulle
    $('h1').click(function () {
        $(location).attr('href', 'index.php');
    });

    // Asettaa sivualueen korkeuden samaksi pääuutisalueen kanssa 
    $("aside").height($("#news_area").height());

    // Lukee ja palauttaa URL attribuutit
    $.extend({ getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }, getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
    });

    // Jos kuvan lataus epäonnistuu niin tämä yrittää ladata ne uudelleen 4 sekunnin välein enintään 10 kertaa
    var retries = 0;
    $.imgReload = function () {
        var loaded = 1;
        $("img").each(function () {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                var src = $(this).attr("src");
                var date = new Date();
                $(this).attr("src", src + "?v=" + date.getTime());
                loaded = 0;
            }
        });

        retries += 1;

        if (retries < 10) {
            if (loaded == 0) {
                setTimeout('$.imgReload()', 4000);
            }
        }
    }

    jQuery(document).ready(function () {
        setTimeout('$.imgReload()', 5000);
    });

    //////////////////////////////////////////
    // Navigointi
    //////////////////////////////////////////

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

    // Muuttaa navigointi menu ikonin klikatessa
    $('#menu').click(function () {
        var menu_display = $('#menu ul').css('display');

        if ($(window).width() < 600) {
            if (menu_display == 'none') {
                $('#menu').css('background', 'url("../img/menu_icon_selected.png") no-repeat');
                $('#menu ul').css('display', 'block');
            } else {
                $('#menu').css('background', 'url("../img/menu_icon.png") no-repeat');
                $('#menu ul').css('display', 'none');
            }
        }
    });

    // Säätää navigointi menun toimimaan oikein myös ikkunan kokoa säädettäessä
    $(window).resize(function () {
        if ($(window).width() > 600) {
            $('#menu ul').css('display', 'block');
            $('#menu').css('background', 'url("") no-repeat');
        } else {
            $('#menu ul').css('display', 'none');
            $('#menu').css('background', 'url("../img/menu_icon.png") no-repeat');
        }
    });

    // Näyttää käsikursosin navigointi alueiden päällä
    $('li').css('cursor', 'pointer');

    // Ohjaa oikeaan osoitteeseen navigointi aluetta klikatessa lukemalla data-section_id attribuutin
    $('li').click(function () {
        var id = $(this).data('section_id');
        $(location).attr('href', 'index.php?section_id=' + id);
    });

    //////////////////////////////////////////
    // Uutisalue
    //////////////////////////////////////////

    // Näyttää käsikursosin artikkelin päällä
    $('article').css('cursor', 'pointer');

    // Ohjaa oikeaan osoitteeseen artikkelia klikatessa lukemalla data-news_id attribuutin
    $('article').click(function () {
        var id = $(this).data('news_id');
        $(location).attr('href', 'index.php?news_id=' + id);
    });

    //////////////////////////////////////////
    // Kommenttialue
    //////////////////////////////////////////

    // Uuden kommentin lähetys painikkeen logiikka
    $("#post_comment_button").click(function () {
        var comment_text = $("#post_comment_text").val();
        var news_id = $.getUrlVar('news_id');

        if (comment_text.length > 9 && comment_text.length < 256) {
            $.ajax({
                type: "post",
                url: "../php/scripts/post_comment.php",
                data: "text=" + comment_text + "&news_id=" + news_id,
                success: function (data) {
                    $("#info_window_message").html(data);
                    $("#info_window").dialog("open");
                }
            });
        } else {
            $("#info_window_message").html("Kommentin minimipituus on 10 merkkiä<br>ja maksimipituus 255 merkkiä");
            $("#info_window").dialog("open");
        }
    });

    //////////////////////////////////////////
    // Ikkunat
    //////////////////////////////////////////

    // Alustaa sisäänkirjautumis ikkunan
    $("#login_window").dialog({ autoOpen: false, modal: true, closeText: "X", show: "fold", hide: "blind" });

    // Sisäänkirjautumis painikkeen logiikka
    $("#login_button").click(function () {
        var username = $("#login_username").val();
        var password = $("#login_password").val();

        if (username.length > 3 && username.length < 15 && password.length > 5 && password.length < 21) {
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

        if (username.length > 3 && username.length < 15 && password.length > 5 && password.length < 21) {
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