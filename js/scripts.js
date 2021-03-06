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

    // Näyttää käsikursosin mobiili menun päällä
    $('#menu').css('cursor', 'pointer');

    // Muuttaa navigointi menu ikonin klikatessa
    $('#menu').click(function () {
        var menu_display = $('#menu ul').css('display');

        if ($(window).width() < 584) {
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
        if ($(window).width() > 583) {
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
    if ($.getUrlVar('news_id') == null) {
        $('article').css('cursor', 'pointer');
    }

    // Ohjaa oikeaan osoitteeseen artikkelia klikatessa lukemalla data-news_id attribuutin
    $('article').click(function () {
        if ($.getUrlVar('news_id') == null) {
            var id = $(this).data('news_id');
            $(location).attr('href', 'index.php?news_id=' + id);
        }
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
                    $("#login_window").dialog("close");
                    $("#nav_area").load("../php/nav.php");
                    $("#windows").load("../php/windows.php");
                    $("#info_window_message").html(data);
                    $("#info_window").dialog("open");
                    setTimeout(function () { location.reload(); }, 3000);
                }
            });
        }
    });

    // Salasanan lähettäminen sähköpostiin
    $("#send_password_to_mail_link").click(function () {
        var username = $("#login_username").val();

        if (username.length > 3 && username.length < 15) {
            $.ajax({
                type: "post",
                url: "php/scripts/send_password_to_mail.php",
                data: "username=" + username,
                success: function (data) {
                    $("#info_window_message").html(data);
                    $("#info_window").dialog("open");
                }
            });
        } else {
            var message = "Sanasalanan lähettämistä varten sinun täytyy antaa käyttäjätunnuksesi.<br>Pituus 4-14 merkkiä.";
            $("#info_window_message").html(message);
            $("#info_window").dialog("open");
        }
        return false;
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

    // Avaa profiilin muokkaus ikkunan auki ja sulkee profiili ikkunan
    $("#modify_profile_link").click(function () {
        $("#profile_window").dialog("close");

        var profile_id = $("#profile_id").html();

        $.ajax({
            type: "post",
            url: "php/scripts/get_profile_information.php",
            data: "profile_id=" + profile_id,
            success: function (data) {
                var json = $.parseJSON(data);

                $("#update_firstname").val(json.firstname);
                $("#update_lastname").val(json.lastname);
                $("#update_username").val(json.username);
                $("#update_email").val(json.email);
                $("#update_password").val(json.password);

                $("#windows").load("../php/windows.php");
            }
        });

        $("#update_profile_window").dialog("open");
        return false;
    });

    // Alustaa profiilin muokkaus ikkunan
    $("#update_profile_window").dialog({ autoOpen: false, modal: true, closeText: "X", show: "fold", hide: "blind" });

    // Profiilin päivitys painikkeen logiikka
    $("#update_profile_button").click(function () {
        var firstname = $("#update_firstname").val();
        var lastname = $("#update_lastname").val();
        var username = $("#update_username").val();
        var email = $("#update_email").val();
        var password = $("#update_password").val();

        if (username.length > 3 && username.length < 15 && password.length > 5 && password.length < 21) {
            $.ajax({
                type: "post",
                url: "php/scripts/update_profile.php",
                data: "firstname=" + firstname + "&lastname=" + lastname + "&username=" + username + "&email=" + email + "&password=" + password,
                success: function (data) {
                    if (data == "Olet päivittänyt profiilisi onnistuneesti") {
                        $("#update_profile_window").dialog("close");
                        $("#nav_area").load("../php/nav.php");
                        $("#windows").load("../php/windows.php");
                        setTimeout(function () { location.reload(); }, 3000);
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
        //location.reload();
        $("#info_window").dialog("close");
    });

    // Alustaa profiili ikkunan
    $("#profile_window").dialog({ autoOpen: false, modal: true, width: 400, closeText: "X", show: "fold", hide: "blind" });

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
        $("#windows").load("../php/windows.php");
        return false;
    });

    // Uuden uutisen lähetys ikkunan alustus
    $("#post_news_window").dialog({ autoOpen: false, modal: true, closeText: "X", show: "fold", hide: "blind", width: "550px" });

    // Lähetä uusi uutinen painike
    $("#post_news_link").click(function () {
        $("#post_news_window").dialog("open");
        return false;
    });

    // Avaa muokkaa uutista ikkunan
    $("#edit_news_link").click(function () {
        $("#profile_window").dialog("close");

        var news_id = $.getUrlVar('news_id');

        $.ajax({
            type: "post",
            url: "php/scripts/get_news_information.php",
            data: "news_id=" + news_id,
            success: function (data) {
                var json = $.parseJSON(data);

                $("#update_header").val(json.header);
                $("#update_summary").val(json.summary);
                $("#update_news_text").val(json.news_text);

                $("#windows").load("..php/windows.php");
            }
        });

        $("#edit_news_window").dialog("open");
        return false;
    });

    // Muokkaa uutista ikkunan alustus
    $("#edit_news_window").dialog({ autoOpen: false, modal: true, closeText: "X", show: "fold", hide: "blind", width: "550px" });

    // Lähetä muokattu uutinen painike
    $("#edit_news_button").click(function () {
        var news_id = $.getUrlVar('news_id');
        var header = $("#update_header").val();
        var summary = $("#update_summary").val();
        var news_text = $("#update_news_text").val();

        if (header.length > 1 && summary.length > 10 && news_text.length > 10) {
            $.ajax({
                type: "post",
                url: "php/scripts/update_news.php",
                data: "news_id=" + news_id + "&header=" + header + "&summary=" + summary + "&news_text=" + news_text,
                success: function (data) {
                    if (data == "Olet päivittänyt uutisen onnistuneesti.") {
                        $("#edit_news_window").dialog("close");
                        $("#windows").load("../php/windows.php");
                        setTimeout(function () { location.reload(); }, 3000);
                    }
                    $("#info_window_message").html(data);
                    $("#info_window").dialog("open");
                }
            });
        }
    });
});