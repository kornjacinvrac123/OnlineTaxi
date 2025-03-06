<?php 
function conn($databaseName){
  $db = mysqli_connect("localhost","root","",$databaseName);
  if($db == null){
    echo "There is a problem with connecting to Data base.<br>";
    echo mysqli_connect_errno()." ".mysqli_connect_error()."<br>";
    return false;
  }
  mysqli_query($db,"SET NAMES utf8");
  return $db;
}


?>