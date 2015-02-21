<?php
    session_start();
    include 'mysql.php'; 

    $username = $_SESSION['username'];
    $subject_area = $_POST['subject_area'];
    $main_news = $_POST['main_news_boolean'];
    $header_title = str_replace("'", "", $_POST['header_title']);  
    $summary = str_replace("'", "", $_POST['summary']);
    $news_text = str_replace("'", "", $_POST['news_text']);

    $query = "SELECT * FROM users WHERE username = '$username'";
    $result = mysqli_query($con, $query) or die(mysqli_error($con));
    $row = mysqli_fetch_array($result);
    $user_id = $row['id'];

    $query="INSERT INTO news(date, header, img, summary, section, sender, text, watched, commented) 
    values(DATE_ADD(now(), INTERVAL 9 HOUR), '$header_title', '$file_name', '$summary', '$subject_area', '$user_id', '$news_text', 0, 0)";

    if(mysqli_query($con, $query)) {
        if($main_news) {
            $query="SELECT * FROM news WHERE header = '$header_title'";
            $result = mysqli_query($con, $query) or die(mysqli_error($con));
            $row = mysqli_fetch_array($result);
            $news_id = $row['id'];

            $query="UPDATE sections SET main='$news_id' WHERE id='$subject_area'";
            mysqli_query($con, $query) or die(mysqli_error($con));
        }
    } else {
        echo mysqli_error($con);
    }
?>