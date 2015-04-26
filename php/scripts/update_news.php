<?php
    include 'mysql.php'; 

    $header = str_replace("'", "", $_POST['header']);  
    $summary = str_replace("'", "", $_POST['summary']);
    $news_text = str_replace("'", "", $_POST['news_text']);
    $news_id = $_POST['news_id'];

    date_default_timezone_set('Europe/Helsinki');
    $current_date = date('d/m/Y H:i:s');

    $modified_text = '<b>Uutinen päivitetty: '. $current_date .'</b><br><br>' . $news_text;

    $query = "UPDATE news SET header='$header', summary='$summary', text='$modified_text' WHERE id='$news_id'";

    if(mysqli_query($con, $query)) {
        echo "Olet päivittänyt uutisen onnistuneesti.";
    } else {
        echo "Virhe:<br>tietoja päivitettäessä tapahtui virhe";
    }
?>