<?php 
    include 'mysql.php';

    $news_id = $_POST['news_id'];

    $query = "SELECT * FROM news WHERE id = '$news_id'";

    $news_results = mysqli_query($con, $query);

    while ($row = mysqli_fetch_array($news_results)) {
        $rows = array('header' => $row['header'],
                      'summary' => $row['summary'],
                      'news_text' => $row['text']);
    }

    echo json_encode($rows);
?>