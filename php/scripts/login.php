<?php 
    session_start();
    include 'mysql.php';
    
    $username = str_replace("'", "", $_POST["username"]);
    $password = str_replace("'", "", $_POST["password"]);
    
    $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    
    $result = mysqli_query($con, $query) or die(mysqli_error($con));
    $row = mysqli_fetch_array($result);

    $num_rows = mysqli_num_rows($result);
    
    if($num_rows == 1) {
        echo "Kirjautunut sisään";
        $_SESSION["logged_in"] = true;
        $_SESSION["id"] = $row["id"];
        $_SESSION["username"] = $row["username"];
        $_SESSION["firstname"] = $row["firstname"];
        $_SESSION["lastname"] = $row["lastname"];
        $_SESSION["email"] = $row["email"];
        $_SESSION["type"] = $row["type"];
    } else {
        echo "Kirjautuminen ei onnistunut:<br>Käyttäjänimi tai salasana väärä";
    }
?>