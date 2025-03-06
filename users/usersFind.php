<?php 
 require_once __DIR__.'/../ConDB.php';
$db = conn("Account");

if(!$db){
   echo json_encode([
       'status' => 'error',
       'message' => 'Database connection failed'
   ]);
   exit();
} 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_raw = file_get_contents('php://input');
    if ($json_raw) {
        $json = json_decode($json_raw, true);
        if($json){
        if (isset($json['username']) && isset($json['password'])) {
            $stmt = $db->prepare("SELECT * FROM Users WHERE username=?");
            $stmt->bind_param("s", $json['username']);
            $result = $stmt->execute();

            if ($result) {
                $get_res= $stmt->get_result();
                $row =$get_res->fetch_assoc();
                if($row){
                    extract($row); 
                    $stmt->close();
                            if (password_verify($json['password'],$password)) {
                                    echo json_encode([
                                        'status' => 'Success',
                                        'message'=>[
                                            'id'=>$id,
                                            'name' => $name,
                                            'surname' => $surname,
                                            'username' => $username,
                                            'password' => $json['password'],
                                            'email' => $email
                                        ]
                                    ]);
                                } 
                            else {
                                echo json_encode([
                                    'status' => 'Error',
                                    'message' => 'Incorrect password',
                                ]);
                            }
                        }
                             else {
                        echo json_encode([
                            'status' => 'Error',
                            'message' => 'Incorrect username',
                        ]);}
            } else {
                $stmt->close();
                echo json_encode([
                    'status' => 'Error',
                    'message' => 'Prepared statements do not work',
                ]);
            }
        }
        else{
            echo json_encode([
                'status'=>'Error',
                'message'=>'Username and password error',
            ]);
        }
      }
      else{
         echo json_encode([
             'status' => 'Error',
             'message'=>'Could not parse JSON'
         ]);
     }}
} 
else {
    echo json_encode([
        "status" => "Error",
        "message" => "Could not load the File",
    ]);
}
?>
