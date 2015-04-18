<?php
    session_start();
    include 'mysql.php';

    $user_id = $_POST["profile_id"];

    $query = "SELECT * FROM users WHERE id = '$user_id'";

    $user_result = mysqli_query($con, $query);
    
    while ($row = mysqli_fetch_array($user_result)) { 
        $rows = array('username' => $row['username'],
                      'password' => $row['password'],
                      'firstname' => $row['firstname'],
                      'lastname' => $row['lastname'],
                      'email' => $row['email']);
    }

    echo json_encode($rows);
?>