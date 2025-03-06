<?php 
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
  require_once __DIR__.'/../ConDB.php';
  require_once __DIR__.'/../functions.php';
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
        if(!empty($UserId) && !empty($StartLocation) && !empty($EndLocation) && !empty($RoadLength)  
        && !empty($Price)){
            if(sad_ServiceHistory($db,$UserId)){
                $stmt=$db->prepare('INSERT INTO ServiceHistory (UserId,Startlocation,EndLocation,RoadLength,Price) VALUES(?,?,?,?,?)');
                $stmt->bind_param("issdd",$UserId, $StartLocation, $EndLocation, $RoadLength,$Price);
                $result=$stmt->execute();
                if($result){
                    $stmt->close();
                    echo json_encode(['status'=>'Success','message'=>'Your ride is waiting']);
                }
                else {
                    $stmt->close();
                    echo json_encode(['status'=>'Error','message'=>'Service is temporarily unavailable']);
                }
            }
            else echo json_encode(['status'=>'Error','message'=>'Service is temporarily unavailable (sad Error)']);
        }
        else echo json_encode(['status'=>'Error','message'=>'All data is mandatory']);
    }
 }
}
else echo json_encode(['status'=>'Error','message'=>'POST ERROR']);




?>