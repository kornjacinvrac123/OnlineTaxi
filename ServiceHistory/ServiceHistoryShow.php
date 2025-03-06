<?php 
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
  require_once("../ConDB.php");
  $db= conn('Account');
  if($db == null){
    echo json_encode([
        'status'=>'Error',
        'message' => 'Could not load the data',
    ]);
  }


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PayCards database</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    <?php 
     $query="SELECT * From ServiceHistory ORDER BY UserId,ReservationTime ASC ";
     $result =mysqli_query($db, $query);
     if(mysqli_error($db)!=""){
        echo "<div class='alert alert-danger'>Error with query select</div>.<br>";
        echo mysqli_errno($db)." ".mysqli_error($db).'<br>';
        exit();
     }
    echo'<table class="table">
            <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">userId</th>
                <th scope="col">StartLocation</th>
                <th scope="col">EndLocation</th>
                <th scope="col">RoadLength(Km)</th>
                <th scope="col">ReservationTime</th>
                <th scope="col">Price(EUR)</th>
                </tr>
            </thead>';
     while($row=mysqli_fetch_assoc($result)){
        echo "
            <tr>
                <th scope='row'>{$row['id']}</th>
                <td>{$row['UserId']}</td>
                <td>{$row['StartLocation']}</td>
                <td>{$row['EndLocation']}</td>
                <td>{$row['RoadLength']}</td>
                <td>{$row['ReservationTime']}</td>
                <td>{$row['Price']}</td>
            </tr>";
     }
     mysqli_close($db);
    ?>
    </table>
    </form>
</body>
</html>