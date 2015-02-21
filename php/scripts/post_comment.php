<?php
    session_start();
    include 'mysql.php'; 

    $user_id = $_SESSION['id'];
    $text = str_replace("'", "", $_POST["text"]);
    $news_id = $_POST["news_id"];

    $query="INSERT INTO comments(date, text, news, sender) 
    values(DATE_ADD(now(), INTERVAL 9 HOUR), '$text', '$news_id', '$user_id')";

    if(mysqli_query($con, $query)) {
        $query="UPDATE news SET commented = commented + 1 WHERE id='$news_id'";
        mysqli_query($con, $query) or die(mysqli_error($con));
        echo "Kommentin lisääminen onnistui";
    } else {
        echo mysqli_error($con);
    }
?>
