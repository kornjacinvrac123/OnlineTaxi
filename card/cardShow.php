<?php 
require_once __DIR__ . '/../ConDB.php';
 $db = conn('Account');
 if($db === NULL){
    echo json_encode([
        'status'=>'Error',
        'message'=>'Error with connection to db'
    ]);
 }
?>

<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
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
     $query="SELECT * From PayCard";
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
                <th scope="col">cardNumber</th>
                <th scope="col">Month</th>
                <th scope="col">Year</th>
                <th scope="col">Cvv2</th>
                <th scope="col">CardName</th>
                </tr>
            </thead>';
     while($row=mysqli_fetch_assoc($result)){
        echo "
            <tr>
                <th scope='row'>{$row['id']}</th>
                <td>{$row['userId']}</td>
                <td>{$row['cardNumber']}</td>
                <td>{$row['month']}</td>
                <td>{$row['year']}</td>
                <td>{$row['cvv2']}</td>
                <td>{$row['cardName']}</td>
            </tr>";
     }
     mysqli_close($db);
    ?>
    </table>
    </form>
</body>
</html>