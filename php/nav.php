<?php
    session_start();

    $login_status_text;

    if($_SESSION["logged_in"] == true) { 
        $login_status_text = $_SESSION["username"]; 
    } else { 
        $login_status_text = "Kirjaudu"; 
    } 

    $nav_active = array("", "", "", "", "", "");

    switch($section_id) {
        case "0":
            $nav_active[0] = "nav_active";
            break;
        case "1":
            $nav_active[1] = "nav_active";
            break;
        case "2":
            $nav_active[2] = "nav_active";
            break;
        case "3":
            $nav_active[3] = "nav_active";
            break;
        case "4":
            $nav_active[4] = "nav_active";
            break;
        case "5":
            $nav_active[5] = "nav_active";
            break;
        default:
            $nav_active[0] = "nav_active";
    }

    if($news_id) { $nav_active[0] = ""; }
?>

<!DOCTYPE html>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="../css/nav.css">
        <script src="../js/nav.js"></script>
    </head>
    <body>
        <div id="topnavbar">
            <p><?php echo date('d.m.Y - G:i:s'); ?></p>
            <div id="login">
                <p id="login_text"><?php echo $login_status_text ?></p>
                <img id="login_icon" src="img/user_icon.png" alt="Kirjautumis ikoni"></img>
            </div>
        </div>
        <ul>
            <li data-section_id="0" class="<?php echo $nav_active[0]; ?>">Uusimmat</li>
            <li data-section_id="1" class="<?php echo $nav_active[1]; ?>">Kotimaa</li>
            <li data-section_id="2" class="<?php echo $nav_active[2]; ?>">Ulkomaat</li>
            <li data-section_id="3" class="<?php echo $nav_active[3]; ?>">Talous</li>
            <li data-section_id="4" class="<?php echo $nav_active[4]; ?>">Urheilu</li>
            <li data-section_id="5" class="<?php echo $nav_active[5]; ?>">Sää</li>
        </ul>
    </body>
</html>