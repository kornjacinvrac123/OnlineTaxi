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

<?php 
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $json_raw=file_get_contents('php://input');
    if($json_raw){
        $json_decoded=json_decode($json_raw,true);
            if($json_decoded){
                extract($json_decoded);
                if(!empty($FavoriteAddress) && !empty($id)){
                  $stmt=$db->prepare('UPDATE Users SET FavoriteAddress=? WHERE id=?');
                  $stmt->bind_param('si',$FavoriteAddress, $id);
                  $result=$stmt->execute();
                  if($result){
                     echo json_encode(['status'=>'Success','message'=>'Favorite Address is updated']);
                  }
                  else echo json_encode(['status'=>'Error','message'=>'Favorite Address is not updated']);
                }
                $stmt->close();
            }
   }
}
else echo json_encode(['status'=> 'Error','message'=> 'POST not working']);




?>