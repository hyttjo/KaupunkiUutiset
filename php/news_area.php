<?php
    session_start();
    include 'scripts/mysql.php';

    if($news_id) {
        $query="UPDATE news SET watched = watched + 1 WHERE id = '$news_id'";
        mysqli_query($con, $query);

        $query="SELECT * FROM news WHERE id = '$news_id'";
    } else {
        if($section_id) {
            $query="SELECT * FROM sections INNER JOIN news ON sections.main=news.id WHERE news.section = '$section_id' ORDER BY news.date DESC";
        } else {
            $query="SELECT * FROM sections INNER JOIN news ON sections.main=news.id ORDER BY news.date DESC LIMIT 1";
        }
    }

    $main_results = mysqli_query($con, $query);
    $main_num_rows = mysqli_num_rows($main_results);

    if($section_id) {
        $query="SELECT * FROM news WHERE section = '$section_id' ORDER BY date DESC LIMIT 10";
    } else {
        $query="SELECT * FROM news ORDER BY date DESC LIMIT 10";
    }

    $news_results = mysqli_query($con, $query);
?>

<!DOCTYPE html>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="../css/news_area.css">
        <script src="../js/news_area.js"></script>
    </head>
    <body>
        <?php
        if ($main_num_rows == 1) {
            while ($main_row = mysqli_fetch_array($main_results)) { 
                $main_id = $main_row['id']; 
        ?>
        <article id="main_news" data-news_id="<?php echo $main_row['id']; ?>">
            <div id="news_header">
                <h3><?php echo $main_row['header']; ?></h3>
                <p class="timestamp"><?php echo $main_row['date']; ?></p>
            </div>
            <div id="img_container">
                <img src="<?php echo $main_row['img']; ?>" alt="Pääuutisen uutiskuva"></img>
            </div>
            <p>
            <?php
            if($news_id) {
                echo $main_row['text'];
            } else {
                echo $main_row['summary'];
            } 
            ?></p>
            <div id="news_footer">
                <img src="img/speech_bubble_icon_128.png" alt="Kommentit ikoni"></img>
                <p><?php echo $main_row['commented']; ?> kommenttia</p>
                <p id="watched_number"><?php echo $main_row['watched']; ?> katselukertaa</p>
                <img id="eye_icon" src="img/eye_icon_128.png" alt="Katselukerrat ikoni"></img>  
            </div>
        </article>
        <?php 
            } 
        } if (!$news_id) {
            while ($row = mysqli_fetch_array($news_results)) { 
                if ($row['id'] != $main_id) { 
        ?>
        <article data-news_id="<?php echo $row['id']; ?>">
            <div id="news_header">
                <h3><?php echo $row['header']; ?></h3>
                <p class="timestamp"><?php echo $row['date']; ?></p>
            </div>
            <div id="img_container">
                <img src="<?php echo $row['img']; ?>" alt="Uutiskuva"></img>
            </div>
            <p><?php echo $row['summary']; ?></p>
            <div id="news_footer">
                <img src="img/speech_bubble_icon_128.png" alt="Kommentit ikoni"></img>
                <p><?php echo $row['commented']; ?></p>
                <img id="eye_icon" src="img/eye_icon_128.png" alt="Katselukerrat ikoni"></img>  
                <p><?php echo $row['watched']; ?></p>
            </div>
        </article>
        <?php 
                }
            }
         } 
         if ($news_id) {
             include 'comment_area.php';
         }
         ?>
    </body>
</html>