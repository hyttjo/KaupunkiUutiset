<?php
     $con = mysqli_connect("mysql1.gear.host","kaupunkiuutiset","hamk2015!","kaupunkiuutiset");
  
    if (!$con) {
        die("Connection failed: " . mysqli_connect_error());
    }
?>