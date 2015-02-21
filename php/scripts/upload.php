<?php
    include 'class.upload.php';    

    $handle = new upload($_FILES['image_file']);

    if($handle->uploaded) {
        $handle->image_resize = true;
        $handle->image_x = 900;
        $handle->image_y = 510;
        $handle->image_ratio_crop = true;
        $handle->process('../../img/uploads/');
        if($handle->processed) {
            echo 'image resized';
            $handle->clean();
        } else {
            echo 'error : ' . $handle->error;
        }
    }

    $file_name = "img/uploads/" . $_FILES['image_file']['name'];

    include 'post_news.php';

    header("Location: ../../index.php");
?>
