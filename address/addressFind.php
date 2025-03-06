<?php 
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
  require_once __DIR__.'/../ConDB.php';
  $db= conn('Account');
  if($db == null){
    echo json_encode([
        'status'=>'Error',
        'message' => 'Could not load the data',
    ]);
  }


?>

<?php 
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $json_raw = file_get_contents('php://input');
    if($json_raw){
        $json_decoded=json_decode($json_raw,true);
            if($json_decoded){
                extract($json_decoded);
                if(!empty($id)){
                  $stmt=$db->prepare('SELECT FavoriteAddress FROM Users where id=?');
                  $stmt->bind_param('i', $id);
                  $result=$stmt->execute();
                  if($result){
                     $row=($stmt->get_result())->fetch_assoc();
                     $stmt->close();
                     if($row && isset($row['FavoriteAddress']) && $row['FavoriteAddress'] !== ""){
                      echo json_encode(['status'=>'Success','message'=>$row['FavoriteAddress']]);
                      } else {
                          echo json_encode(['status'=>'Error','message'=>'Favorite Address not found']);
                      }
                      }
                  else echo json_encode(['status'=>'Error','message'=>'Favorite Address is not updated']);
                }
         
            }
   } 
   else       echo json_encode(['status'=> 'Error','message'=> 'JSON RAW NOT WORKING']);
}
else echo json_encode(['status'=> 'Error','message'=> 'POST not working']);




?>