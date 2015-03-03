<?php
    session_start();

    $news_id = $_GET['news_id'];
    $section_id = $_GET['section_id'];

    if ($news_id) {
      $single_news = 'single_news';
    } else {
      $single_news = ''; 
    }
?>

<!DOCTYPE html>

<html lang="fi">
    <head>
        <meta charset="utf-8" />
        
        <title>KaupunkiUutiset</title>
        
        <link href="~/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" href="css/style.css">
        
        <script src="js/jquery-2.1.3.min.js"></script>
        <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
        <script src="js/scripts.js"></script>
    </head>
    <body>
        <div id="container">
            <nav id="nav_area">
                <?php include 'php/nav.php'; ?> 
            </nav>
                       
            <div id="main" class="<?php echo $single_news; ?>">
                <header>
                    <h1><img src="img/kaupunki_uutiset.png" alt="Kaupunki~Uutiset otsikko"></h1>
                </header>

                <section id="news_area">
                    <?php include 'php/news_area.php'; ?>  
                </section>

                <aside>
                    <?php include 'php/side_area.php'; ?>
                </aside>

            </div>
            
            <footer>
                <?php include 'php/footer.php'; ?>
            </footer>
        </div>

        <div id="windows">
            <?php include 'php/windows.php'; ?>
        </div>
    </body>
</html>
