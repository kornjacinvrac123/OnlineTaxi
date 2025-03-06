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
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $raw_json=file_get_contents("php://input");
    if($raw_json !== null){
        $decoded_json = json_decode($raw_json,true);
        if($decoded_json){
            extract($decoded_json);
            if(!empty($name) && !empty($surname) && !empty($username) && !empty($password) && !empty($email)){
                if(Search($db,'Users',$username,$id,'username') === false){
                    if(Search($db,'Users',$email,$id,'email') === false){
                            $name= $decoded_json["name"];
                            $email= $decoded_json["email"];
                            $password= password_hash($decoded_json["password"],PASSWORD_DEFAULT);
                            $surname=$decoded_json['surname'];
                            $username= $decoded_json["username"];
                            //Preparing query
                            $stmt=$db->prepare("INSERT INTO Users (name,surname,username,password,email) VALUES(?,?,?,?,?)");
                            //Binding parametars with actual variables 
                            $stmt->bind_param("sssss",$name,$surname,$username,$password,$email);
                    
                            $result=$stmt->execute();
                            if($result == false){
                                echo json_encode([
                                    'status'=>'Error',
                                    'message'=>'Error with inserting info',
                                ]);
                                exit();
                            }
                            else{
                                echo json_encode([
                                    'status'=> 'Success',
                                    'message'=>'Your account has been created',
                                ]);
                            }
                            $stmt->close();
            } else echo json_encode(['status'=>'Error','message'=>'Email is not valid']);

          }else echo json_encode(['status'=>'Error','message'=>'Username is not valid']);
         } else{
                echo json_encode([
                    'status' => 'Error',
                    'message'=>'All data is mandatory!!!'
                ]);
            }
        }
        else{
            echo json_encode([
                'status' => 'Error',
                'message'=>'Could not parse JSON'
            ]);
        }
    }
    else {
        echo json_encode([
            'status' => 'Error',
            'message'=>'Could not load JSON'
        ]);

    }   
}
else{
  echo json_encode([
     "status"=> "Error",
     "message"=> "Could not load the File(POST)",
  ]);
}



mysqli_close($db);
?>
