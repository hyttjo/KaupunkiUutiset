<?php
    session_start();
    include 'scripts/mysql.php';
    $query="SELECT * FROM comments INNER JOIN users ON comments.sender=users.id WHERE comments.news = '$news_id'";

    $comments_results = mysqli_query($con, $query);
    $comments_num_rows = mysqli_num_rows($comments_results);
?>

<!DOCTYPE html>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="../css/comment_area.css">
        <script src="../js/comment_area.js"></script>
    </head>
    <body>
        <div id="comment_area">
            <?php if ($_SESSION['logged_in']) { ?>
            <form id="post_comment" onsubmit="return false" accept-charset="utf-8">
                <h2>Kirjoita uusi kommentti:</h2>
                <textarea id="post_comment_text" cols="65" rows="4" maxlength="255" required></textarea>
                <button id="post_comment_button" type="submit">Lähetä</button>
            </form>
            <?php } if ($comments_num_rows > 0) { ?>
            <h2>Kommentit:</h2>
            <?php 
            }
            $comment_number = 0;
            
            while ($row = mysqli_fetch_array($comments_results)) { 
                if ($comment_number % 2 == 0) {
                    $comment_even_odd = "even_comment";
                } else {
                    $comment_even_odd = "odd_comment";
                }   
            ?>
            <div id="comment" class="<?php echo $comment_even_odd; ?>">
                <p id="comment_sender"><?php echo $row['username']; ?></p>
                <p class="timestamp"><?php echo $row['date']; ?></p>
                <p id="comment_text"><?php echo $row['text']; ?></p>
            </div>
            <?php 
                $comment_number += 1;
            } 
            ?>
        </div>
    </body>
</html>
