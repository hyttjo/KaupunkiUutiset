<?php 
    session_start();
    include 'mysql.php';

    $firstname = str_replace("'", "", $_POST["firstname"]);
    $lastname = str_replace("'", "", $_POST["lastname"]);
    $username = str_replace("'", "", $_POST["username"]);
    $email = str_replace("'", "", $_POST["email"]);
    $password = str_replace("'", "", $_POST["password"]);
    $type = "normal";

    if ($password == "hamk2015") {
        $type="admin";    
    }
    
    $query="INSERT INTO users(username, firstname, lastname, email, password, type) 
    values('$username', '$firstname', '$lastname', '$email', '$password', '$type')";

    if(mysqli_query($con, $query)){
        echo "Olet rekisteröitynyt onnistuneesti";
        $_SESSION["logged_in"] = true;
        $_SESSION["id"] = mysqli_query($con, "SELECT id FROM users WHERE username = '$username'");
        $_SESSION["username"] = $username;
        $_SESSION["firstname"] = $firstname;
        $_SESSION["lastname"] = $lastname;
        $_SESSION["email"] = $email;
        $_SESSION["type"] = $type;
    } else {
        echo "Virhe:<br>käyttäjänimi on mahdollisesti jo varattu";
    }
?>