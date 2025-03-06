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
        if(!empty($UserId)){
            $stmt=$db->prepare('SELECT * FROM ServiceHistory
            WHERE UserId=?  ORDER BY ReservationTime ASC  ');
            $stmt->bind_param("i",$UserId);
            $result=$stmt->execute();
            if($result){
              $rows=[];
              $QueryResults=$stmt->get_result();
               while($row=$QueryResults->fetch_assoc()){
                $rows[]=[
                  'id'=>$row['id'],
                  'UserId'=>$row['UserId'],
                  'StartLocation'=> $row['StartLocation'],
                  'EndLocation'=>$row['EndLocation'],
                  'RoadLength'=>$row['RoadLength'],
                  'ReservationTime'=>$row['ReservationTime'],
                  'Price'=>$row['Price'],
                ];
               }
                echo json_encode(['status'=>'Success','message'=>$rows]);
            }
            else echo json_encode(['status'=>'Error','message'=>'Service is temporarily unavailable']);
        }
        else echo json_encode(['status'=>'Error','message'=>'All data is mandatory']);
    }
 }
}
else echo json_encode(['status'=>'Error','message'=>'POST ERROR service History find']);




?>