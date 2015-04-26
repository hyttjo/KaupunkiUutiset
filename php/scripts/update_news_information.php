<?php
    session_start();
    include 'mysql.php'; 

    $header = str_replace("'", "", $_POST['header']);  
    $summary = str_replace("'", "", $_POST['summary']);
    $news_text = str_replace("'", "", $_POST['news_text']);
    $news_id = $_POST['news_id'];
    
    $query = "UPDATE news SET date=DATE_ADD(now(), INTERVAL 9 HOUR), header='$header', summary='$summary', text='$news_text' WHERE id='$news_id'"; // muutettu $header_title -> $header ja poistettu lopussa oleva ) merkki

    if(mysqli_query($con, $query)) {
        echo "Olet päivittänyt uutisen onnistuneesti."; // lisätty loppuun ;
    } else {
        echo "Virhe:<br>tietoja päivitettäessä tapahtui virhe";
    }
?>