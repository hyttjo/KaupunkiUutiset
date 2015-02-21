<?php
    include 'scripts/mysql.php';

    $query="SELECT * FROM news ORDER BY watched DESC LIMIT 10";

    $side_most_read_news = mysqli_query($con, $query);

    $query="SELECT * FROM news ORDER BY date DESC LIMIT 10";

    $side_newest_news = mysqli_query($con, $query);
?>

<!DOCTYPE html>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="../css/side_area.css">
    </head>
    <body>
        <div id="side-block">
            <h2>Luetuimmat uutiset</h2>
            <?php
                while ($most_read_row = mysqli_fetch_array($side_most_read_news)) { 
            ?>
            <p class="timestamp"><?php echo $most_read_row['date']; ?></p>
            <a href="index.php?news_id=<?php echo $most_read_row['id']; ?>"><?php echo $most_read_row['header']; ?></a>
            <?php
                }
            ?>
        </div>

        <div id="side-block">
            <h2>Uusimmat uutiset</h2>
            <?php
                while ($newest_row = mysqli_fetch_array($side_newest_news)) { 
            ?>
            <p class="timestamp"><?php echo $newest_row['date']; ?></p>
            <a href="index.php?news_id=<?php echo $newest_row['id']; ?>"><?php echo $newest_row['header']; ?></a>
            <?php
                }
            ?>
        </div>
    </body>
</html>
