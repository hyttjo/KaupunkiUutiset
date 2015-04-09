<?php 
    session_start();

    date_default_timezone_set('Etc/UTC');

    require 'PHPMailerAutoload.php';

    $mail = new PHPMailer;

    $email_from = 'noreply.kaupunkiuutiset@gmail.com';

    $mail->CharSet = "UTF-8";
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->Debugoutput = 'html';
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPSecure = 'tls';
    $mail->SMTPAuth = true;
    $mail->Username = $email_from;
    $mail->Password = "rgcqzauusbgovgwh";
    $mail->setFrom($email_from, 'KaupunkiUutiset');
    
    include 'mysql.php';

    $username = str_replace("'", "", $_POST["username"]);
    
    $query = "SELECT * FROM users WHERE username = '$username'";
    
    $result = mysqli_query($con, $query) or die(mysqli_error($con));
    $row = mysqli_fetch_array($result);

    $num_rows = mysqli_num_rows($result);
    
    if($num_rows == 1) {
        $email = $row["email"];
        $password = $row["password"];

        if($email != '') {
            $mail->Subject = 'Salasanamuistutus - ' . $username . ' - KaupunkiUutiset';
            $mail->AddBCC($email_from);
            $mail->addAddress($email);
            $mail_head_message = 'Tämä on automaattisesti lähetetty viesti KaupunkiUutiset verkkosivuilta';
            $password_info_message = 'Salasanasi käyttäjätunnukselle ' . $username . ' on:';

            $mail->Body = $mail_head_message . "\n\n" . $password_info_message . "\n\n" . $password;

            if (!$mail->send()) {
                echo "Virhe: " . $mail->ErrorInfo;
                } else {
                echo "Salasana on lähetetty sähköpostiisi";
            }
        } else {
            echo "Salasanan lähettäminen ei onnistunut:<br>Sähköpostiosoitetta ei ole määritetty käyttäjätunnukselle";
        }
    } else {
        echo "Salasanan lähettäminen ei onnistunut:<br>Käyttäjänimeä ei löytynyt";
    }
?>