<?php 
// Setting up CORS headers for cross port communication
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__.'/../functions.php';
require_once __DIR__.'/../ConDB.php';
 $db = Conn("Account");
if(!$db){
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed'
    ]);
    exit();

}
?>
<?php
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $raw_json=file_get_contents('php://input');
    if($raw_json){
        $json=json_decode($raw_json,true);
        if($json){
            extract($json);
            if(!empty($id) && !empty($name) && !empty($surname) && !empty($username) && !empty($password) && !empty($email)){
               if(Search($db,'Users',$username,$id,'username') === false){
                if(Search($db,'Users',$email,$id,'email') === false){
                $stmt= $db->prepare('UPDATE Users set name=?,surname=?,username=?,password=?,email=? WHERE id=?');
                $hash_password=password_hash($password, PASSWORD_DEFAULT);
                $stmt->bind_param("sssssi",$name,$surname,$username,$hash_password,$email,$id);
                $result=$stmt->execute();
                if($result){
                    echo json_encode(['status'=>'Success','message'=>'Data is edited properly']);           
                }
                else  echo json_encode(['status'=>'Error','message'=>'Server Problem,try later']);      
            }
            else echo json_encode(['status'=>'Error','message'=>'Email is not valid']);   
            }
            else echo json_encode(['status'=>'Error','message'=>'Username is not valid']);

        }
            else echo json_encode(['status'=>'Error','message'=>'All data is mandatory']);
        }
    }
}
else echo json_encode(['status'=>'Error','message'=>'Post is not working properly']);




?>