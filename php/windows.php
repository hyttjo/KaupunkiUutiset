<?php
    session_start();
?>

<!DOCTYPE html>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="../css/windows.css">
        <script src="../js/windows.js"></script>
    </head>
    <body>
        <div id="login_window" title="Kirjaudu Sisään">
            <form id="login_form" onsubmit="return false" accept-charset="utf-8">
                <p>Käyttäjätunnus:</p><input id="login_username" type="text" pattern=".{4,14}" required title="4-14 merkkiä" required></input>
                <p>Salasana:</p><input id="login_password" type="password" pattern=".{6,20}" required title="6-20 merkkiä" required></input><br>
                <button id="login_button" type="submit">Kirjaudu</button>
                <button id="registration_link">Rekisteröidy</button>
            </form>
        </div>

        <div id="registration_window" title="Rekisteröidy">
            <form id="registration_form" onsubmit="return false" accept-charset="utf-8">
                <p>Saat admin oikeudet (uutisten lähetys) käyttämällä salasanaa "hamk2015"</p>
                <p>Käyttäjätunnus:</p><input id="username" type="text" pattern=".{4,14}" required title="4-14 merkkiä" placeholder="vaadittu kenttä"></input>
                <p>Salasana:</p><input id="password" type="text" pattern=".{6,20}" required title="6-20 merkkiä" placeholder="vaadittu kenttä"></input>
                <p>Etunimi:</p><input id="firstname" type="text"></input>
                <p>Sukunimi:</p><input id="lastname" type="text"></input>
                <p>Sähköposti:</p><input id="email" type="email"></input><br>
                <button id="registration_button" type="submit">Rekisteröidy</button>
            </form>
        </div>

        <div id="profile_window" title="Profiili">
            <p>ID: <span><?php echo $_SESSION["id"]; ?></span></p>
            <p>Käyttäjätunnus: <span><?php echo $_SESSION["username"]; ?></span></p>
            <p>Etunimi: <span><?php echo $_SESSION["firstname"]; ?></span></p>
            <p>Sukunimi: <span><?php echo $_SESSION["lastname"]; ?></span></p>
            <p>Email: <span><?php echo $_SESSION["email"]; ?></span></p>
            <p>Profiilin tyyppi: <span><?php echo $_SESSION["type"]; ?></span></p>
            <button id="profile_window_close">Sulje</button>
            <?php if($_SESSION["type"] == "admin") { ?>
                <button id="post_news_link">Lähetä uutinen</button>
            <?php } ?>
            <button id="logout_button">Kirjaudu ulos</button>
        </div>

        <div id="post_news_window" title="Lähetä uutinen">
            <form id="post_news_form" action="php/scripts/upload.php" method="post" enctype="multipart/form-data" accept-charset="utf-8">
                <p>Aihealue:</p>
                <select name="subject_area">
                    <option value="1">Kotimaa</option>
                    <option value="2">Ulkomaat</option>
                    <option value="3">Talous</option>
                    <option value="4">Urheilu</option> 
                    <option value="5">Sää</option>                
                </select>
                <input name="main_news_boolean" type="checkbox">Pääuutinen aihealueella <span>(näkyy ensimmäisenä)</span></input>
                <p>Otsikko: <span>(max 255 merkkiä)</span></p><textarea name="header_title" rows="2" cols="75" maxlength="255" required></textarea>
                <p>Kuva: <span>(max koko 2 Mb)</span></p><input name="image_file" type="file" required></input>
                <p>Lyhennelmä: <span>(max 800 merkkiä)</span></p><textarea name="summary" rows="3" cols="75" maxlength="800" placeholder="Käytetään etusivuilla tiivistelmänä" required></textarea>
                <p>Uutisteksti: <span>(HUOM. kirjoita HTML tagit muotoillaksesi teksti, esim. &lt;br&gt; &lt;b&gt; &lt;u&gt; &lt;i&gt;)</span></p><textarea name="news_text" rows="8" cols="75"></textarea><br>
                <button id="post_news_button" type="submit" name="submit">Lähetä</button>
            </form>
        </div>

        <div id="info_window" title="KaupunkiUutiset">
            <p id="info_window_message"></p>
            <button id="info_window_ok">Ok</button>
        </div>

        <div id="temp"></div>
    </body>
</html>