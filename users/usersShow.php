<?php
 require_once __DIR__.'/../ConDB.php';
 $db= conn("Account") or die("Error with connection to database");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All users in database</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    <?php 
     $query="SELECT * From Users";
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
                <th scope="col">name</th>
                <th scope="col">surname</th>
                <th scope="col">username</th>
                <th scope="col">password</th>
                <th scope="col">email</th>
                <th scope="col">Favorite Address</th>
                <th scope="col">time_of_creation</th>
                <th scope="col">time_of_update</th>

                </tr>
            </thead>';
     while($x=mysqli_fetch_assoc($result)){
        echo "
            <tr>
                <th scope='row'>{$x['id']}</th>
                <td>{$x['name']}</td>
                <td>{$x['surname']}</td>
                <td>{$x['username']}</td>
                <td>{$x['password']}</td>
                <td>{$x['email']}</td>
                <td>{$x['FavoriteAddress']}</td>
                <td>{$x['time_of_creation']}</td>
                <td>{$x['time_of_update']}</td>
            </tr>";
     }
     mysqli_close($db);
    ?>
    </table>
    </form>
</body>
</html>