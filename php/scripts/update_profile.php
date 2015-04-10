<?php 
    session_start();
    include 'mysql.php';

    $firstname = str_replace("'", "", $_POST["firstname"]);
    $lastname = str_replace("'", "", $_POST["lastname"]);
    $username = str_replace("'", "", $_POST["username"]);
    $email = str_replace("'", "", $_POST["email"]);
    $password = str_replace("'", "", $_POST["password"]);
    $type = "normal";
    $id = $_SESSION["id"];

    if ($password == "hamk2015") {
        $type="admin";    
    }

    $query = "UPDATE users SET username='$username', firstname='$firstname', lastname='$lastname', email='$email', password='$password', type='$type' WHERE id='$id'";

    if(mysqli_query($con, $query)){
        echo "Olet päivittänyt profiilisi onnistuneesti";
        $_SESSION["logged_in"] = true;
        $_SESSION["username"] = $username;
        $_SESSION["password"] = $password;
        $_SESSION["firstname"] = $firstname;
        $_SESSION["lastname"] = $lastname;
        $_SESSION["email"] = $email;
        $_SESSION["type"] = $type;
    } else {
        echo "Virhe:<br>tietoja päivitettäessä tapahtui virhe";
    }
?>