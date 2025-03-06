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
if($_SERVER['REQUEST_METHOD']==='POST'){
 $raw_json=file_get_contents('php://input');
 if($raw_json){
    $json=json_decode($raw_json,true);
    if($json){
        extract($json);
        if(!empty($id)  && !empty($UserId) && !empty($StartLocation) && !empty($EndLocation) && !empty($RoadLength)  
        && !empty($Price) && !empty($action)){
      // This is just an idea that do not have some real usage
        if($action === 'edit'){
                $stmt=$db->prepare('UPDATE ServiceHistory SET StartLocation=?,EndLocation=?,RoadLength=?,ReservationTime=NOW(),Price=?  where id=? and UserId=?');
                $stmt->bind_param("ssddii",$StartLocation,$EndLocation,$RoadLength,$Price,$id,$UserId);
                $result=$stmt->execute();
                $stmt->close();
                if ($result && $stmt->affected_rows > 0) {
                  echo json_encode(['status' => 'Success', 'message' => 'Start Location has been updated']);
              } else {
                  echo json_encode(['status' => 'Error', 'message' => 'Service is temporarily unavailable (edit) or no rows were updated']);
              }
        }
        else if($action === 'time'){
              $stmt=$db->prepare('UPDATE ServiceHistory set ReservationTime=NOW() WHERE id=? AND UserId=? ');
              $stmt->bind_param('ii',$id,$UserId);
              $result=$stmt->execute();
              $stmt->close();
              if($result){
                echo json_encode(['status'=>'Success','message'=>'Time has been updated']);
            }
            else echo json_encode(['status'=>'Error','message'=>'Service is temporarily unavailable(time)']);
        }
        else echo json_encode(['status'=>'Error','message'=>'Action error']);
      }
        else echo json_encode(['status'=>'Error','message'=>'All data is mandatory']);
    }
 }
}
else echo json_encode(['status'=>'Error','message'=>'POST ERROR']);




?>